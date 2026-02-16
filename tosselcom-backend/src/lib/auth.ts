import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./prisma";
import { sendEmail } from "./email";

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
        async sendResetPassword({ user, url }) {
            // Extraction du token de l'URL pour l'afficher comme un "code" si besoin
            // Mais ici on va envoyer l'URL complète pour la simplicité, 
            // tout en précisant que c'est pour réinitialiser le mdp.
            const token = new URL(url).searchParams.get("token");

            await sendEmail({
                to: user.email,
                subject: "Réinitialisation de votre mot de passe - TOSSELCOM",
                html: `
                    <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
                        <h2 style="color: #141414;">Réinitialisation de mot de passe</h2>
                        <p>Bonjour ${user.name || ""},</p>
                        <p>Vous avez demandé la réinitialisation de votre mot de passe pour votre compte TOSSELCOM.</p>
                        <div style="margin: 30px 0; text-align: center;">
                            <p style="font-size: 14px; color: #666;">Voici votre code de vérification :</p>
                            <p style="font-size: 32px; font-weight: bold; letter-spacing: 5px; color: #141414; background: #f7f7f7; padding: 20px; border-radius: 8px; display: inline-block;">
                                ${token}
                            </p>
                        </div>
                        <p>Ou cliquez sur le lien ci-dessous :</p>
                        <a href="${url}" style="background: #141414; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">Réinitialiser mon mot de passe</a>
                        <p style="margin-top: 30px; font-size: 12px; color: #999;">Si vous n'avez pas demandé ce changement, vous pouvez ignorer cet e-mail.</p>
                    </div>
                `
            });
        },
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
