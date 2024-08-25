import { useFetcher, useParams } from "@remix-run/react";
import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "~/components/ui/dialog";
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
import { action } from "~/routes/api.register.$reg_id.students/route";
import { useEffect, useState } from "react";
import { useForm, getFormProps, getInputProps, getSelectProps } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { AddStudentSchema } from "../schemas";

export function AddStudentDialog({ lng }: { lng?: "es" | "en" | string }) {
  const fetcher = useFetcher<typeof action>();
  const params = useParams();
  const reg_id = params.reg_id ?? "no-id";
  const [open, setOpen] = useState(false);
  const [form, fields] = useForm({
    // Sync the result of last submission
    lastResult: fetcher.data,

    // Reuse the validation logic on the client
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: AddStudentSchema });
    },
    defaultValue: {
      fname: "",
      lname: "",
      school: "",
    },

    shouldRevalidate: 'onBlur',
  })

  const isFetching = fetcher.state !== "idle";
  const success = fetcher.data?.status === "success" ? true : false;

  useEffect(() => {
    if (success && !isFetching) {
      setOpen(false);
    }
  }, [success, isFetching]);



  // const errors = fetcher.data?.errors ?? {}

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

  const actionUrl = `/api/register/${reg_id}/students`;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
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
        <fetcher.Form method="post"
          {...getFormProps(form)}

          action={actionUrl}
        >

          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor={fields.fname.id} className="text-right">
                {lang.fname}
              </Label>
              <Input
                defaultValue=""
                className="col-span-3"
                {...getInputProps(fields.fname, { type: "text" })}
              />
              <div className="text-red-500 col-start-2 col-span-3">
                {fields.fname.errors}
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor={fields.lname.id} className="text-right">
                {lang.lname}
              </Label>
              <Input
                defaultValue=""
                className="col-span-3"
                {...getInputProps(fields.lname, { type: "text" })}
              />
              <div className="text-red-500 col-start-2 col-span-3">
                {fields.lname.errors}
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor={"school"} className="text-right">
                {lang.school}
              </Label>
              <div className="col-span-3">
                <Select
                  {...getSelectProps(fields.school)}
                  defaultValue=""
                >
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
              <div className="text-red-500 col-span-3 col-start-2">
                {fields.school.errors}
              </div>
            </div>

          </div>
          <DialogFooter>
            <Button name="type" value="addStudent" type="submit">
              {lang.submit}
            </Button>
          </DialogFooter>
        </fetcher.Form>
      </DialogContent>
    </Dialog>
  )
}