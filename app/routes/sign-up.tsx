import { isRouteErrorResponse, json, redirect, useLoaderData, useRouteError } from "@remix-run/react"
import type { LoaderFunctionArgs } from "@remix-run/node";
import { SignUp } from "@clerk/remix";
import { getAuth } from "@clerk/remix/ssr.server";



export const loader = async (args: LoaderFunctionArgs) => {
  const { userId } = await getAuth(args);
  if (userId) {
    return redirect("/")
  }
  return json({});
};




export default function SignUpPage() {
  return (
    <div className="grid min-h-screen w-full">
      <div className="flex flex-col place-content-center">

        <main className="flex flex-1 flex-col content-center items-center  gap-4 p-4 lg:gap-6 lg:p-6">
          <SignUp />
        </main>
      </div>
    </div>
  )
}

export function ErrorBoundary() {
  const error = useRouteError();
  if (isRouteErrorResponse(error)) {
    return <div>
      <h1>Oops Signup error!</h1>
      <p>
        {error.status} {error.data}
      </p>
    </div>
  }
  return <div>
    <h1>Something went wrong</h1>
    <pre>{JSON.stringify(error, null, 2)}</pre>
  </div>
}
