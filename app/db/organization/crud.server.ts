import { DocumentData, FieldValue } from "firebase-admin/firestore";
import { firestore } from "../firestore.server";

export const organizationDb = () => {
  const collection = firestore.collection(`/organization`);

  const read = async (id: string) => {
    const docRef = await collection.doc(id).get();
    const doc = docRef.data();
    if (!doc) {
      return null;
    }

    return doc;
  };

  const create = async (data: DocumentData) => {
    const docRef = collection.doc();
    const writeData = {
      ...data,
      createdDate: FieldValue.serverTimestamp(),
      updatedDate: FieldValue.serverTimestamp(),
    };

    return await docRef.set(writeData);
  };

  const update = async (id: string, data: DocumentData) => {
    const docRef = collection.doc(id);
    const writeData = {
      ...data,
      updatedDate: FieldValue.serverTimestamp(),
    };
    return await docRef.update(writeData);
  };

  const activeSemester = async () => {
    const docRef = collection.doc("activeSemester");
    const doc = await docRef.get();
    if (!doc) {
      return null;
    }

    const semesterDoc = {
      name: doc.data()?.name ?? "Error: No name",
      semester_id: doc.data()?.semester_id ?? "Error: no semester id",
    };

    return semesterDoc;
  };

  return {
    read,
    create,
    update,
    activeSemester,
  };
};
