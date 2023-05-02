import express from "express";
import path from "path";
import mongoose from "mongoose";
import router from "./routes";

const { PORT = 3000, DB_URL = "mongodb://127.0.0.1:27017/mestodb" } =
  process.env;

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
app.use(router);

const start = async () => {
  try {
    // подключаемся к серверу MongoiDB
    await mongoose.connect(DB_URL);

    app.listen(PORT);
    console.log("Сервер запущен", PORT);
  } catch (err) {
    console.log("Ошибка подключения", err);
  }
};

start();
