import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { User } from "@prisma/client"
import axios from "axios"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { FieldValues, SubmitHandler, useForm } from "react-hook-form"
import toast from "react-hot-toast"
import { MdOutlineGroupAdd } from "react-icons/md"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import Select from "../ui/select"

interface GroupModalProps {
  users: User[]
}

export const GroupModal: React.FC<GroupModalProps> = ({ users }) => {
  const router = useRouter()
  const [isLoading, setisLoading] = useState(false)

  const {register, handleSubmit, setValue, watch, formState: { errors }} = useForm<FieldValues>({
    defaultValues: {
      name: "",
      members: [],
    },
  })

  const members = watch("members")

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    console.log(data)
    setisLoading(true)
    axios.post("/api/conversation", {
      ...data,
      isGroup: true
    }).then((res) => {
      router.refresh()
    }).catch((err) => {
      toast.error("Something went wrong, please try again later.")
    }).finally(() => {
      setisLoading(false)
    })
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" className="rounded-full">
          <MdOutlineGroupAdd size={20} />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create a group chat</DialogTitle>
          <DialogDescription>
            Create a chat with more than 2 people.
          </DialogDescription>
        </DialogHeader>

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
                <Select
                  disabled={isLoading}
                  label="Members" 
                  options={users.map((user) => ({ 
                    value: user.id, 
                    label: user.name 
                  }))} 
                  onChange={(value) => setValue('members', value, { 
                    shouldValidate: true 
                  })} 
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
      </DialogContent>
    </Dialog>
  )
}
