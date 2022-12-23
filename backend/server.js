import express from 'express';
import mongoose from 'mongoose';
import seedRouter from './routes/seedRoutes.js';
import productRouter from './routes/productRoutes.js';
import userRouter from './routes/userRoutes.js';
import orderRouter from './routes/orderRoutes.js';
import cors from 'cors';
import data from "dotenv"
const app = express();

app.use(cors())
mongoose.set('strictQuery', true);
mongoose.connect('mongodb+srv://vishalgai:UKkUknD3ztBhSxdV@cluster0.apnmfbt.mongodb.net/myshopee?retryWrites=true&w=majority',{ useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('connected to db');
  })
  .catch((err) => {
    console.log(err.message);
  });

// converting form data into json 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get(`/api/keys/paypal`,(req,res)=>{
  res.send(data.PAYPAL_CLIENT_ID || 'sb')  // sb for sandbox
});

app.use('/api/seed', seedRouter);
app.use('/api/products', productRouter);
app.use('/api/users', userRouter);
app.use('/api/orders', orderRouter);

// error handler if error occured then this middleware is executed
app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message });
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`started at http://localhost:${port}`);
});