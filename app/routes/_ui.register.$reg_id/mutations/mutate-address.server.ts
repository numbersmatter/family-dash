interface MutateAddress {
  street: string;
  unit: string;
  city: string;
  state: string;
  zip: string;
}

export const mutateAddress = async ({
  address,
  userId,
}: {
  address: MutateAddress;
  userId: string;
}) => {
  return { success: true, address, userId };
};
