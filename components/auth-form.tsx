"use client"

import { useCallback, useState } from "react"
import axios from "axios"
import { signIn } from "next-auth/react"
import { FieldValues, SubmitHandler, useForm } from "react-hook-form"
import toast from "react-hot-toast"
import { BsGithub, BsGoogle } from "react-icons/bs"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Label } from "./ui/label"

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
      axios
        .post("/api/register", data)
        .catch((err) => {
          toast.error("Something went wrong")
        })
        .finally(() => {
          setIsLoading(false)
        })
    } else if (variant === "LOGIN") {
      signIn("credentials", {
        ...data,
        redirect: false,
      })
        .then((callback) => {
          if (callback?.error) {
            toast.error("Invalid email or password")
          }

          if (callback?.ok && !callback?.error) {
            toast.success("Logged in!")
          }
        })
        .finally(() => {
          setIsLoading(false)
        })
    }
  }

  const socialLogin = (type: string) => {
    setIsLoading(true)
    signIn(type, {
      redirect: false,
    })
      .then((callback) => {
        if (callback?.error) {
          toast.error("Invalid email or password")
        }

        if (callback?.ok && !callback?.error) {
          toast.success("Logged in!")
        }
      })
      .finally(() => {
        setIsLoading(false)
      })
    // NextAuth social sign in
  }

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="mt-6 text-center text-3xl font-bold leading-9 tracking-tighter text-primary sm:text-4xl">
            {variant === "REGISTER" ? "Sign up" : "Sign in"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            {variant === "REGISTER" && (
              <div className="">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  {...register("name")}
                  errors={errors}
                  disabled={isLoading}
                />
              </div>
            )}

            <div className="">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                {...register("email")}
                errors={errors}
                type="email"
                disabled={isLoading}
              />
            </div>

            <div className="">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                {...register("password")}
                errors={errors}
                type="password"
                disabled={isLoading}
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
                <div className="w-full border-t border-accent" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-background px-2 text-gray-500">
                  Or continue with
                </span>
              </div>
            </div>

            <div className="mt-6 flex gap-2">
              <Button
                variant="outline"
                size="full"
                onClick={() => socialLogin("github")}
                disabled={isLoading}
              >
                <BsGithub />
              </Button>

              <Button
                variant="outline"
                size="full"
                onClick={() => socialLogin("google")}
                disabled={isLoading}
              >
                <BsGoogle />
              </Button>
            </div>

            <div className="mt-6 flex justify-center gap-2 px-2 text-sm text-gray-500">
              <div>
                {variant === "REGISTER"
                  ? "Already have an account?"
                  : "Don't have an account?"}
              </div>
              <div onClick={toggleVariant} className="cursor-pointer underline">
                {variant === "REGISTER" ? "Sign in" : "Sign up"}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  )
}

export default AuthForm
