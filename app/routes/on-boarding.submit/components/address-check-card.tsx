import { useLoaderData } from "@remix-run/react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";
import { loader } from "../route";
import { Link } from "lucide-react";
import { Button } from "~/components/ui/button";




export default function AddressCheckCard() {
  const { locale, addressCheck } = useLoaderData<typeof loader>();

  const english = {
    title: "Address",
    description: "Review Address",
    button: "Go to Address",
    successTitle: "Address",
    failureTitle: "Error with address",
  }


  const spanish = {
    title: "Dirección",
    description: "Revise la Dirección",
    successTitle: "Dirección",
    failureTitle: "Error con la dirección",
    button: "Ir a Dirección",
  }

  const success = addressCheck.success;


  const lang = locale === "es" ? spanish : english;

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {lang.title}
        </CardTitle>
        <CardDescription>
          {lang.description}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {
          success ?
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <div className="text-lg font-bold">
                  {lang.successTitle}
                </div>
                <div className="text-lg">
                  {addressCheck.address.street}
                </div>
                <div className="text-lg">
                  {addressCheck.address.unit}
                </div>
                <div className="text-lg">
                  {addressCheck.address.city}, {addressCheck.address.state} {addressCheck.address.zip}
                </div>
              </div>
            </div>
            :
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <div className="text-lg font-bold">
                  {lang.failureTitle}
                </div>
                <div className="text-lg">
                  <Link to={"/on-boarding"} className="underline">
                    <Button>
                      {lang.button}
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
        }
      </CardContent>
    </Card>
  )
}
