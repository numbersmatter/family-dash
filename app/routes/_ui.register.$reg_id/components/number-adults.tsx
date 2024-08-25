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



export function NumberAdults() {
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




  return (
    <Card>
      <CardHeader>
        <CardTitle>Household Adults : {displayAdults}</CardTitle>
      </CardHeader>
      <CardContent>
        <Drawer open={open} onOpenChange={setOpen}>
          <DrawerTrigger asChild>
            <Button variant="default">Set Number of Adults</Button>
          </DrawerTrigger>
          <DrawerContent>
            <div className="mx-auto w-full max-w-sm">
              <DrawerHeader>
                <DrawerTitle>Set Number of Adults</DrawerTitle>
                <DrawerDescription>
                  Include only nonstudents over 18
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
                    <span className="sr-only">Decrease</span>
                  </Button>
                  <div className="flex-1 text-center">
                    <div className="text-7xl font-bold tracking-tighter">
                      {count}
                    </div>
                    <div className="text-[0.70rem] uppercase text-muted-foreground">
                      Adults in Household
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8 shrink-0 rounded-full"
                    onClick={increaseAdults}
                  >
                    <Plus className="h-4 w-4" />
                    <span className="sr-only">Increase</span>
                  </Button>
                </div>
                <div className="mt-3 h-[120px]">
                </div>
              </div>
              <DrawerFooter>
                <Button onClick={handleSubmit}>Submit</Button>
                <DrawerClose asChild>
                  <Button variant="outline">Cancel</Button>
                </DrawerClose>
              </DrawerFooter>
            </div>
          </DrawerContent>
        </Drawer>
      </CardContent>
    </Card>
  )
}
