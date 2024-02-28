import { Router, Request, Response, NextFunction } from "express";

const router = Router();

router.get("/", async (req: Request, res: Response) => {
  console.log("====================================");
  console.log("Came here");
  console.log("====================================");
});
router.use((req: Request, res: Response, next: NextFunction) => {
  res.status(404).send("Wrong URL");
});

export default router;
