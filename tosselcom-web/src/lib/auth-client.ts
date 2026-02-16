import { createAuthClient } from "better-auth/react"

export const authClient = createAuthClient({
    // On force 127.0.0.1 pour éviter les bugs de résolution localhost sur Windows/WSL
    baseURL: "http://127.0.0.1:3000"
})

export const { signIn, signUp, useSession, signOut } = authClient;
