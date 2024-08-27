import { FieldValue } from "firebase-admin/firestore";
import { firestore } from "../firestore.server";

export const userSemestersDb = ({ appUserId }: { appUserId: string }) => {
  const collection = firestore.collection(`/appUsers/${appUserId}/semesters`);

  const read = async ({ semesterId }: { semesterId: string }) => {
    const docRef = await collection.doc(semesterId).get();
    const doc = docRef.data();
    if (!doc) {
      return null;
    }

    return {
      id: doc.id,
      status: "enrolled",
    };
  };

  const create = async ({
    semesterId,
    status,
  }: {
    semesterId: string;
    status: "enrolled" | "unenrolled";
  }) => {
    const docRef = collection.doc(semesterId);
    const writeData = {
      status,
      createdDate: FieldValue.serverTimestamp(),
      updatedDate: FieldValue.serverTimestamp(),
    };

    return await docRef.set(writeData);
  };

  const update = async (id: string, status: "enrolled" | "unenrolled") => {
    const docRef = collection.doc(id);
    const writeData = {
      status,
      updatedDate: FieldValue.serverTimestamp(),
    };
    return await docRef.update(writeData);
  };

  return {
    read,
    create,
    update,
  };
};
