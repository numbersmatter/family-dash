export const getRegisterData = async ({
  reg_id,
  userId,
}: {
  reg_id: string;
  userId: string;
}) => {
  const address = {
    street: "123 Main St",
    unit: "Apt 1",
    city: "Thomasville",
    state: "NC",
    zip: "10001",
  };
  const primary_caretaker = {
    fname: "Leslie",
    lname: "Foster",
    email: "leslie@example.com",
    phone: "(919) 555-1234",
  };
  const usage = {
    caretaker:
      "This data will only be used by the nonprofits program director to provide food services to participatants.",
  };
  const adults = 1;

  return { address, primary_caretaker, usage, adults };
};
