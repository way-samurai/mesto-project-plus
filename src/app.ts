import express from "express";
import path from "path";
import mongoose from "mongoose";

const { PORT = 3000, DB_URL = "mongodb://localhost:27017/mestodb" } =
  process.env;

const app = express();

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
