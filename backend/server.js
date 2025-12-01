import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './config/mongodb.js';
import connectCloudinary from './config/cloudinary.js';

// Existing Routes
import userRouter from './routes/userRoute.js';
import productRouter from './routes/productRoute.js';
import cartRouter from './routes/cartRoute.js';
import orderRouter from './routes/orderRoute.js';

// ✅ New Chatbot Route
import chatRouter from './routes/chatRoute.js';

// App Config
const app = express();
const port = process.env.PORT || 4000;

// Connect DBs
connectDB();
connectCloudinary();

// Middleware
app.use(express.json());
app.use(cors());

// API Endpoints
app.use('/api/user', userRouter);
app.use('/api/product', productRouter);
app.use('/api/cart', cartRouter);
app.use('/api/order', orderRouter);

// ✅ New Chatbot API
app.use('/api/chat', chatRouter);

app.get('/', (req, res) => {
  res.send('API Working');
});

app.listen(port, () => console.log('Server started on PORT : ' + port));
