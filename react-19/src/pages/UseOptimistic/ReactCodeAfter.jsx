import { CodeBlock } from '../../components/CodeBlock';

export const ReactCodeAfter = () => {
  const code = `const Blog = () => {
  const [messages, setMessages] = useState([]);

  const [optimisticMessages, addOptimisticMessage] = useOptimistic(
    messages,
    (state, newMessage) => [
      ...state,
      { text: newMessage, sending: true }
    ],
  );

  async function sendMessage(formData) {
    const sentMessage = await deliverMessage(formData.get('message'));
    setMessages(messages => [...messages, { text: sentMessage }]);
  }

  async function formAction(formData) {
    addOptimisticMessage(formData.get('message'));
    await sendMessage(formData);
  }

  return (
    <div>
      {optimisticMessages.map((message, index) => (
        <div key={index}>
          {message.text}
          {!!message.sending && <small> (Sending...)</small>}
        </div>
      ))}
    </div>
  );
}`;

  return <CodeBlock code={code} />;
};