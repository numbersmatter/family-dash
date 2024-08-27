import { Form, useActionData, useFetcher, useLoaderData } from "@remix-run/react";
import { Button } from "~/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "~/components/ui/dialog";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { action, loader } from "../route";
import { getFormProps, useForm } from "@conform-to/react";
import { z } from "zod";
import { parseWithZod } from "@conform-to/zod";


const requestSchema = z.object({
  timeSlot: z.string(),
});

export function RequestDialog() {
  const { locale } = useLoaderData<typeof loader>();
  const lastResult = useActionData<typeof action>();

  const [form, fields] = useForm({
    lastResult,
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: requestSchema });
    }
  });

  const english = {
    button: "Request",
    title: "Request Information",
    description: "Select time slots.",
    timeSlot: "Time Slot",
    submit: "Submit",
  }

  const spanish = {
    button: "Solicitar",
    title: "Información de la Solicitud",
    description: "Seleccionar horarios.",
    timeSlot: "Horario",
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
        <Form method="post" {...getFormProps(form)}>
          <div className="grid gap-4 py-4">
            <Label htmlFor={fields.timeSlot.id}>
              {lang.timeSlot}
            </Label>
            <input
              hidden
              id={fields.timeSlot.id} name={fields.timeSlot.name}
            />
          </div>
          <DialogFooter>
            <Button variant={"default"} name={"type"} value={"addMinor"} type="submit">
              {lang.submit}
            </Button>
          </DialogFooter>
        </Form>
      </DialogContent>

    </Dialog>
  )
}