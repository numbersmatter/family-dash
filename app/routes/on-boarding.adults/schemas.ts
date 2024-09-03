import { z } from "zod";

export const adultSchema = z.object({
  adults: z.coerce.number().min(1).max(100),
});
