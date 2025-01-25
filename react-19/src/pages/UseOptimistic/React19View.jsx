import { useState, useRef, useOptimistic } from 'react';
import { deliverMessage } from './deliverMessage';

export const React19View = () => {
  const [messages, setMessages] = useState([]);

  const [optimisticMessages, addOptimisticMessage] = useOptimistic(
    messages,
    (state, newMessage) => [
      ...state,
      {
        text: newMessage,
        sending: true
      }
    ],
  );

  const formRef = useRef();

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
    <div className="demo-form">
      <form action={formAction} ref={formRef}>
        <input type="text" name="message" className="demo-input" />
        <button type="submit" className="demo-button">Send</button>
      </form>

      <div>
        {optimisticMessages.map((message, index) => (
          <div key={index} className="message">
            {message.text}
            {!!message.sending && <small className="sending"> (Sending...)</small>}
          </div>
        ))}
      </div>
    </div>
  );
}