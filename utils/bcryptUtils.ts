import bcrypt from "react-native-bcrypt";

export const hashPassword = (password: string) => {
  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(password, salt);
  return hashedPassword;
};

export const verifyPassword = (
  enteredPassword: string,
  storedHashedPassword: string
) => {
  return bcrypt.compareSync(enteredPassword, storedHashedPassword);
};
