import bcrypt from "bcrypt";

export const hashPassword = async (password: string) => {
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  return hashedPassword;
};

export const verifyPassword = async (
  enteredPassword: string,
  storedHashedPassword: string
) => {
  const isMatch = await bcrypt.compare(enteredPassword, storedHashedPassword);
  return isMatch;
};
