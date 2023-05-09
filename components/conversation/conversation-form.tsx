"use client"

import axios from "axios"
import { CldUploadButton } from "next-cloudinary"
import { FieldValues, SubmitHandler, useForm } from "react-hook-form"
import { HiPaperAirplane, HiPhoto } from "react-icons/hi2"

import useConversation from "@/hooks/useConversation"

import MessageInput from "../message-input"

const Form = () => {
  const { conversationId } = useConversation()

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      message: "",
    },
  })

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setValue("message", "", { shouldValidate: true })
    axios.post("/api/messages", {
      ...data,
      conversationId,
    })
  }

  const handleUpload = (result: any) => {
    axios.post("/api/messages", {
      image: result?.info?.secure_url,
      conversationId,
    })
  }

  return (
    <div className="flex w-full items-center gap-2 border-t bg-background p-4 lg:gap-4">
      <CldUploadButton
        options={{ maxFiles: 1 }}
        onUpload={handleUpload}
        uploadPreset="g0y6qjsv"
      >
        <HiPhoto size={30} className="text-primary" />
      </CldUploadButton>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex w-full items-center gap-2 lg:gap-4"
      >
        <MessageInput id="message" register={register} errors={errors} />
        <button
          type="submit"
          className="cursor-pointer rounded-full bg-accent p-2 transition hover:bg-muted"
        >
          <HiPaperAirplane size={18} className="text-primary" />
        </button>
      </form>
    </div>
  )
}

export default Form
