import express from 'express';
import router from "./routes";
import { connectBD } from './config/db';

const PORT = 3002;
const app = express();

app.use(express.json());
app.use('/', router);

connectBD();

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});

export default app;