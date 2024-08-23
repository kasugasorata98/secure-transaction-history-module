import { hashPassword, verifyPassword } from "./bcryptUtils";

jest.mock("react-native-bcrypt", () => ({
  genSaltSync: jest.fn().mockReturnValue("salt"),
  hashSync: jest
    .fn()
    .mockImplementation((password, salt) => `hashed_${password}_${salt}`),
  compareSync: jest
    .fn()
    .mockImplementation(
      (enteredPassword, hashedPassword) =>
        hashedPassword === `hashed_${enteredPassword}_salt`
    ),
}));

describe("Password functions", () => {
  it("should hash a password correctly", () => {
    const password = "myPassword";
    const hashedPassword = hashPassword(password);
    expect(hashedPassword).toBe("hashed_myPassword_salt");
  });

  it("should verify a correct password", () => {
    const enteredPassword = "myPassword";
    const storedHashedPassword = "hashed_myPassword_salt";
    const isMatch = verifyPassword(enteredPassword, storedHashedPassword);
    expect(isMatch).toBe(true);
  });

  it("should not verify an incorrect password", () => {
    const enteredPassword = "wrongPassword";
    const storedHashedPassword = "hashed_myPassword_salt";
    const isMatch = verifyPassword(enteredPassword, storedHashedPassword);
    expect(isMatch).toBe(false);
  });
});
