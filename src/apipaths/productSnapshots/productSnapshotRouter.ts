import express from "express";
import { getProductSnapshotsOfTheLastHour } from "../../handlers/productSnapshotHandler";

const productSnapshotRouter = express.Router();

productSnapshotRouter.get("/hour", async (req, res) => {
    res.send(await getProductSnapshotsOfTheLastHour());
});

productSnapshotRouter.get("/", async (req, res) => {
});

productSnapshotRouter.post("/", async (req, res) => {
});

productSnapshotRouter.post("/bulk", async (req, res) => {
});

productSnapshotRouter.put("/", async (req, res) => {
});

productSnapshotRouter.delete("/", async (req, res) => {
});

export default productSnapshotRouter;
