"use client"

import { useCallback, useState } from "react"
import { FieldValues, SubmitHandler, useForm } from "react-hook-form"

import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { BsGithub, BsGoogle } from "react-icons/bs"


type Variant = "LOGIN" | "REGISTER"
const AuthForm = () => {
  const [variant, setVariant] = useState<Variant>("LOGIN")
  const [isLoading, setIsLoading] = useState(false)

  const toggleVariant = useCallback(() => {
    if (variant === "LOGIN") {
      setVariant("REGISTER")
    } else {
      setVariant("LOGIN")
    }
  }, [variant])

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  })

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true)

    if (variant === "REGISTER") {
      // register
    } else if (variant === "LOGIN") {
      // login
    }
  }

  const socialLogin = (type : string) => {
    setIsLoading(true)

    // NextAuth social sign in
  }

  return (
    <>
      <h2 className="mt-6 text-center text-3xl font-bold leading-9 tracking-tighter text-gray-900 sm:text-4xl">
        {variant === "REGISTER" ? "Sign up" : "Sign in"}
      </h2>
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white px-4 py-8 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            {variant === "REGISTER" && (
              <div className="">
                <Label htmlFor="name">Name</Label>
                <Input id="name" register={register} errors={errors} />
              </div>
            )}

            <div className="">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                register={register}
                errors={errors}
                type="email"
              />
            </div>

            <div className="">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                register={register}
                errors={errors}
                type="password"
              />
            </div>
            <div>
              <Button size="full" disabled={isLoading} type="submit">
                {variant === "REGISTER" ? "Sign up" : "Sign in"}
              </Button>
            </div>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-white px-2 text-gray-500">
                  Or continue with
                </span>
              </div>
            </div>

            <div className="mt-6 flex gap-2">
              <Button variant="outline" size="full" onClick={()=>socialLogin("github")}>
                <BsGithub />
              </Button>

              <Button variant="outline" size="full" onClick={()=>socialLogin("google")}>
                <BsGoogle />
              </Button>
            </div>
            
            <div className="mt-6 flex justify-center gap-2 px-2 text-sm text-gray-500">
              <div>{variant === "REGISTER" ? "Already have an account?" : "Don't have an account?"}</div>
              <div onClick={toggleVariant} className="cursor-pointer underline">{variant === "REGISTER" ? "Sign in" : "Sign up"}</div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default AuthForm
