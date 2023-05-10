"use client"

import useOtherUser from "@/hooks/useOtherUser"
import { Conversation, User } from "@prisma/client"
import { format } from "date-fns"
import { useMemo } from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { HiEllipsisHorizontal } from "react-icons/hi2"
import { IoTrash } from "react-icons/io5"

import AvatarIcon from "./avatar-icon"

interface ProfileSheetProps {
  isOpen: boolean
  onClose: () => void
  data: Conversation & {
    users: User[]
  }
}
const ProfileSheet: React.FC<ProfileSheetProps> = ({ isOpen, onClose, data }) => {
  const otherUser = useOtherUser(data)

  const joinedDate = useMemo(() => {
    return format(new Date(otherUser.createdAt), "PP")
  }, [otherUser.createdAt])

  const title = useMemo(() => {
    return data.name || otherUser.name
  }, [data.name, otherUser.name])

  const statusText = useMemo(() => {
    if (data.isGroup) {
      return `${data.users.length} members`
    }
    return "Active"
  }, [data])

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost">
          <HiEllipsisHorizontal
            size={32}
          />
        </Button>
      </SheetTrigger>
      <SheetContent position="right" size="sm">
        <SheetHeader>
          <div className="relative mt-6 flex-1 px-4 sm:px-6">
            <div className="flex flex-col items-center">
              <div className="mb-2">
                <AvatarIcon currentUser={otherUser} />
              </div>
              <SheetTitle>{title}</SheetTitle>
              <SheetDescription>{statusText}</SheetDescription>
            </div>
          </div>
        </SheetHeader>
        <div className="relative mt-6 flex-1 px-4 sm:px-0">
          <div className="flex flex-col items-center">
            <div className="my-8 flex gap-10">
              <div onClick={()=>{}} className="flex cursor-pointer flex-col items-center gap-3 hover:opacity-75">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent">
                  <IoTrash size={20} />
                </div>
                <SheetDescription>Remove</SheetDescription>
              </div>
            </div>
            <div className="w-full py-5 sm:px-0 sm:pt-0">
              <dl className="space-y-8 px-4 sm:space-y-6 sm:px-6">
                {!data.isGroup && (
                  <div>
                    Email
                    <SheetDescription>
                      {otherUser.email}
                    </SheetDescription>
                  </div>
                )}
                {!data.isGroup && (
                  <>
                    <hr />
                    <div>
                      Joined
                      <time dateTime={joinedDate}>
                        <SheetDescription>
                          {joinedDate}
                        </SheetDescription>
                      </time>
                    </div>
                  </>
                )}
              </dl>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}

export default ProfileSheet