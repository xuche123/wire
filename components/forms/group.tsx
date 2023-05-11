import { useState } from "react"
import { useRouter } from "next/navigation"
import { User } from "@prisma/client"
import { Label } from "@radix-ui/react-label"
import axios from "axios"
import { Button } from "components/ui/button"
import { FieldValues, SubmitHandler, useForm } from "react-hook-form"
import toast from "react-hot-toast"

import { Input } from "../ui/input"
import MultiSelect from "../ui/multi-select"

interface GroupFormProps {
  users: User[]
}

const GroupForm: React.FC<GroupFormProps> = ({ users }) => {
  const router = useRouter()
  const [isLoading, setisLoading] = useState(false)

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      members: [],
    },
  })

  const members = watch("members")

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    console.log(data)
    setisLoading(true)
    axios
      .post("/api/conversation", {
        ...data,
        isGroup: true,
      })
      .then((res) => {
        router.push(`/conversation/${res.data.id}`)
      })
      .catch((err) => {
        toast.error("Something went wrong, please try again later.")
      })
      .finally(() => {
        setisLoading(false)
      })
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-12">
          <div className="border-b pb-12">
            <div className="mt-10 flex flex-col gap-y-8">
              <div>
                <Label htmlFor="name">Group Name</Label>
                <Input
                  id="name"
                  {...register("name")}
                  errors={errors}
                  type="text"
                  disabled={isLoading}
                />
              </div>
              <MultiSelect
                disabled={isLoading}
                label="Members"
                options={users.map((user) => ({
                  value: user.id,
                  label: user.name,
                }))}
                onChange={(value) =>
                  setValue("members", value, {
                    shouldValidate: true,
                  })
                }
                value={members}
              />
            </div>
          </div>
        </div>
        <div className="mt-6 flex items-center justify-end gap-x-6">
          <Button disabled={isLoading} type="submit">
            Create
          </Button>
        </div>
      </form>
    </>
  )
}

export default GroupForm
