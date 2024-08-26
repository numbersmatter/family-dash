import { FieldValue } from "firebase-admin/firestore";
import { firestore } from "../firestore.server";

interface SemesterDetails {
  name: string;
  description: string;
  helpText: string;
}

interface Semester {
  id: string;
  english: SemesterDetails;
  spanish: SemesterDetails;
  status: "active" | "inactive" | "upcoming";
}

interface SemesterDb extends Omit<Semester, "id"> {}

export const semesterDb = () => {
  const collection = firestore.collection("/semesters");
  const read = async (id: string) => {
    const doc = await collection.doc(id).get();
    if (!doc.exists) {
      return null;
    }

    return {
      id: doc.id,
      english: {
        name: doc.data()?.english?.name ?? "error",
        description: doc.data()?.english?.description ?? "error",
        helpText: doc.data()?.english?.helperText ?? "error",
      },
      spanish: {
        name: doc.data()?.spanish?.name ?? "error",
        description: doc.data()?.spanish?.description ?? "error",
        helpText: doc.data()?.spanish?.helperText ?? "error",
      },
      status: doc.data()?.status ?? "error",
    };
  };

  const create = async (data: SemesterDb) => {
    const docRef = collection.doc();

    const writeData = {
      ...data,
      createdDate: FieldValue.serverTimestamp(),
      updatedDate: FieldValue.serverTimestamp(),
    };

    await docRef.set(writeData);

    return docRef.id;
  };

  const update = async (id: string, data: Partial<SemesterDb>) => {
    const docRef = collection.doc(id);
    const updateData = {
      ...data,
      updatedDate: FieldValue.serverTimestamp(),
    };
    await docRef.update(updateData);

    return docRef.id;
  };

  const getActive = async () => {
    const query = collection.where("status", "==", "active");
    const docs = await query.get();
    return docs.docs.map((doc) => {
      return {
        id: doc.id,
        english: {
          name: doc.data()?.english?.name ?? "error",
          description: doc.data()?.english?.description ?? "error",
          helpText: doc.data()?.english?.helpText ?? "error",
        },
        spanish: {
          name: doc.data()?.spanish?.name ?? "error",
          description: doc.data()?.spanish?.description ?? "error",
          helpText: doc.data()?.spanish?.helpText ?? "error",
        },
        status: doc.data()?.status ?? "error",
      } as Semester;
    });
  };

  return {
    read,
    create,
    update,
    getActive,
  };
};
