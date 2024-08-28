import { getFirestore } from "firebase-admin/firestore";
import { intializeFb } from "./firebase.server";

export const firestore = getFirestore(intializeFb());
