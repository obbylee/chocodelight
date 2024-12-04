import { createMiddleware } from "hono/factory";
import { prisma } from "../libs/db";
import { verify, Secret } from "jsonwebtoken";

type Env = {
    Variables: {
        user: {
            id: string;
        };
    };
};

type JwtPayload = {
    signInTime: number;
    email: string;
    expiresIn: string;
};

const JWT_SECRET_KEY: Secret = process.env.JWT_SECRET_KEY!;

export const checkUserToken = createMiddleware<Env>(async (c, next) => {
    try {
        const authHeaderToken = c.req
            .header("Authorization")
            ?.replace("Bearer ", "");

        if (!authHeaderToken) {
            return c.json(
                { success: false, message: "You don't have access" },
                401
            );
        }

        const decoded = verify(authHeaderToken, JWT_SECRET_KEY) as JwtPayload;

        if (!decoded) {
            return c.json(
                {
                    success: false,
                    message: "You don't have access, token is invalid",
                },
                401
            );
        }

        const userEmail = decoded.email;

        if (!userEmail) {
            return c.json(
                {
                    success: false,
                    message: "User email does not exist!",
                },
                401
            );
        }

        const user = await prisma.user.findUnique({
            where: { email: userEmail },
            select: { id: true },
        });

        if (!user) {
            return c.json(
                {
                    success: false,
                    message: "User email does not found!",
                },
                404
            );
        }

        c.set("user", user);

        await next();
    } catch (error: unknown) {
        if (error instanceof Error) {
            return c.json(
                {
                    success: false,
                    message: "something went wrong",
                    error: error.message,
                },
                500
            );
        }
        return c.json(
            {
                success: false,
                message: "something went wrong, please try again later",
            },
            500
        );
    }
});
