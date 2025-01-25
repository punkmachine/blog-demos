import { CodeBlock } from '../../components/CodeBlock';

export const React18Code = () => {
  const code = `const Blog = () => {
  const [messages, setMessages] = useState([]);
  const formRef = useRef();

  async function sendMessage(messageText) {
    await deliverMessage(messageText);
    setMessages(prevMessages =>
      prevMessages.map(msg =>
        msg.id === messageText ? { ...msg, sending: false } : msg
      )
    );
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const messageText = formData.get('message');

    const optimisticMessage = {
      id: messageText,
      text: messageText,
      sending: true
    };

    setMessages(prevMessages => [...prevMessages, optimisticMessage]);
    formRef.current.reset();
    sendMessage(messageText);
  }

  return (
    <div>
      <form onSubmit={handleSubmit} ref={formRef}>
        <input type="text" name="message" />
        <button type="submit">Send</button>
      </form>

      <div>
        {messages.map((message) => (
          <div key={message.id}>
            {message.text}
            {message.sending && <small> (Sending...)</small>}
          </div>
        ))}
      </div>
    </div>
  );
}`;

  return <CodeBlock code={code} />;
};