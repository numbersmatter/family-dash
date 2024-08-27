import { z } from "zod";
import { parseWithZod } from "@conform-to/zod";
import { json } from "@remix-run/node";
import { db } from "~/db/db.server";
import { CreateOpportunity } from "~/db/opportunity-request/crud.server";

const schema = z.object({
  timeSlot: z.string(),
  opportunityId: z.string().min(10),
});

export interface RequestOptions {
  opportunityId: string;
  timeSlot: string;
  appUserId: string;
}

const makeRequest = async ({
  opportunityId,
  appUserId,
  timeSlot,
}: RequestOptions) => {
  const writeRequest = {
    id: appUserId,
    opportunityId,
    status: "pending",
    requestData: {
      timeSlot,
    },
  } as CreateOpportunity;

  const writeDoc = await db
    .opportunity_requests({ opportunityId })
    .create(writeRequest);

  return writeDoc;
};

export const handleRequest = async ({
  appUserId,
  formInput,
}: {
  appUserId: string;
  formInput: FormData;
}) => {
  const submission = parseWithZod(formInput, { schema });
  if (submission.status === "success") {
    await makeRequest({
      opportunityId: submission.value.opportunityId,
      appUserId,
      timeSlot: submission.value.timeSlot,
    });
  }

  return json(submission.reply());
};
