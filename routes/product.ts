import { Router, Request, Response, NextFunction } from "express";
import {
  createProduct,
  getProduct,
  getAllProduct,
} from "../Controllers/product.js";
import { logRequestMiddleware } from "../Middleware/printInfoMiddleware.js";
import { prodeuct } from "../db/entities/Product.js";

const router = Router();

router.get("/:id", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const Id = Number(req.params.id);
    const shop = await getProduct(Id);

    res.json({
      message: "Product retrieved successfully",
      success: true,
      prodeuct,
    });
  } catch (error) {
    console.log("Error: " + error);
    next(error);
  }
});


router.get("/", logRequestMiddleware, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const shop = await getAllProduct();
    res.json({
      message: "Product retrieved successfully",
      success: true,
      prodeuct,
    });
  } catch (error) {
    console.log("Error: " + error);
    next(error);
  }
});

router.post("/", async (req: Request, res: Response, next: NextFunction) => {
  const {id, name,price } = req.body;

  if (!name || !id || price === undefined) {
    return res.status(400).json({
      message: "Some fields are missing",
      success: false,
    });
  }

  try {
    const shop = await createProduct(req.body);
    res.json({
      message: "Product created successfully",
      success: true,
      prodeuct,
    });
  } catch (error) {
    console.log("Error: " + error);
    next(error);
  }
});

export default router;