import { parseWithZod } from "@conform-to/zod";
import { AddStudentSchema, RemoveStudentSchema } from "./schema";
import { json } from "@remix-run/node";
import { db } from "~/db/db.server";
import { FieldValue } from "firebase-admin/firestore";

interface Student {
  fname: string;
  lname: string;
  school: "tps" | "lde" | "tms" | "ths";
}

const addStudentMutation = async ({
  student,
  appUserId,
}: {
  student: Student;
  appUserId: string;
}) => {
  // make random id
  const studentId = Math.floor(Math.random() * 10000).toLocaleString();

  const write = await db.appUser.addStudent(appUserId, {
    ...student,
    id: studentId,
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
      student: submission.value,
      appUserId,
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
