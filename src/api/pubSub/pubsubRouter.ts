import express from "express";
import { controllerHandler } from "../../shared/controllerHandler";
import { PubSubController } from "./pubsubController";

const router = express.Router();
const call = controllerHandler;
const PubSub = new PubSubController();

router.post("/subscribe/:topic_slug", call(PubSub.subscribe, (req, _res, _next) => [req.params.topic_slug, req.body]));

router.post("/publish/:topic_slug", call(PubSub.publish, (req, _res, _next) => [req.params.topic_slug, req.body]));

router.post("/event", call(PubSub.event, (req, _res, _next) => [req.body]));

router.get("/", (rq, rs) => rs.status(200).send("good work 🕺🏼🕺🏼🕺🏼🕺🏼🕺🏼🕺🏼"));

export const PubSubRouter = router;
