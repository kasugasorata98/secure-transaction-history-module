import { z } from "zod";

export const isValidEmail = (email: string) => {
  try {
    z.string().email().parse(email);
    return true;
  } catch (e) {
    return false;
  }
};
