// ChatRoom.js

import React, { useState, useEffect } from 'react';
import "./ChatRoom.css";

const ChatRoom = () => {
	const [messages, setMessages] = useState([]);
	const [user, setUser] = useState('');
	const [message, setMessage] = useState('');

	const fetchMessages = async () => {
		try {
			const response = await fetch('http://localhost:5000/chat/messages');
			const data = await response.json();
			setMessages(data);
		} catch (error) {
			console.error('Error fetching messages:', error);
		}
	};

	const sendMessage = async () => {
		try {
			await fetch('http://localhost:5000/chat/messages', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ user, message }),
			});

			// Clear the message input after sending
			setMessage('');
			// Fetch messages to update the list
			fetchMessages();
		} catch (error) {
			console.error('Error sending message:', error);
		}
	};

	useEffect(() => {
		// Fetch messages on component mount
		fetchMessages();
		// Poll for new messages every 2 seconds
		const interval = setInterval(() => {
			fetchMessages();
		}, 2000);

		return () => clearInterval(interval);
	}, []); // Run only once on mount

	return (
		<div className="chat-container"> 
			<h2 >Chat Room</h2>
			<ul className="chat-messages"> 
				{messages.map((message) => (
					<li className="chat-message" key={message._id}> 
						<strong>{message.user}:</strong> {message.message}
					</li>
				))}
			</ul>
			<div className="message-input"> 
				<input
					type="text"
					placeholder="Your name"
					value={user}
					onChange={(e) => setUser(e.target.value)}
				/>
				<input
					type="text"
					placeholder="Type your message..."
					value={message}
					onChange={(e) => setMessage(e.target.value)}
				/>
				<button onClick={sendMessage}>Send</button>
			</div>
		</div>
	);
};
export default ChatRoom;
