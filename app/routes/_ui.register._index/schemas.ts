import { z } from "zod";
export const registerSchema = z.object({
  semesterId: z.string(),
  fname: z.string(),
  lname: z.string(),
  email: z.string(),
});
