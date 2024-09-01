import { useFetcher, useLoaderData, useParams } from "@remix-run/react";
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
import { useEffect, useState } from "react";
import { useForm, getFormProps, getInputProps, } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { AddStudentSchema, updatePhoneSchema } from "../schemas";
import { action, loader } from "../route";

export function UpdatePhoneDialog() {
  const { locale, clerkUser } = useLoaderData<typeof loader>();
  const fetcher = useFetcher<typeof action>();
  const params = useParams();
  const reg_id = params.reg_id ?? "no-id";
  const [open, setOpen] = useState(false);
  const [form, fields] = useForm({
    // Sync the result of last submission
    lastResult: fetcher.data,

    // Reuse the validation logic on the client
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: updatePhoneSchema });
    },
    defaultValue: {
      phone: clerkUser.phone,
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
    button: "Update Phone Number",
    title: "Update Cell Phone Number",
    description: "Please enter a phone you can receive text messages on.",
    phone: "Cell",
    // fname: "First Name",
    // lname: "Last Name",
    // school: "School",
    // schoolSelect: "Select School",
    submit: "Submit",
  }

  const spanish = {
    button: "Actualizar Número de Teléfono Celular",
    title: "Actualizar Número de Teléfono Celular",
    description: "Por favor ingrese un número de teléfono celular que pueda recibir mensajes de texto.",
    phone: "Celular",
    submit: "Enviar",
  }

  const lang = locale === "es" ? spanish : english;


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
        >
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor={fields.phone.id} className="text-right">
                {lang.phone}
              </Label>
              <Input
                className="col-span-3"
                {...getInputProps(fields.phone, { type: "text" })}
              />
              <div className="text-red-500 col-start-2 col-span-3">
                {fields.phone.errors}
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button name="type" value="updatePhone" type="submit">
              {lang.submit}
            </Button>
          </DialogFooter>
        </fetcher.Form>
      </DialogContent>
    </Dialog>
  )
}