import { z } from "zod";

export const AddMinorSchema = z.object({
  fname: z.string({ required_error: "First Name is required" }),
  lname: z.string({ required_error: "Last Name is required" }),
  birthyear: z.number({ required_error: "Birth Year is required" }),
});

export const RemoveMinorSchema = z.object({
  minorId: z.string({ required_error: "Minor ID is required" }),
});

export const ValidActionTypes = z.object({
  type: z.enum(["addMinor", "removeMinor"]),
});
