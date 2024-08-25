interface Student {
  fname: string;
  lname: string;
  school: string;
}

export const mutateStudents = async ({
  students,
  userId,
}: {
  students: Student;
  userId: string;
}) => {
  const { fname, lname, school } = students;
  const id = "234";
  return id;
};
