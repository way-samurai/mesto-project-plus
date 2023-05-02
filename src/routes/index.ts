import { Request, Response, Router } from "express";
import cardsRouter from "./cardsRouter";
import usersRoutes from "./usersRouter";

const router = Router();

router.use("/users", usersRoutes);
router.use("cards", cardsRouter);
router.use((req: Request, res: Response) => {
  res.status(404).send("Страница не найдена");
});
