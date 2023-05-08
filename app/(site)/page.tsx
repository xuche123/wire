import Image from "next/image"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <Image alt="logo" height="48" width="48" className="mx-auto w-auto" src="/thirteen.svg" />
        <h2 className="mt-6 text-center text-3xl font-bold leading-9 tracking-tighter text-gray-900 sm:text-4xl">Sign in to your account</h2>
      </div>
    </div>
  )
}