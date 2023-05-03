import { Request, Response } from "express";
import User from "../models/user";

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find({});
    res.status(200).json({ data: users });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Произошла ошибка на сервере" });
  }
};

export const getUserById = async (req: Request, res: Response) => {
  const id = req.params.userId;
  try {
    if (!id || isNaN(Number(id))) {
      return res.status(400).json({ message: "Неверный запрос" });
    }
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).send("Пользователь не найден");
    }
    res.status(200).json({ data: user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Произошла ошибка на сервере" });
  }
};

export const createUsers = async (req: Request, res: Response) => {
  const { name, about, avatar } = req.body;
  try {
    if (!name || !about || !avatar) {
      return res.status(400).json({ message: "Не все поля заполнены" });
    }
    const user = await User.create({
      name: name,
      about: about,
      avatar: avatar,
    });
    res.status(201).json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Произошла ошибка на сервере" });
  }
};
