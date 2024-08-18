

import { Button } from "~/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "~/components/ui/card";



export function FormCard({
  title, description, children, footer
}: {
  children: React.ReactNode,
  footer: React.ReactNode,
  title: string,
  description: string
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {title}
        </CardTitle>
        <CardDescription>
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {children}
      </CardContent>
      <CardFooter>
        {footer}
      </CardFooter>
    </Card>
  )
}