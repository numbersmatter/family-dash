import { useFetcher } from "@remix-run/react";
import { Button } from "~/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "~/components/ui/dialog";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select"

export function AddStudentDialog({ lng }: { lng?: "es" | "en" | string }) {
  const fetcher = useFetcher();

  const english = {
    button: "Add Student",
    title: "Student Information",
    description: "Add a student to family.",
    fname: "First Name",
    lname: "Last Name",
    school: "School",
    schoolSelect: "Select School",
    submit: "Submit",
  }

  const spanish = {
    button: "Agregar Estudiante",
    title: "Información del Estudiante",
    description: "Agregar un estudiante a la familia.",
    fname: "Nombre",
    lname: "Apellido",
    school: "Escuela",
    schoolSelect: "Escuela",
    submit: "Enviar",
  }

  const lang = lng === "es" ? spanish : english;

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
              <Label htmlFor="school" className="text-right">
                {lang.school}
              </Label>
              <Select name={"school"}>
                <SelectTrigger className="w-[200px]">
                  <SelectValue placeholder={lang.schoolSelect} />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Schools</SelectLabel>
                    <SelectItem value="tps">
                      Thomasville Primary
                    </SelectItem>
                    <SelectItem value="lde">
                      Liberty Drive Elementary
                    </SelectItem>
                    <SelectItem value="tms">
                      Thomasville Middle
                    </SelectItem>
                    <SelectItem value="ths">
                      Thomasville High
                    </SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button name="type" value="students" type="submit">
              {lang.submit}
            </Button>
          </DialogFooter>
        </fetcher.Form>
      </DialogContent>
    </Dialog>
  )
}