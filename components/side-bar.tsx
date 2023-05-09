import { getCurrentUser } from "@/lib/session"

import Logout from "./logout"

async function Sidebar({ children }: { children: React.ReactNode }) {
  const currentUser = await getCurrentUser()
  return (
    <div className="h-full">
      {children}
      {/* <Logout currentUser={currentUser!}/> */}
    </div>
  )
}

export default Sidebar
