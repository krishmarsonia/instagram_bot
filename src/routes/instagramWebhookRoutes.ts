import { Router } from "express";
import {
  instagramController,
  postInstagramWebhookController,
  rootController,
  testController,
} from "../controllers/instagramWebhookControllers";

const router = Router();

router.get("/webhook", instagramController);

router.post("/webhook", postInstagramWebhookController);

router.get("/test", testController);

router.get("/", rootController)

export default router;
