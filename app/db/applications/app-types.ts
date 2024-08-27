import { Minor, Student } from "../registrations/registration-types";

interface Application {
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

interface ApplicationDb extends Omit<Application, "id"> {}

export type { Application, ApplicationDb };
