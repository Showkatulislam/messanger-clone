
import getConversationById from "@/app/actions/getConversationById";
import Body from "./components/Body";
import Form from "./components/Form";
import Header from "./components/Header";
import getMessages from "@/app/actions/getMessage";
import EmptyState from "@/app/components/EmptyState";
interface Iparams {
  conversationId: string;
}
const page = async ({ params }: { params: Iparams }) => {
  const { conversationId } = params;
  const conversation = await getConversationById(conversationId);
  const messages = await getMessages(conversationId);
  console.log("conversation", conversation);

  if(!conversation){
    return <EmptyState></EmptyState>
  }

  return (
    <div className="lg:pl-80 h-full block w-full">
      <div
        className="
    flex
    flex-col
    h-full"
      >
       <Header conversation={conversation} />
        <Body  initialMessages={messages} />
        <Form />
      </div>
    </div>
  );
};

export default page;
