import { Router } from "express";
import { instagramController, testController } from "../controllers/instagramWebhookControllers";

const router = Router();

router.get("/webhook", instagramController);

router.get("/test", testController);

export default router;