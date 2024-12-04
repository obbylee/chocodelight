import { Hono } from "hono";
import { prisma } from "../libs/db";

const productsRoute = new Hono();

productsRoute.get("/", async (c) => {
    try {
        const products = await prisma.product.findMany();
        return c.json(
            { success: true, message: "list product", data: products },
            200
        );
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

productsRoute.get("/:id", async (c) => {
    try {
        const { id } = c.req.param();

        const product = await prisma.product.findUnique({
            where: { id: id },
        });

        if (!product) {
            return c.json(
                {
                    success: false,
                    message: `Product with '${id}' id does not exist!`,
                },
                404
            );
        }

        return c.json(
            { success: true, message: `Product id: '${id}'`, data: product },
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
});

export default productsRoute;
