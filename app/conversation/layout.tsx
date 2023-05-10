import getConversation from "@/actions/getConversation"
import getUsers from "@/actions/getUsers"

import ConversationList from "@/components/conversation/conversation-list"

export default async function ConversationLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const conversation = await getConversation()
  const users = await getUsers()
  return (
    <div className="h-full">
      <ConversationList initialItems={conversation} users={users} />
      {children}
    </div>
  )
}
