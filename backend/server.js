import express from 'express';
import data from './data.js';
import mongoose from 'mongoose';
import seedRouter from './routes/seedRoutes.js';
import productRouter from './routes/productRoutes.js';
import userRouter from './routes/userRoutes.js';
import orderRouter from './routes/orderRoutes.js';
const app = express();
mongoose.set('strictQuery', true);
mongoose
  .connect(`mongodb://localhost:27017/Amazona`)
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
  res.send(process.env.PAYPAL_CLIENT_ID || 'sb')  // sb for sandbox
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
  console.log(`serve at http://localhost:${port}`);
});