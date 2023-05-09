import getConversation from "@/actions/getConversation"

import ConversationList from "@/components/conversation/conversation-list"

export default async function ConversationLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const conversation = await getConversation()
  return (
    <div className="h-full">
      <ConversationList initialItems={conversation} />
      {children}
    </div>
  )
}
