import getConversation from "@/lib/getConversation"
import ConversationList from "@/components/conversation-list"

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
