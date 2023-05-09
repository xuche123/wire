import getUsers from "@/lib/getUsers"
import Sidebar from "@/components/side-bar"
import UserList from "@/components/user-list"

export default async function UsersLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const users = await getUsers()
  return (
    // @ts-expect-error Server component
    <Sidebar>
      <div className="h-full">
        <UserList items={users} />
        {children}
      </div>
    </Sidebar>
  )
}
