import { Hono } from "hono";
import { handle } from "hono/vercel";

import images from "@/app/api/[[...route]]/images";

// REVERT TO "edge" BELOW IF PLANNING ON RUNNING ON EDGE:
export const runtime = "nodejs";

const app = new Hono().basePath("/api");

const routes = app
    .route("/images", images);

export const GET = handle(app);

export type AppType = typeof routes;