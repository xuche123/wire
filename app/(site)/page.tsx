import Image from "next/image"

import AuthForm from "@/components/auth-form"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <Image
          alt="logo"
          height="24"
          width="24"
          className="mx-auto mb-4 w-auto"
          src="/fire.png"
          sizes="8px"
        />
        <AuthForm />
      </div>
    </div>
  )
}
