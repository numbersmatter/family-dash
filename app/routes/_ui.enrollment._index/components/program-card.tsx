import { Button } from "~/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "~/components/ui/card";

interface Program {
  title: string
  description: string
}

export function ProgramCard({ program }: { program: Program }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-center">
          {program.title}
        </CardTitle>
        <CardDescription>
          {program.description}
        </CardDescription>
      </CardHeader>
      <CardContent>

      </CardContent>
      <CardFooter>
        <Button className="w-full" variant="default">Apply</Button>
      </CardFooter>
    </Card>
  )
}