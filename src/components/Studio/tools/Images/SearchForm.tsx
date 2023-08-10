import { useForm } from "react-hook-form"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Icons } from "@/components/icons"

type IFilter = {
  query: string
}

type Props = {
  setSearch: React.Dispatch<React.SetStateAction<string>>
  setQueryReset: React.Dispatch<React.SetStateAction<boolean>>
}

const SearchForm = ({ setSearch, setQueryReset }: Props) => {
  const submitHandler = (data: IFilter) => {
    data.query ? setSearch(data.query) : setQueryReset(true)
  }

  const form = useForm<IFilter>({
    defaultValues: {
      query: "",
    },
  })

  return (
    <Form {...form}>
      <form
        className="w-full"
        onSubmit={(...args) => void form.handleSubmit(submitHandler)(...args)}
      >
        <FormField
          control={form.control}
          name="query"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  placeholder="Search photos"
                  type="search"
                  {...field}
                  onChange={(e) => {
                    e.target.value = e.target.value.trim()
                    field.onChange(e)
                  }}
                />
                <Button
                  type="submit"
                  aria-label="search-btn"
                  variant="outline"
                  size="icon"
                >
                  <Icons.search
                    className="mr-2 h-3.5 w-3.5"
                    aria-hidden="true"
                  />
                </Button>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  )
}

export default SearchForm
