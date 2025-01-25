import { useState, useRef } from 'react';
import { deliverMessage } from './deliverMessage';

export const React18View = () => {
  const [messages, setMessages] = useState([]);
  const formRef = useRef();

  async function sendMessage(messageText) {
    try {
      // eslint-disable-next-line no-unused-vars
      const sentMessage = await deliverMessage(messageText);
      setMessages(prevMessages =>
        prevMessages.map(msg =>
          msg.id === messageText ? { ...msg, sending: false } : msg
        )
      );
    } catch (error) {
      setMessages(prevMessages =>
        prevMessages.filter(msg => msg.id !== messageText)
      );
      console.error('Failed to send message:', error);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const messageText = formData.get('message');

    if (!messageText.trim()) return;

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
    <div className="demo-form">
      <form onSubmit={handleSubmit} ref={formRef}>
        <input
          type="text"
          name="message"
          className="demo-input"
        />
        <button type="submit" className="demo-button">Send</button>
      </form>

      <div>
        {messages.map((message) => (
          <div key={message.id} className="message">
            {message.text}
            {message.sending && <small className="sending"> (Sending...)</small>}
          </div>
        ))}
      </div>
    </div>
  );
}