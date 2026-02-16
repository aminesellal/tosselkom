import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./prisma";

export const auth = betterAuth({
    database: prismaAdapter(prisma, {
        provider: "postgresql",
    }),
    trustedOrigins: [
        "http://localhost:5173",
        "http://localhost:5176",
        "http://127.0.0.1:5173",
        "http://127.0.0.1:5176"
    ],
    emailAndPassword: {
        enabled: true,
    },
    user: {
        additionalFields: {
            phone: {
                type: "string",
                required: true,
            },
            role: {
                type: "string",
                required: true,
            }
        }
    }
});
