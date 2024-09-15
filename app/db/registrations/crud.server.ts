import { FieldValue, Timestamp } from "firebase-admin/firestore";
import { firestore } from "../firestore.server";
import {
  Registration,
  RegistrationCreate,
  RegistrationDb,
} from "./registration-types";

export const regDb = ({ semesterId }: { semesterId: string }) => {
  const collection = firestore.collection(
    `/semesters/${semesterId}/registrations`
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
      createdDate: doc.data()?.createdDate ?? Timestamp.fromDate(new Date()),
    } as Registration;
  };

  const create = async (data: RegistrationCreate) => {
    const docRef = collection.doc();

    const writeData = {
      ...data,
      status: "registered",
      createdDate: FieldValue.serverTimestamp(),
      updatedDate: FieldValue.serverTimestamp(),
    };

    await docRef.set(writeData);

    return docRef.id;
  };

  const update = async (id: string, data: Partial<RegistrationDb>) => {
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
