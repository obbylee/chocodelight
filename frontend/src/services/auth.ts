const BACKEND_API_URL = import.meta.env.VITE_BACKEND_API_URL;

type UserLogin = {
    email: string;
    password: string;
};

export const doLogin = async (payload: UserLogin) => {
    const result = await fetch(`${BACKEND_API_URL}/auth/login`, {
        method: "POST",
        body: JSON.stringify(payload),
        headers: { "Content-Type": "application/json" },
    });
    const data = await result.json();
    return data;
};

export const doRegistration = async (payload: UserLogin) => {
    const result = await fetch(`${BACKEND_API_URL}/auth/register`, {
        method: "POST",
        body: JSON.stringify(payload),
        headers: { "Content-Type": "application/json" },
    });
    const data = await result.json();
    return data;
};
