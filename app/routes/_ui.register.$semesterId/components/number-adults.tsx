import { useFetcher, useLoaderData } from "@remix-run/react"
import { Minus, Plus } from "lucide-react"
import { useEffect, useState } from "react"
import { Button } from "~/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "~/components/ui/drawer"
import { action, loader } from "../route"
import { useForm } from "@conform-to/react"
import { parseWithZod } from "@conform-to/zod"
import { adultsSchema } from "../schemas"



export function NumberAdults({ locale }: { locale?: string }) {
  const { adults } = useLoaderData<typeof loader>()
  const [count, setCount] = useState(adults)
  const [open, setOpen] = useState(false)
  const increaseAdults = () => setCount(count + 1)
  const decreaseAdults = () => setCount(count - 1)

  const fetcher = useFetcher<typeof action>();
  const isFetching = fetcher.state !== "idle";
  const postedNumber = fetcher.formData?.get("adults") ?? adults;
  const success = fetcher.data?.status === "success" ? true : false;

  const [form, fields] = useForm({
    // Sync the result of last submission


    // Reuse the validation logic on the client
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: adultsSchema });
    },
    defaultValue: {
      adults: adults,
    },
    shouldRevalidate: 'onBlur',
  })

  const displayAdults = isFetching ? `${postedNumber}` : `${adults}`

  const handleSubmit = () => {
    fetcher.submit({ adults: count, type: "updateAdults" }, { method: "post" })

  }

  useEffect(() => {
    if (success && !isFetching) {
      setOpen(false)
    }
  }, [success, isFetching])

  const english = {
    title: "Household Adults",
    button: "Update",
    decrease: "Decrease",
    increase: "Increase",
    description: "Include only nonstudents over 18",
    adults: "Adults in Household",
    drawerTitle: "Set Number of Adults",
    cancel: "Cancel",
  }

  const spanish = {
    title: "Adultos en la casa",
    description: "Incluir solo no estudiantes mayores de 18",
    adults: "Adultos en la casa",
    drawerTitle: "Establecer el número de adultos",
    button: "Actualizar",
    decrease: "Disminuir",
    increase: "Aumentar",
    cancel: "Cancelar",
  }


  const lang = locale === "es" ? spanish : english

  return (
    <div className="mx-auto max-w-7xl py-2 sm:py-4 sm:px-6 lg:px-8">
      <Card>
        <CardHeader>
          <CardTitle>{lang.title} : {displayAdults}</CardTitle>
        </CardHeader>
        <CardContent>
          <Drawer open={open} onOpenChange={setOpen}>
            <DrawerTrigger asChild>
              <Button variant="default">
                {lang.button}
              </Button>
            </DrawerTrigger>
            <DrawerContent>
              <div className="mx-auto w-full max-w-sm">
                <DrawerHeader>
                  <DrawerTitle>{lang.drawerTitle}</DrawerTitle>
                  <DrawerDescription>
                    {lang.description}
                  </DrawerDescription>
                </DrawerHeader>
                <div className="p-4 pb-0">
                  <div className="flex items-center justify-center space-x-2">
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8 shrink-0 rounded-full"
                      onClick={decreaseAdults}
                      disabled={count <= 1}
                    >
                      <Minus className="h-4 w-4" />
                      <span className="sr-only"> {lang.decrease}</span>
                    </Button>
                    <div className="flex-1 text-center">
                      <div className="text-7xl font-bold tracking-tighter">
                        {count}
                      </div>
                      <div className="text-[0.70rem] uppercase text-muted-foreground">
                        {lang.title}
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8 shrink-0 rounded-full"
                      onClick={increaseAdults}
                    >
                      <Plus className="h-4 w-4" />
                      <span className="sr-only">{lang.increase}</span>
                    </Button>
                  </div>
                  <div className="mt-3 h-[120px]">
                  </div>
                </div>
                <DrawerFooter>
                  <Button onClick={handleSubmit}>{lang.button}</Button>
                  <DrawerClose asChild>
                    <Button variant="outline">{lang.cancel}</Button>
                  </DrawerClose>
                </DrawerFooter>
              </div>
            </DrawerContent>
          </Drawer>
        </CardContent>
      </Card>
    </div>
  )
}
