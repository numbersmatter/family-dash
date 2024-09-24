import { intializeFb } from "../firebase.server";
import { firestore } from "../firestore.server";

interface FoodOpportunity {
  id: string;
  name: string;
  semesterId: string;
  status: "open" | "closed" | "past";
  type: "pickup" | "drive-thru" | "error";
  date: string;
  timeSlots: { id: string; label: string }[];
}

export const foodOpportunityDb = () => {
  intializeFb();
  const collection = firestore.collection("/food_opportunities");
  const read = async (id: string) => {
    const doc = await collection.doc(id).get();
    if (!doc.exists) {
      return null;
    }

    return {
      id: doc.id,
      name: doc.data()?.name ?? "error",
      semesterId: doc.data()?.semesterId ?? "error",
      status: doc.data()?.status ?? "error",
      code: doc.data()?.code ?? "error",
      date: doc.data()?.date.toDate().toLocaleDateString() ?? "error",
      applied: doc.data()?.applied ?? "error",
      timeSlots: doc.data()?.timeSlots ?? [{ id: "default", label: "default" }],
    };
  };

  const getFromSemester = async ({ semesterId }: { semesterId: string }) => {
    const query = collection.where("semesterId", "==", semesterId);
    const docs = await query.get();
    return docs.docs.map((doc) => {
      return {
        id: doc.id,
        name: doc.data()?.name ?? "error",
        semesterId: doc.data()?.semesterId ?? "error",
        status: doc.data()?.status ?? "error",
        type: doc.data()?.code ?? "error",
        date: doc.data()?.date.toDate().toLocaleDateString() ?? "error",
        applied: doc.data()?.applied ?? "error",
        timeSlots: doc.data()?.timeSlots ?? [
          { id: "default", label: "default" },
        ],
      } as FoodOpportunity;
    });
  };

  const getOpen = async ({ semesterId }: { semesterId: string }) => {
    const allOpportunities = await getFromSemester({ semesterId });
    return allOpportunities.filter((opp) => opp.status === "open");
  };

  const activeOpportunities = async ({
    semesterId,
  }: {
    semesterId: string;
  }) => {
    const allOpportunities = await getFromSemester({ semesterId });
    return allOpportunities.filter((opp) => opp.status !== "past");
  };

  return {
    getFromSemester,
    read,
    getOpen,
    activeOpportunities,
  };
};
