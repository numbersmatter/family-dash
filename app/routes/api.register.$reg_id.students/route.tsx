import { parseWithZod } from "@conform-to/zod";
import { json, type ActionFunctionArgs } from "@remix-run/node";
import { z } from "zod";


export const studentsSchema = z.object({
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
export const action = async (args: ActionFunctionArgs) => {

  const formData = await args.request.formData();
  const submission = parseWithZod(formData, { schema: studentsSchema });

  if (submission.status !== 'success') {
    return json(submission.reply());
  }

  // To-do: do action

  return json(submission.reply());

};


