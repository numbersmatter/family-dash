import { z } from "zod";

export const actionTypesSchema = z.object({
  type: z.enum(
    [
      "updateAdults",
      "updateAddress",
      "addStudent",
      "removeStudent",
      "editStudent",
      "addMinor",
      "removeMinor",
      "updateMinor",
    ],
    {
      errorMap(issue, ctx) {
        switch (issue.code) {
          case "invalid_type": {
            if (ctx.data === undefined) {
              return { message: "Type is required" };
            }
            return { message: "Type is required" };
          }
          case "invalid_enum_value": {
            return {
              message: "That action is not supported",
            };
          }
          default:
            return { message: ctx.defaultError };
        }
      },
    }
  ),
});

export const addressSchema = z.object({
  street: z.string({ required_error: "Street is required" }),
  unit: z.string().default(" "),
  city: z.string({ required_error: "City is required" }),
  state: z.literal("NC", { invalid_type_error: "Must be NC" }),
  zip: z
    .string({ required_error: "Zip is required" })
    .regex(/^\d{5}$/, { message: "Zip must be 5 digits" }),
});

export const adultsSchema = z.object({
  adults: z
    .number({ required_error: "Adults is required" })
    .min(1, { message: "Adults must be greater than 0" }),
});

export const AddStudentSchema = z.object({
  fname: z.string({ required_error: "First Name is required" }),
  lname: z.string({ required_error: "Last Name is required" }),
  school: z.enum(["tps", "lde", "tms", "ths"], {
    errorMap(issue, ctx) {
      switch (issue.code) {
        case "invalid_type": {
          if (ctx.data === undefined) {
            return { message: "School is required" };
          }
          return { message: "School is required" };
        }
        case "invalid_enum_value": {
          return {
            message: "Must be a Thomasville School (TPS, LDE, TMS, THS)",
          };
        }
        default:
          return { message: ctx.defaultError };
      }
    },
  }),
});

export const RemoveStudentSchema = z.object({
  studentId: z.string({ required_error: "Student ID is required" }),
});

export const EditStudentSchema = z.object({
  studentId: z.string({ required_error: "Student ID is required" }),
  fname: z.string({ required_error: "First Name is required" }),
  lname: z.string({ required_error: "Last Name is required" }),
  school: z.enum(["tps", "lde", "tms", "ths"], {
    errorMap(issue, ctx) {
      switch (issue.code) {
        case "invalid_type": {
          if (ctx.data === undefined) {
            return { message: "School is required" };
          }
          return { message: "School is required" };
        }
        case "invalid_enum_value": {
          return {
            message: "Must be a Thomasville School (TPS, LDE, TMS, THS)",
          };
        }
        default:
          return { message: ctx.defaultError };
      }
    },
  }),
});

export const AddMinorSchema = z.object({
  fname: z.string({ required_error: "First Name is required" }),
  lname: z.string({ required_error: "Last Name is required" }),
  birthyear: z.string({ required_error: "Birth Year is required" }),
});

export const RemoveMinorSchema = z.object({
  minorId: z.string({ required_error: "Minor ID is required" }),
});

export const UpdateMinorSchema = z.object({
  minorId: z.string({ required_error: "Minor ID is required" }),
  fname: z.string({ required_error: "First Name is required" }),
  lname: z.string({ required_error: "Last Name is required" }),
  birthyear: z.string({ required_error: "Birth Year is required" }),
});

export const UpdateAdultsSchema = z.object({
  adults: z
    .number({ required_error: "Adults is required" })
    .min(1, { message: "Adults must be greater than 0" }),
});
