import { Router, Request, Response, NextFunction } from "express";
import {
  createShop,
  getShop,
  getAllShop,
} from "../Controllers/shop.js";
import { logRequestMiddleware } from "../Middleware/printInfoMiddleware.js";
import { Shop } from "../db/entities/Shop.js";

const router = Router();

router.get("/:id", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const Id = Number(req.params.id);
    const shop = await getShop(Id);

    res.json({
      message: "Shop retrieved successfully",
      success: true,
      Shop,
    });
  } catch (error) {
    console.log("Error: " + error);
    next(error);
  }
});


router.get("/", logRequestMiddleware, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const shop = await getAllShop();
    res.json({
      message: "shop retrieved successfully",
      success: true,
      shop,
    });
  } catch (error) {
    console.log("Error: " + error);
    next(error);
  }
});

router.post("/", async (req: Request, res: Response, next: NextFunction) => {
  const {id, shopname,email ,password } = req.body;

  if (!shopname || !id || email || password === undefined) {
    return res.status(400).json({
      message: "Some fields are missing",
      success: false,
    });
  }

  try {
    const shop = await createShop(req.body);
    res.json({
      message: "shop created successfully",
      success: true,
      shop,
    });
  } catch (error) {
    console.log("Error: " + error);
    next(error);
  }
});

export default router;