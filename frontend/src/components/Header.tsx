import { NavLink, useNavigate } from "react-router-dom";
import useAuth from "../libs/auth/useAuth";

export default function () {
    const navigate = useNavigate();
    const { isAuthenticated, handleSetAuthentication } = useAuth();
    return (
        <header className="w-full border-b-2 px-10">
            <nav className="w-full mx-auto max-w-[1200px] flex flex-col md:flex-row md:justify-between items-center">
                <NavLink to="/" className="font-medium text-2xl">
                    ChocoDelight
                </NavLink>

                <div className="flex flex-col md:flex-row gap-4 py-4">
                    <div className="flex">
                        <a
                            href="/products"
                            className="py-2 px-6 rounded-md hover:bg-gray-100"
                        >
                            Products
                        </a>

                        <a
                            href="/cart"
                            className="py-2 px-6 rounded-md hover:bg-gray-100"
                        >
                            Chart
                        </a>
                    </div>

                    {isAuthenticated ? (
                        <button
                            type="button"
                            className="py-2 px-6 w-auto border rounded-md hover:bg-gray-100"
                            onClick={() => {
                                handleSetAuthentication(false);
                                localStorage.setItem("token", "");
                                navigate("/", { replace: true });
                            }}
                        >
                            Logout
                        </button>
                    ) : (
                        <div className="flex gap-4">
                            <NavLink
                                to="/sign-in"
                                className="py-2 px-6 w-auto border rounded-md hover:bg-gray-100"
                            >
                                Sign in
                            </NavLink>

                            <NavLink
                                to="/sign-up"
                                className="py-2 px-6 w-auto rounded-md bg-black text-white hover:bg-gray-100 hover:text-black hover:border-gray-300"
                            >
                                Register
                            </NavLink>
                        </div>
                    )}
                </div>
            </nav>
        </header>
    );
}
