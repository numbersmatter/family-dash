import { Timestamp } from "firebase-admin/firestore";

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
  status: "registered" | "error" | "removed";
  primaryContact: {
    fname: string;
    lname: string;
    email: string;
    phone: string;
  };
  adults: number;
  students: Student[];
  minors: Minor[];
  createdDate: Timestamp;
}

interface RegistrationDb extends Omit<Registration, "id"> {}

interface RegistrationCreate
  extends Omit<RegistrationDb, "createdDate" | "updatedDate"> {}

export type {
  Registration,
  RegistrationDb,
  RegistrationCreate,
  Student,
  Minor,
};
