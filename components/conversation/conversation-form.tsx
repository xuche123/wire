"use client"

import useConversation from "@/hooks/useConversation"

import { FieldValues, SubmitHandler, useForm } from "react-hook-form"
import axios from "axios"
import { HiPhoto } from "react-icons/hi2"
import { HiPaperAirplane } from "react-icons/hi2"

import MessageInput from "../message-input"

const Form = () => {
  const { conversationId } = useConversation()
  
  const { register, handleSubmit, setValue, formState: { errors } } = useForm<FieldValues>({
    defaultValues: {
      message: ''
    }
  })

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setValue('message', '', { shouldValidate: true })
    axios.post('/api/messages', {
      ...data,
      conversationId,
    })
  }

  return (
    <div className="flex w-full items-center gap-2 border-t bg-background p-4 lg:gap-4">
      <HiPhoto size={30} className="text-destructive"/>
      <form onSubmit={handleSubmit(onSubmit)} className="flex w-full items-center gap-2 lg:gap-4">
        <MessageInput id="message" register={register} errors={errors} />
        <button type="submit" className="cursor-pointer rounded-full bg-accent p-2 transition hover:bg-muted">
          <HiPaperAirplane size={18} className="text-primary"/>
        </button>
      </form>
    </div>
  )
}

export default Form