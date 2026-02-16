import { signIn, signUp, signOut } from "../lib/auth-client";
import { UserRole } from "../types";

export const authService = {
    login: async (email: string, password: string) => {
        const { data, error } = await signIn.email({
            email,
            password,
        });

        if (error) throw new Error(error.message || "Erreur de connexion");
        return data;
    },

    register: async (email: string, password: string, name: string, role: UserRole, phone: string) => {
        // @ts-ignore
        const { data, error } = await signUp.email({
            email,
            password,
            name,
            phone,
            role,
        });

        if (error) throw new Error(error.message || "Erreur lors de l'inscription");
        return data;
    },

    logout: async () => {
        await signOut();
        window.location.href = '/';
    }
};
