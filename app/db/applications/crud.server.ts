import { FieldValue } from "firebase-admin/firestore";
import { firestore } from "../firestore.server";
import { Student, Minor } from "../registrations/registration-types";
import { Application, ApplicationDb } from "./app-types";

export const applicationsDb = ({ semesterId }: { semesterId: string }) => {
  const collection = firestore.collection(
    `semesters/${semesterId}/applications`
  );

  const read = async (id: string) => {
    const doc = await collection.doc(id).get();
    if (!doc.exists) {
      return null;
    }

    return {
      id: doc.id,
      userId: doc.data()?.userId ?? "error",
      semesterId: doc.data()?.semesterId ?? "error",
      status: doc.data()?.status ?? "error",
      primaryContact: {
        fname: doc.data()?.primaryContact?.fname ?? "error",
        lname: doc.data()?.primaryContact?.lname ?? "error",
        email: doc.data()?.primaryContact?.email ?? "error",
        phone: doc.data()?.primaryContact?.phone ?? "error",
      },
      adults: doc.data()?.adults ?? 0,
      students: doc.data()?.students ?? [],
      minors: doc.data()?.minors ?? [],
    } as Application;
  };

  const create = async ({
    appUserId,
    data,
  }: {
    appUserId: string;
    data: ApplicationDb;
  }) => {
    const docRef = collection.doc(appUserId);

    const writeData = {
      ...data,
      createdDate: FieldValue.serverTimestamp(),
      updatedDate: FieldValue.serverTimestamp(),
    };

    await docRef.set(writeData);
    return docRef.id;
  };

  const update = async ({
    id,
    data,
  }: {
    id: string;
    data: Partial<Application>;
  }) => {
    const docRef = collection.doc(id);
    const updateData = {
      ...data,
      updatedDate: FieldValue.serverTimestamp(),
    };
    await docRef.update(updateData);

    return docRef.id;
  };
  return {
    read,
    create,
    update,
  };
};
