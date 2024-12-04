import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";
import { prisma } from "../libs/db";
import { hashPassword, verifyPassword } from "../libs/password";
import { sign } from "jsonwebtoken";

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

const authRoute = new Hono();

authRoute.post(
    "/login",
    zValidator(
        "json",
        z.object({
            email: z.string().email(),
            password: z.string().min(8),
        })
    ),
    async (c) => {
        try {
            const body = c.req.valid("json");
            const user = await prisma.user.findUnique({
                where: { email: body.email },
            });

            if (!user) {
                return c.json(
                    {
                        success: false,
                        message: `login attempt failed, user with email ${body?.email} does not exist!`,
                    },
                    400
                );
            }

            // check password | non null assertion to tell typescript
            const validPassword = await verifyPassword(
                user.password!,
                body.password
            );

            if (!validPassword) {
                return c.json(
                    {
                        success: false,
                        message: `login attempt failed, user with email ${body?.email} password incorrect!`,
                    },
                    400
                );
            }

            if (!JWT_SECRET_KEY) {
                return c.json(
                    {
                        success: false,
                        message: "You dont have access",
                    },
                    400
                );
            }

            const signature = {
                signInTime: Date.now(),
                email: user.email,
                expiresIn: "2 days",
            };

            const token = sign(signature, JWT_SECRET_KEY!);

            return c.json(
                {
                    success: true,
                    message: `Welcome back ${user.email}`,
                    token: token,
                },
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
    }
);

authRoute.post(
    "/register",
    zValidator(
        "json",
        z.object({
            email: z.string().email(),
            password: z.string().min(8),
        })
    ),
    async (c) => {
        try {
            const body = c.req.valid("json");
            const isExist = await prisma.user.findUnique({
                where: { email: body.email },
            });

            if (isExist) {
                return c.json(
                    {
                        success: false,
                        message: `user with email ${body?.email} already exist!`,
                    },
                    400
                );
            }

            const hashedPassword = await hashPassword(body.password);

            await prisma.user.create({
                data: {
                    email: body.email,
                    password: hashedPassword,
                },
            });

            return c.json(
                { success: true, message: "User registered successfuly!" },
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
    }
);

export default authRoute;
