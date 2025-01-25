import { CodeBlock } from '../../components/CodeBlock';

export const ReactCodeAfter = () => {
  const code = `const Blog = () => {
  const [messages, setMessages] = useState([]);
  const formRef = useRef();

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
    formRef.current.reset();
    await sendMessage(formData);
  }

  return (
    <div>
      <form action={formAction} ref={formRef}>
        <input type="text" name="message" />
        <button type="submit" >Send</button>
      </form>

      <div>
        {optimisticMessages.map((message, index) => (
          <div key={index}>
            {message.text}
            {!!message.sending && <small> (Sending...)</small>}
          </div>
        ))}
      </div>
    </div>
  );
}`;

  return <CodeBlock code={code} />;
};