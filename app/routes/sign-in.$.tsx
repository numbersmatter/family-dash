import { json, Link, redirect, useLoaderData } from "@remix-run/react"
import type { LoaderFunctionArgs } from "@remix-run/node";
import { SignIn } from "@clerk/remix";
import { getAuth } from "@clerk/remix/ssr.server";



export const loader = async (args: LoaderFunctionArgs) => {
  const { userId } = await getAuth(args);
  if (userId) {
    return redirect("/")
  }
  return json({});
};




export default function SignInPage() {
  return (
    <div className="grid min-h-screen w-full">
      <div className="flex flex-col place-content-center">

        <main className="flex flex-1 flex-col content-center items-center  gap-4 p-4 lg:gap-6 lg:p-6">
          <h1 className="text-3xl font-bold">
            Returning Users Sign In
          </h1>
          <p>
            If you need to register click <Link to="/sign-up">
              <span className="text-blue-600 underline hover:text-blue-800">
                here
              </span>
            </Link>
          </p>
          <SignIn />
        </main>
      </div>
    </div>
  )
}