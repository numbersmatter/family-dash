import { parseWithZod } from "@conform-to/zod";
import { AddStudentSchema, RemoveStudentSchema } from "../schemas";
import { json } from "@remix-run/node";
import { db } from "~/db/db.server";

interface Student {
  fname: string;
  lname: string;
  school: "tps" | "lde" | "tms" | "ths";
}

const addStudentMutation = async ({
  students,
  appUserId,
  semesterId,
}: {
  students: Student;
  appUserId: string;
  semesterId: string;
}) => {
  // make random id
  const studentId = Math.floor(Math.random() * 10000).toLocaleString();

  const write = await db.applications({ semesterId }).addStudent({
    appUserId,
    data: { ...students, id: studentId },
  });

  return write;
};

export const addStudent = async ({
  formInput,
  appUserId,
  semesterId,
}: {
  formInput: FormData;
  appUserId: string;
  semesterId: string;
}) => {
  const submission = parseWithZod(formInput, { schema: AddStudentSchema });
  if (submission.status === "success") {
    const write = await addStudentMutation({
      students: submission.value,
      appUserId,
      semesterId,
    });
    return json(submission.reply());
  }
  return json(submission.reply());
};

const removeStudentMutation = async ({
  appUserId,
  studentId,
  semesterId,
}: {
  studentId: string;
  appUserId: string;
  semesterId: string;
}) => {
  const write = await db.applications({ semesterId }).removeStudent({
    appUserId,
    studentId,
  });
  return write;
};

export const removeStudent = async ({
  formInput,
  appUserId,
  semesterId,
}: {
  formInput: FormData;
  appUserId: string;
  semesterId: string;
}) => {
  const submission = parseWithZod(formInput, { schema: RemoveStudentSchema });
  if (submission.status !== "success") {
    return json(submission.reply());
  }

  const write = await removeStudentMutation({
    studentId: submission.value.studentId,
    semesterId,
    appUserId,
  });
  return json(submission.reply());
};
