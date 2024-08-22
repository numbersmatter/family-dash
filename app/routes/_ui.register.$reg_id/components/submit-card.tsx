import { Button } from "~/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "~/components/ui/card";

export function SubmitCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-center">
          Submit Registration
        </CardTitle>
        <CardDescription>
        </CardDescription>
      </CardHeader>
      <CardContent>
      </CardContent>
      <CardFooter>
        <Button className="w-full" variant="default">Submit</Button>
      </CardFooter>
    </Card>
  )
}
