import { isValidEmail } from "./validationUtils";

describe("isValidEmail", () => {
  it("should return true for a valid email", () => {
    const result = isValidEmail("test@example.com");
    expect(result).toBe(true);
  });

  it("should return false for an invalid email", () => {
    const result = isValidEmail("invalid-email");
    expect(result).toBe(false);
  });

  it("should return false for an empty string", () => {
    const result = isValidEmail("");
    expect(result).toBe(false);
  });

  it("should return false for an email with missing domain", () => {
    const result = isValidEmail("test@");
    expect(result).toBe(false);
  });

  it('should return false for an email with missing "@" symbol', () => {
    const result = isValidEmail("testexample.com");
    expect(result).toBe(false);
  });
});
