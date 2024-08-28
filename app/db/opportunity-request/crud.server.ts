import { FieldValue } from "firebase-admin/firestore";
import { firestore } from "../firestore.server";
import { makeConfirmationCode } from "~/lib/business-logic/make-confirmation";

interface OpportunityRequest {
  id: string;
  createdDate: string;
  updatedDate: string;
  opportunityId: string;
  status: "pending" | "approved" | "declined";
  requestData: Record<string, string>;
}

export interface CreateOpportunity {
  id: string;
  status: "pending" | "approved" | "declined";
  opportunityId: string;
  requestData: Record<string, string>;
}

export const opportunityRequestDb = ({
  opportunityId,
}: {
  opportunityId: string;
}) => {
  const collection = firestore.collection(
    `/food_opportunities/${opportunityId}/requests`
  );

  const read = async (id: string) => {
    const doc = await collection.doc(id).get();
    if (!doc.exists) {
      return null;
    }

    return {
      id: doc.id,
      createdDate: doc.data()?.createdDate ?? "error",
      updatedDate: doc.data()?.updatedDate ?? "error",
      opportunityId: doc.data()?.opportunityId ?? "error",
      status: doc.data()?.status ?? "error",
      confirm: doc.data()?.confirm ?? "error",
    };
  };

  const create = async (data: CreateOpportunity) => {
    const docRef = collection.doc(data.id);
    const confirmCode = makeConfirmationCode(4);

    const writeData = {
      createdDate: FieldValue.serverTimestamp(),
      updatedDate: FieldValue.serverTimestamp(),
      opportunityId: data.opportunityId,
      status: data.status,
      requestData: data.requestData,
      confirm: confirmCode,
    };
    await docRef.set(writeData);
    return docRef.id;
  };

  return {
    read,
    create,
  };
};
