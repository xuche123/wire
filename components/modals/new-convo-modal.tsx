import { User } from "@prisma/client"
import { MdOutlineGroupAdd } from "react-icons/md"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import GroupForm from "../forms/group"
import IndividualForm from "../forms/individual"

interface NewConvoModalProps {
  users: User[]
}

export const NewConvoModal: React.FC<NewConvoModalProps> = ({ users }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" className="rounded-full">
          <MdOutlineGroupAdd size={20} />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <Tabs defaultValue="group" className="grid w-full pt-2">
          <TabsList>
            <TabsTrigger value="group" className="w-1/2">
              Group
            </TabsTrigger>
            <TabsTrigger value="Direct" className="w-1/2">
              Direct
            </TabsTrigger>
          </TabsList>
          <TabsContent value="group">
            <DialogHeader>
              <DialogTitle>Create a group chat</DialogTitle>
              <DialogDescription>
                Create a chat with more than 2 people.
              </DialogDescription>
            </DialogHeader>
            <GroupForm users={users} />
          </TabsContent>
          <TabsContent value="Direct">
            <DialogHeader>
              <DialogTitle>Direct Message</DialogTitle>
              <DialogDescription>
                Send a message to a single person.
              </DialogDescription>
            </DialogHeader>
            <IndividualForm users={users} />
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}
