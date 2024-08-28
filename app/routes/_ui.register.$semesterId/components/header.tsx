import { useLoaderData } from "@remix-run/react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";
import { loader } from "../route";



export function Header() {
  const { status } = useLoaderData<typeof loader>();
  return (
    <div className="mx-auto max-w-7xl py-2 sm:py-4 sm:px-6 lg:px-8">
      {/* Content goes here */}
      <Card>
        <CardHeader className="flex flex-col gap-y-2 justify-center">
          <CardTitle className="text-center">
            Register Fall 2024 Food Pantry
          </CardTitle>
          <CardDescription>
            Register to participate in Food Pantry Programs
          </CardDescription>
        </CardHeader>
        <CardContent>
        </CardContent>
      </Card>
    </div>
  )
}