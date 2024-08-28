import { Form, useActionData, useLoaderData } from "@remix-run/react";
import { Button } from "~/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "~/components/ui/dialog";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { action, loader } from "../route";
import { getFormProps, useForm } from "@conform-to/react";
import { z } from "zod";
import { parseWithZod } from "@conform-to/zod";
import { useState } from "react";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "~/components/ui/select";


const requestSchema = z.object({
  timeSlot: z.string(),
});

export function RequestDialog({ opportunityId, timeSlots }: { timeSlots: { id: string, label: string }[], opportunityId: string }) {
  const { locale } = useLoaderData<typeof loader>();
  const lastResult = useActionData<typeof action>();
  const [slot, setSlot] = useState(timeSlots[0].id);

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
              value={slot}
            />
            <Select value={slot} onValueChange={setSlot}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder={lang.timeSlot} />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>{lang.timeSlot}</SelectLabel>
                  {timeSlots.map((slot) => (
                    <SelectItem key={slot.id} value={slot.id}>
                      {slot.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <DialogFooter>
            <Button variant={"default"} name={"opportunityId"} value={opportunityId} type="submit">
              {lang.submit}
            </Button>
          </DialogFooter>
        </Form>
      </DialogContent>
    </Dialog>
  )
}