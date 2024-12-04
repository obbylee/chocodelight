const BACKEND_API_URL = import.meta.env.VITE_BACKEND_API_URL;

export const getProducts = async () => {
    const result = await fetch(`${BACKEND_API_URL}/products`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
    });
    const data = await result.json();
    return data;
};

export const getProductById = async (productId: string = "") => {
    const result = await fetch(`${BACKEND_API_URL}/products/${productId}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
    });
    const data = await result.json();
    return data;
};
