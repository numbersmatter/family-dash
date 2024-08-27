import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "~/components/ui/card";



export function UnderReviewCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-center">
          Reviewing Application
        </CardTitle>
        <CardDescription>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="text-center">
          <p className="text-xl font-semibold">
            We are reviewing your application. Please check back later.
          </p>
        </div>
      </CardContent>
    </Card>
  )
}