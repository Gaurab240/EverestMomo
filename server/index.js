import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import contactInfo from './routes/contactInfoRoutes.js';
import productInfo from './routes/productRoutes.js';
import fileupload from "express-fileupload";

const app = express();
app.use(cors());
dotenv.config();


app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(fileupload({useTempFiles: true}))

app.use("/api/sendmessage", contactInfo);
app.use("/api/product", productInfo);

const PORT = process.env.PORT;
const CONNECTION = process.env.MONGO_URL;
mongoose
  .connect(CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    app.listen(PORT, () => console.log(`Listening at port ${PORT}`));
  })
  .catch((error) => {
    console.log(error);
  });
