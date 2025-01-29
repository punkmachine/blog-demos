import { CodeBlock } from '../../components/CodeBlock';

export const React18Code = () => {
  const code = `const Blog = () => {
  const [messages, setMessages] = useState([]);

  async function sendMessage(messageText) {
    await deliverMessage(messageText);
    setMessages(prevMessages =>
      prevMessages.map(msg =>
        msg.id === messageText ? { ...msg, sending: false } : msg
      )
    );
  }

  async function handleSubmit(e) {
    const formData = new FormData(e.target);
    const messageText = formData.get('message');

    const optimisticMessage = {
      id: messageText,
      text: messageText,
      sending: true
    };

    setMessages(prevMessages => [...prevMessages, optimisticMessage]);
    sendMessage(messageText);
  }

  return (
    <div>
      {messages.map((message) => (
        <div key={message.id}>
          {message.text}
          {message.sending && <small> (Sending...)</small>}
        </div>
      ))}
    </div>
  );
}`;

  return <CodeBlock code={code} />;
};