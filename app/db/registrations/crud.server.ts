import { FieldValue } from "firebase-admin/firestore";
import { firestore } from "../firestore.server";

interface Student {
  id: string;
  fname: string;
  lname: string;
  school: "tps" | "lde" | "tms" | "ths";
}
interface Minor {
  id: string;
  fname: string;
  lname: string;
  birthyear: number;
}

interface Registration {
  id: string;
  userId: string;
  semesterId: string;
  status: "in-progress" | "pending" | "accepted" | "declined" | "error";
  primaryContact: {
    fname: string;
    lname: string;
    email: string;
    phone: string;
  };
  adults: number;
  students: Student[];
  minors: Minor[];
}

interface RegistrationDb extends Omit<Registration, "id"> {}

export const regDb = () => {
  const collection = firestore.collection("registrations");

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
    } as Registration;
  };

  const create = async (data: RegistrationDb) => {
    const docRef = collection.doc();

    const writeData = {
      ...data,
      status: "in-progress",
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
