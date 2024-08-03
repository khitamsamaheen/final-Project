import { Router, Request, Response, NextFunction } from "express";
import {
  createHotline,
  getHotline,
  getAllHotline,
} from "../Controllers/hotline.js";
import { logRequestMiddleware } from "../Middleware/printInfoMiddleware.js";
import { hotline } from "../db/entities/Hotline.js";

const router = Router();

router.get("/:id", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const shop = await getHotline();

    res.json({
      message: "Product retrieved successfully",
      success: true,
      hotline,
    });
  } catch (error) {
    console.log("Error: " + error);
    next(error);
  }
});


router.get("/", logRequestMiddleware, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const shop = await getAllHotline();
    res.json({
      message: "hotline retrieved successfully",
      success: true,
      hotline,
    });
  } catch (error) {
    console.log("Error: " + error);
    next(error);
  }
});

router.post("/", async (req: Request, res: Response, next: NextFunction) => {
  const {id, hotlineNumber} = req.body;

  if (!id || hotlineNumber === undefined) {
    return res.status(400).json({
      message: "Some fields are missing",
      success: false,
    });
  }

  try {
    const shop = await createHotline(req.body);
    res.json({
      message: "Product created successfully",
      success: true,
      hotline,
    });
  } catch (error) {
    console.log("Error: " + error);
    next(error);
  }
});

export default router;