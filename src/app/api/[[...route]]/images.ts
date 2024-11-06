import { Hono } from "hono";

import { unsplash } from "@/lib/unsplash";

const DEFAULT_IMG_COUNT = 50;
const DEFAULT_COLLECTION_IDS = ["317099"];

const app = new Hono()
    .get("/", async (c) => {
        const images = await unsplash.photos.getRandom({
            collectionIds: DEFAULT_COLLECTION_IDS,
            count: DEFAULT_IMG_COUNT,
        });

        if (images.errors) {
            console.error("Unsplash API error:", images.errors);
            console.log("Unsplash API error:",   images.errors);

            return c.json({ error: "Something went wrong. 😞"}, 400);
        }
        let response = images.response;

        // IF SINGLE ITEM RETURNED ONLY, TURN ITEM INTO ARRAY FOR EASE OF USE BELOW
        if (!Array.isArray(response)) {
            response = [response];
        }

        return c.json({ data: response });
    });

export default app;