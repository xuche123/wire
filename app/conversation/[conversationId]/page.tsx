import getConversationById from "@/actions/getConversationByid"
import getMessages from "@/actions/getMessages"

import Body from "@/components/conversation/conversation-body"
import Form from "@/components/conversation/conversation-form"
import Header from "@/components/conversation/conversation-header"
import EmptyState from "@/components/empty-state"

interface IParams {
  conversationId: string
}

const ConversationId = async ({ params }: { params: IParams }) => {
  const conversation = await getConversationById(params.conversationId)
  const messages = await getMessages(params.conversationId)

  if (!conversation) {
    return (
      <div className="h-full lg:pl-80">
        <div>
          <div className="flex h-full flex-col">
            <EmptyState />
          </div>
        </div>
      </div>
    )
  }
  return (
    <div className="h-full lg:pl-80">
      <div className="flex h-full flex-col">
        <Header conversation={conversation} />
        <Body initialMessages={messages} />
        <Form />
      </div>
    </div>
  )
}

export default ConversationId
