import Image from "next/image"

import AuthForm from "@/components/auth-form"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <Image
          alt="logo"
          height="96"
          width="96"
          className="mx-auto w-auto"
          src="/logo.png"
        />
        
        <AuthForm />
      </div>
    </div>
  )
}
