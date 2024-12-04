const BACKEND_API_URL = import.meta.env.VITE_BACKEND_API_URL;

export const getShoppingCart = async (token: string) => {
    const result = await fetch(`${BACKEND_API_URL}/cart`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
        },
    });
    const data = await result.json();
    return data;
};

export const addCartItem = async ({
    token,
    payload,
}: {
    token: string;
    payload: { productId: string; quantity: number };
}) => {
    const result = await fetch(`${BACKEND_API_URL}/cart/items`, {
        method: "POST",
        body: JSON.stringify(payload),
        headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
        },
    });
    const data = await result.json();
    return data;
};

export const updateCartItem = async ({
    token,
    payload,
}: {
    token: string;
    payload: { productId: string; quantity: number };
}) => {
    const result = await fetch(`${BACKEND_API_URL}/cart/items`, {
        method: "PATCH",
        body: JSON.stringify(payload),
        headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
        },
    });
    const data = await result.json();
    return data;
};

export const deleteCartItem = async ({
    token,
    payload,
}: {
    token: string;
    payload: {
        cartId: string;
        cartItemId: string;
    };
}) => {
    const result = await fetch(`${BACKEND_API_URL}/cart/items`, {
        method: "DELETE",
        body: JSON.stringify(payload),
        headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
        },
    });
    const data = await result.json();
    return data;
};
