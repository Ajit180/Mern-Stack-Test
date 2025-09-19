import mongoose from "mongoose";

const statementSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
});

const Statement = mongoose.model("Statement", statementSchema);

export default Statement;
