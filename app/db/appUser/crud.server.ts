import { FieldValue } from "firebase-admin/firestore";
import { firestore } from "../firestore.server";
import { Minor, Student } from "~/db/registrations/registration-types";

interface AppUser {
  id: string;
  email: string;
  createdDate: string;
  updatedDate: string;
  language: "en" | "es";
  address?: {
    street: string;
    unit: string;
    city: string;
    state: string;
    zip: string;
  };
  household_adults?: number;
  minors?: Minor[];
  students?: Student[];
}

interface AppUserDbModel extends Omit<AppUser, "id"> {}

interface AppUserCreate
  extends Omit<AppUserDbModel, "createdDate" | "updatedDate"> {}

export const appUserDb = () => {
  // const database = intializeFb();
  const collection = firestore.collection("/appUsers");

  const read = async (id: string) => {
    const docRef = await collection.doc(id).get();
    const doc = docRef.data();
    if (!doc) {
      return null;
    }

    return {
      id: doc.id,
      email: doc?.email ?? "error",
      language: doc?.language ?? "en",
      students: doc?.students ?? [],
      address: doc?.address ?? {
        street: "",
        unit: "",
        city: "",
        state: "",
        zip: "",
      },
      household_adults: doc?.household_adults ?? 1,
      minors: doc?.minors ?? [],
    };
  };

  const create = async ({
    data,
    appUserId,
  }: {
    data: AppUserCreate;
    appUserId: string;
  }) => {
    const docRef = collection.doc(appUserId);

    const writeData = {
      ...data,
      createdDate: FieldValue.serverTimestamp(),
      updatedDate: FieldValue.serverTimestamp(),
    };

    return await docRef.set(writeData);
  };

  const update = async (id: string, data: Partial<AppUserDbModel>) => {
    const docRef = collection.doc(id);
    const writeData = {
      ...data,
      updatedDate: FieldValue.serverTimestamp(),
    };

    const write = await docRef.update(writeData);
    return write;
  };

  const addStudent = async (id: string, student: Student) => {
    const docRef = collection.doc(id);
    const writeData = {
      students: FieldValue.arrayUnion(student),
    };

    const write = await docRef.update(writeData);
    return write;
  };

  const removeStudent = async ({
    appUserId,
    studentId,
  }: {
    appUserId: string;
    studentId: string;
  }) => {
    const docRef = collection.doc(appUserId);
    const doc = await read(appUserId);

    const currentStudents = doc?.students ?? [];

    const newStudents = currentStudents.filter(
      (student: Student) => student.id !== studentId
    );
    const writeData = {
      students: newStudents,
    };

    const write = await docRef.update(writeData);
    return write;
  };

  const addMinor = async ({
    appUserId,
    minor,
  }: {
    appUserId: string;
    minor: Minor;
  }) => {
    const docRef = collection.doc(appUserId);

    const writeData = {
      minors: FieldValue.arrayUnion(minor),
    };

    const write = await docRef.update(writeData);
    return write;
  };

  const removeMinor = async ({
    appUserId,
    minorId,
  }: {
    appUserId: string;
    minorId: string;
  }) => {
    const docRef = collection.doc(appUserId);
    const doc = await read(appUserId);

    const currentMinors = doc?.minors ?? [];

    const newMinors = currentMinors.filter(
      (minor: Minor) => minor.id !== minorId
    );
    const writeData = {
      minors: newMinors,
    };

    const write = await docRef.update(writeData);
    return write;
  };

  return {
    read,
    create,
    update,
    addStudent,
    removeStudent,
    addMinor,
    removeMinor,
  };
};
