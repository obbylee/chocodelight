import { Argon2id } from "oslo/password";

export const hashPassword = async (plainTextPassword: string) => {
    const argon2id = new Argon2id();
    const hash = await argon2id.hash(plainTextPassword);
    return hash;
};

export const verifyPassword = async (
    currentHashedPass: string,
    plainTextPassword: string
) => {
    const argon2id = new Argon2id();
    const validPassword = await argon2id.verify(
        currentHashedPass,
        plainTextPassword
    );
    return validPassword;
};
