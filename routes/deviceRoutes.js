import express from "express";
const router = express.Router();

import {
  createDevice,
  getAllDeviceData,
  updateDevice,
  deleteDevice,
} from "../controllers/deviceController.js";

router.route("/").post(createDevice).get(getAllDeviceData);
router.route("/:id").put(updateDevice).delete(deleteDevice);

export default router;
