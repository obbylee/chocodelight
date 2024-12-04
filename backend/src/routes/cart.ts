import { Hono } from "hono";
import { prisma } from "../libs/db";
import { z } from "zod";
import { zValidator } from "@hono/zod-validator";
import { checkUserToken } from "../middlewares/checkUserToken";

const cartRoute = new Hono();

cartRoute.get("/", checkUserToken, async (c) => {
    try {
        const user = c.get("user");
        const cart = await prisma.cart.findFirst({
            where: { userId: user.id },
            orderBy: { createdAt: "desc" },
            select: {
                id: true,
                items: {
                    select: {
                        id: true,
                        product: {
                            select: {
                                id: true,
                                name: true,
                                price: true,
                            },
                        },
                        quantity: true,
                    },
                },
            },
        });

        // cart is not availble then create
        if (!cart) {
            const newCart = await prisma.cart.create({
                data: {
                    userId: user.id,
                },
                select: {
                    id: true,
                    items: {
                        select: {
                            id: true,
                            product: {
                                select: {
                                    id: true,
                                    name: true,
                                    price: true,
                                },
                            },
                            quantity: true,
                        },
                    },
                },
            });
            return c.json(
                { success: true, message: "Cart List", data: newCart },
                200
            );
        }
        return c.json({ success: true, message: "Cart List", data: cart }, 200);
    } catch (error: unknown) {
        if (error instanceof Error) {
            return c.json(
                { message: "something went wrong", error: error.message },
                500
            );
        }
        return c.json(
            { message: "something went wrong, please try again later" },
            500
        );
    }
});

cartRoute.post(
    "/items",
    checkUserToken,
    zValidator(
        "json",
        z.object({
            productId: z.string(),
            quantity: z.number().min(1),
        })
    ),
    async (c) => {
        try {
            const user = c.get("user");
            const body = c.req.valid("json");

            const cartIsExist = await prisma.cart.findFirst({
                where: { userId: user.id },
                select: { id: true },
            });

            // cart is not availble then create
            if (!cartIsExist) {
                const newCart = await prisma.cart.create({
                    data: {
                        userId: user.id,
                    },
                    select: { id: true },
                });

                const newCartItem = await prisma.cartItem.create({
                    data: {
                        cartId: newCart?.id,
                        productId: body.productId,
                        quantity: body.quantity,
                    },
                    select: { product: { select: { name: true } } },
                });
                return c.json(
                    {
                        success: true,
                        message: `New product ${newCartItem.product.name} added!`,
                    },
                    200
                );
            }

            const newCartItem = await prisma.cartItem.create({
                data: {
                    cartId: cartIsExist?.id,
                    productId: body.productId,
                    quantity: body.quantity,
                },
                select: { product: { select: { name: true } } },
            });
            return c.json(
                {
                    success: true,
                    message: `New product ${newCartItem.product.name} added!`,
                },
                200
            );
        } catch (error) {
            if (error instanceof Error) {
                return c.json(
                    { message: "something went wrong", error: error.message },
                    500
                );
            }
            return c.json(
                { message: "something went wrong, please try again later" },
                500
            );
        }
    }
);

cartRoute.delete(
    "/items",
    checkUserToken,
    zValidator(
        "json",
        z.object({
            cartId: z.string(),
            cartItemId: z.string(),
        })
    ),
    async (c) => {
        try {
            const body = c.req.valid("json");

            const result = await prisma.cartItem.delete({
                where: {
                    id: body.cartItemId,
                    cartId: body.cartId,
                },
                select: { id: true },
            });

            if (!result) {
                return c.json(
                    {
                        success: true,
                        message: `Cart Item ${body.cartId} does not exist!`,
                    },
                    401
                );
            }

            return c.json(
                { success: true, message: `Cart Item ${result.id} deleted!` },
                200
            );
        } catch (error) {
            if (error instanceof Error) {
                return c.json(
                    { message: "something went wrong", error: error.message },
                    500
                );
            }
            return c.json(
                { message: "something went wrong, please try again later" },
                500
            );
        }
    }
);

cartRoute.patch("/items/:id", async (c) => {
    try {
        const { id } = c.req.param();

        return c.json({ message: id }, 200);
    } catch (error) {
        if (error instanceof Error) {
            return c.json(
                { message: "something went wrong", error: error.message },
                500
            );
        }
        return c.json(
            { message: "something went wrong, please try again later" },
            500
        );
    }
});

export default cartRoute;
