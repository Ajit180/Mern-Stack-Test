import { getRandomStatements, updateStatement } from "../service/statementservice.js";


export const getRandomStatementsController = async (req, res) => {
  try {
    const statements = await getRandomStatements();
    res.status(200).json(statements);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


export const updateStatementController = async (req, res) => {
  try {
    const updated = await updateStatement(req.params.id, req.body.text);
    if (!updated) {
      return res.status(404).json({ error: "Statement not found" });
    }
    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


export const checkResultController = async (req, res) => {
  try {
    const { statements } = req.body;

    const results = statements.map((s) => {
      const text = s.text.trim();

      let errors = [];

      if (!/^[A-Z]/.test(text)) {
        errors.push("Should start with a capital letter");
      }
      if (!/[.?!]$/.test(text)) {
        errors.push("Should end with a full stop");
      }
      if (text.split(" ").length < 3) {
        errors.push("Too short, should be at least 3 words");
      }

      return {
        id: s._id,
        text,
        isCorrect: errors.length === 0,
        errors,
      };
    });

    res.status(200).json({ results });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

