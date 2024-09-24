import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card"
import { useUser } from "@clerk/remix"



export default function WelcomeUser() {
  const { isSignedIn, user, isLoaded } = useUser()

  if (!isLoaded) {
    // Handle loading state however you like
    return null
  }


  return (
    <div className="mx-auto max-w-7xl py-4 sm:px-6 lg:px-8 ">
      {/* Content goes here */}

      <Card className={""}>
        <CardHeader>
          <CardTitle>Welcome {user?.firstName}</CardTitle>
          <CardDescription>

          </CardDescription>
        </CardHeader>
        <CardContent>
        </CardContent>
        <CardFooter>

        </CardFooter>
      </Card>

    </div>
  )
}
