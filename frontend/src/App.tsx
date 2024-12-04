import { createBrowserRouter } from "react-router-dom";
import HomePage from "./features/onboard/pages/HomePage";
import SigninPage from "./features/auth/pages/SigninPage";
import SignupPage from "./features/auth/pages/SignupPage";
import ProductPage from "./features/product/pages/ProductPage";
import ProductDetailsPage from "./features/product/pages/ProductDetailsPage";
import CartPage from "./features/cart/pages/CartPage";

export const appRouter = createBrowserRouter([
    {
        path: "/",
        element: <HomePage />,
    },
    {
        path: "/sign-in",
        element: <SigninPage />,
    },
    {
        path: "/sign-up",
        element: <SignupPage />,
    },
    {
        path: "/products",
        element: <ProductPage />,
    },
    {
        path: "/products/:id",
        element: <ProductDetailsPage />,
    },
    {
        path: "/cart",
        element: <CartPage />,
    },
]);
