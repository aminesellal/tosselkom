import express from 'express';
import cors from 'cors';
import { auth } from './lib/auth';
import { toNodeHandler } from "better-auth/node";
import courierRoutes from './modules/courier/courier.routes';
import ordersRoutes from './modules/orders/orders.routes';

const app = express();

app.use(cors({
    origin: ["http://localhost:5173", "http://localhost:5176", "http://127.0.0.1:5173", "http://127.0.0.1:5176"],
    credentials: true
}));

// Logger
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
});

// Better Auth
app.all("/api/auth/*", toNodeHandler(auth));

app.use(express.json());

// Basic Order Route (Test)
app.get('/api/orders', async (req, res) => {
    res.json({ message: "Orders route working" });
});

// Routes métier
app.use('/api/courier', courierRoutes);
app.use('/api/orders', ordersRoutes);

app.get('/health', (req, res) => {
    res.json({ status: "ok" });
});

export default app;
