import { useFetcher, useLoaderData } from "@remix-run/react";
import { Button } from "~/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "~/components/ui/dialog";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { loader } from "../route";

export function AddMinorDialog() {
  const { locale } = useLoaderData<typeof loader>();
  const fetcher = useFetcher();

  const english = {
    button: "Add Minor",
    title: "Minor Information",
    description: "Add to family.",
    fname: "First Name",
    lname: "Last Name",
    birthyear: "Birth Year",
    submit: "Submit",
  }

  const spanish = {
    button: "Agregar Menor",
    title: "Información del Menor",
    description: "Agregar al familio.",
    fname: "Nombre",
    lname: "Apellido",
    school: "Escuela",
    birthyear: "Año de Nacimiento",
    submit: "Enviar",
  }

  const lang = locale === "es" ? spanish : english;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="default">
          {lang.button}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{lang.title}</DialogTitle>
          <DialogDescription>
            {lang.description}
          </DialogDescription>
        </DialogHeader>
        <fetcher.Form method="post">
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="fname" className="text-right">
                {lang.fname}
              </Label>
              <Input
                id="fname"
                name={"fname"}
                defaultValue=""
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="lname" className="text-right">
                {lang.lname}
              </Label>
              <Input
                id="lname"
                name={"lname"}
                defaultValue=""
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="birthyear" className="text-right">
                {lang.birthyear}
              </Label>
              <Input
                id="birthyear"
                name={"birthyear"}
                defaultValue=""
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant={"default"} name={"type"} value={"addMinor"} type="submit">
              {lang.submit}
            </Button>
          </DialogFooter>
        </fetcher.Form>
      </DialogContent>

    </Dialog>
  )
}