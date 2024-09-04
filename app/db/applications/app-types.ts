import { Timestamp } from "firebase-admin/firestore";
import { Minor, Student } from "../registrations/registration-types";

export type ApplicationStatus =
  | "in-progress"
  | "pending"
  | "accepted"
  | "declined"
  | "error";

interface Application {
  id: string;
  userId: string;
  semesterId: string;
  status: ApplicationStatus;
  primaryContact: {
    fname: string;
    lname: string;
    email: string;
    phone: string;
  };
  address: {
    street: string;
    unit: string;
    city: string;
    state: string;
    zip: string;
  };
  adults: number;
  students: Student[];
  minors: Minor[];
  createdDate: Timestamp;
}

interface ApplicationDb extends Omit<Application, "id"> {}

export type { Application, ApplicationDb };
