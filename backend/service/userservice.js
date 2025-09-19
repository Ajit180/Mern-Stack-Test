import User from "../model/user.js";


import bcrypt from "bcrypt";

export const signup = async (userData) => {
  const { name, email, password } = userData;

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Error("User already exists with this email");
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  return {
    message: "Signup successful",
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
    },
  };
};



export const signin = async (loginData) => {
  const { email, password } = loginData;

  // Include password field explicitly
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    throw new Error("Invalid email or password");
  }

  // Compare with bcrypt
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error("Invalid email or password");
  }

  return {
    message: "Signin successful",
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
    },
  };
};

