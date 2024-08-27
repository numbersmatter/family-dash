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

export type { Registration, RegistrationDb, Student, Minor };
