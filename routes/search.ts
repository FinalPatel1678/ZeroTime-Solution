import express from "express";
import { search } from "../services/searchService";

const router = express();

router.route("/").post(search);

export default router;
