import app from './app';
import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT || 3000;

// On force '0.0.0.0' pour être accessible depuis l'extérieur du conteneur/WSL
app.listen(PORT, '0.0.0.0', () => {
    console.log(`
🚀 NEW BACKEND READY
-----------------------------------------
📡 URL: http://127.0.0.1:${PORT}
🏥 Health: http://127.0.0.1:${PORT}/health
🔐 Auth: http://127.0.0.1:${PORT}/api/auth
-----------------------------------------
    `);
});
