import Statement from "../model/statement.js";

// Get 3 random statements
export const getRandomStatements = async () => {
  const statements = await Statement.aggregate([{ $sample: { size: 3 } }]);
  return statements;
};

// Update a statement
export const updateStatement = async (id, newText) => {
  const updated = await Statement.findByIdAndUpdate(
    id,
    { text: newText },
    { new: true }
  );
  return updated;
};
