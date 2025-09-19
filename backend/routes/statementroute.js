import express from "express";
import { checkResultController, getRandomStatementsController, updateStatementController } from "../controller/statementcontroller.js";
import Statement from "../model/statement.js";


const router = express.Router();

router.get("/statements/random", getRandomStatementsController);
router.put("/statements/:id", updateStatementController);
router.post("/statements", async (req, res) => {
  try {
    const statement = await Statement.create(req.body);
    res.status(201).json(statement);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.post("/result", checkResultController);

export default router;
