import type { ActionFunctionArgs } from "@remix-run/node";
import { Form, json, redirect, useLoaderData } from "@remix-run/react"
import type { LoaderFunctionArgs } from "@remix-run/node";
import { getAuth } from "@clerk/remix/ssr.server";
import { db } from "~/db/db.server";
import { userInfo } from "~/lib/business-logic/signed-in.server";
import { z } from "zod";
import { parseWithZod } from "@conform-to/zod";
import { useUser } from "@clerk/remix";
import { Button } from "~/components/ui/button";
import { Card, CardContent } from "~/components/ui/card";

const OnBoardingSchema = z.object({
  type: z.literal("onboard"),
  language: z.enum(["en", "es"]),
  email: z.string(),
});


export const loader = async (args: LoaderFunctionArgs) => {
  const { userId } = await getAuth(args);
  if (!userId) {
    return redirect("/sign-in");
  }
  const appUserId = userId.split("_", 2)[1];

  const appUserProfile = await db.appUser.read(appUserId);

  const hasProfile = appUserProfile !== null;




  return json({ appUserId, hasProfile });
};


export const action = async (args: ActionFunctionArgs) => {
  const { appUserId } = await userInfo(args);
  const formInput = await args.request.formData();
  const type = formInput.get("type");

  const submission = parseWithZod(formInput, { schema: OnBoardingSchema });

  if (submission.status === "success") {
    await db.appUser.create({
      appUserId,
      data: submission.value,
    })
    return redirect("/")
  }


  return json(submission.reply());
};




export default function OnBoardingPage() {
  const { appUserId } = useLoaderData<typeof loader>();
  const { user } = useUser();

  const email = user?.emailAddresses[0]?.emailAddress ?? "no-email";

  return (
    <div className="grid min-h-screen w-full">
      <div className="flex flex-col place-content-center">
        <main className="flex flex-1 flex-col content-center items-center  gap-4 p-4 lg:gap-6 lg:p-6">
          <h1>On Boarding</h1>
          <p>Welcome to the on boarding page</p>
          <div className="flex flex-col gap-4">
            <Form method="post" >
              <input type="hidden" name="email" value={email} />
              <input type="hidden" name="type" value="onboard" />
              <Card className=" w-[300px]">
                <CardContent className="flex flex-col gap-4 py-6">
                  <Button
                    type="submit"
                    name="language"
                    value="es"
                    size="sm"
                    className="w-full"
                  >
                    Español
                  </Button>
                  <Button
                    type="submit"
                    name="language"
                    value="en"
                    size="sm"
                    className="w-full"
                  >
                    English
                  </Button>
                </CardContent>
              </Card>


            </Form>
          </div>
        </main>
      </div>
    </div>
  )
}



