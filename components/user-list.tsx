"use client"

import { User } from "@prisma/client";
import UserListItem from "./user-list-item";

interface UserListProps {
  items: User[]
}

const UserList: React.FC<UserListProps> = ({ items }) => {
  return (
    <aside className="fixed inset-y-0 left-0 block w-full overflow-y-auto border-r border-border pb-20 lg:block lg:w-80 lg:pb-0">
      <div className="px-5">
        <div className="flex-col">
          <div className="py-4 text-2xl font-bold text-primary">
            People
          </div>
          {items.map((item) => (
            <UserListItem key={item.id} item={item} />
          ))}
        </div>
      </div>
    </aside>
  )
}

export default UserList