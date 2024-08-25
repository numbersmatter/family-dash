import { parseWithZod } from "@conform-to/zod";
import { AddStudentSchema, RemoveStudentSchema } from "../schemas";
import { json } from "@remix-run/node";

interface Student {
  fname: string;
  lname: string;
  school: string;
}

const addStudentMutation = async ({
  students,
  userId,
}: {
  students: Student;
  userId: string;
}) => {
  const { fname, lname, school } = students;
  const id = "234";
  return id;
};

export const addStudent = async ({
  formInput,
  userId,
  reg_id,
}: {
  formInput: FormData;
  userId: string;
  reg_id: string;
}) => {
  const submission = parseWithZod(formInput, { schema: AddStudentSchema });
  if (submission.status === "success") {
    const write = await addStudentMutation({
      students: submission.value,
      userId,
    });
    return json(submission.reply());
  }
  return json(submission.reply());
};

const removeStudentMutation = async ({
  userId,
  studentId,
  reg_id,
}: {
  userId: string;
  studentId: string;
  reg_id: string;
}) => {
  const id = studentId;
  return id;
};

export const removeStudent = async ({
  formInput,
  userId,
  reg_id,
}: {
  formInput: FormData;
  userId: string;
  reg_id: string;
}) => {
  const submission = parseWithZod(formInput, { schema: RemoveStudentSchema });
  if (submission.status !== "success") {
    return json(submission.reply());
  }

  const write = await removeStudentMutation({
    studentId: submission.value.studentId,
    userId,
    reg_id,
  });
  return json(submission.reply());
};
