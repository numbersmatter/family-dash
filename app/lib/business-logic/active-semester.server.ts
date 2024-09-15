import { db } from "~/db/db.server";

export const getActiveSemester = async () => {
  const activeSemester = await db.organization.activeSemester();
  if (!activeSemester) {
    throw new Error("No active semester");
  }

  return {
    semesterId: activeSemester.semester_id,
    semesterName: activeSemester.name,
  };
};
