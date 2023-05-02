import express from "express";
import path from "path";

const { PORT = 3000 } = process.env;

const app = express();

const start = async () => {
  try {
    await app.listen(PORT);
    console.log("Сервер запущен", PORT);
  } catch (err) {
    console.log("Ошибка подключения", err);
  }
};
