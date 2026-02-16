import nodemailer from 'nodemailer';

// Configuration SMTP (à remplir par l'utilisateur ou via .env)
const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || "smtp.ethereal.email",
    port: parseInt(process.env.SMTP_PORT || "587"),
    secure: process.env.SMTP_SECURE === "true",
    auth: {
        user: process.env.SMTP_USER || "user@example.com",
        pass: process.env.SMTP_PASS || "password",
    },
});

export const sendEmail = async ({ to, subject, text, html }: { to: string; subject: string; text?: string; html?: string }) => {
    try {
        const info = await transporter.sendMail({
            from: `"TOSSELCOM" <${process.env.SMTP_FROM || "noreply@tosselcom.com"}>`,
            to,
            subject,
            text,
            html,
        });

        console.log("Message sent: %s", info.messageId);

        // Si on utilise ethereal (pour le test), on log l'URL de l'image
        if (process.env.SMTP_HOST === "smtp.ethereal.email") {
            // @ts-ignore
            console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
        }

        return info;
    } catch (error) {
        console.error("Error sending email:", error);
        // On log quand même le contenu si l'envoi échoue pour le développement
        console.log("--- MOCK EMAIL ---");
        console.log("To:", to);
        console.log("Subject:", subject);
        console.log("Content:", text || html);
        console.log("------------------");
    }
};
