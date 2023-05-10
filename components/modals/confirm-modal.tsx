import { useCallback, useState } from "react"
import { useRouter } from "next/navigation"
import axios from "axios"
import toast from "react-hot-toast"
import { IoTrash } from "react-icons/io5"

import useConversation from "@/hooks/useConversation"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"

export function ConfirmModal() {
  const router = useRouter()
  const { conversationId } = useConversation()
  const [isLoading, setIsLoading] = useState(false)

  const handleDelete = useCallback(() => {
    setIsLoading(true)

    axios
      .delete(`/api/conversation/${conversationId}`)
      .then(() => {
        router.push("/conversation")
        router.refresh()
      })
      .catch(() => toast.error("Something went wrong!"))
      .finally(() => setIsLoading(false))
  }, [router, conversationId])

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline" className="rounded-full">
          <IoTrash size={20} />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete conversation</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete this
            conversation from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isLoading}>Cancel</AlertDialogCancel>
          <AlertDialogAction
            disabled={isLoading}
            className="bg-destructive hover:bg-destructive hover:opacity-75"
            onClick={handleDelete}
          >
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
