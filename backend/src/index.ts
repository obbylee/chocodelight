import { Hono } from "hono";
import productsRoute from "./routes/products";
import cartRoute from "./routes/cart";
import authRoute from "./routes/auth";
import { logger } from "hono/logger";
import { cors } from "hono/cors";

const app = new Hono();

// Configure Middlewares and enable cors
app.use("*", logger()).use("*", cors());

app.get("/", (c) => {
    return c.json({
        message: "welcome to chocodelight API's! please use it mindfuly",
    });
});

app.route("/auth", authRoute);
app.route("/products", productsRoute);
app.route("/cart", cartRoute);

export default app;
