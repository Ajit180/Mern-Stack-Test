import { signin, signup } from "../service/userservice.js";

export const signupController = async (req, res) => {
  try {
    const result = await signup(req.body);
    res.status(201).json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const signinController = async (req, res) => {
  try {
    const result = await signin(req.body);
    res.status(200).json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};