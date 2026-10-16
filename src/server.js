
import express from 'express'; 
import path, {dirname} from 'path';
import { fileURLToPath } from 'url';
import authRoutes from './routes/authRoutes.js';
import todoRoutes from './routes/todoRoutes.js'; 
import authMiddleware from './middleware/authMiddleware.js';

const app = express();

const ports = {
    "dev": 8383,
    "real": 5003
};

// GET the file path from the URL of the current module
const __filename = fileURLToPath(import.meta.url);
// GET Directory name

const __dirname = dirname(__filename);
// Middleware -> 
app.use(express.json());
// Expect './public' files ->
app.use(express.static(path.join(__dirname, '../public')));

// ------------------------------------------------ \\

const currentEnv = process.env.NODE_ENV || "dev";
const PORT = ports[currentEnv];


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Routes: 
app.use('/auth', authRoutes);
app.use('/todos', authMiddleware, todoRoutes);

// Launch : 
app.listen(PORT, () => {
    console.log(`Server started on : http://localhost:${PORT}`);
});
