import { faHouseUser, faUserFriends } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import queryString from 'query-string';
import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import Input from '../input/Input';
import Messages from '../messages/Messages';
import './Chat.css';

let socket;

const Chat = ({ location }) => {
  const [room, setRoom] = useState('');
  const [name, setName] = useState('');
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const ENDPOINT = 'localhost:5000';

  useEffect(() => {
    const { name, room } = queryString.parse(location.search);
    console.log('room: ', room);
    console.log('name: ', name);

    socket = io(ENDPOINT);

    setName(name);
    setRoom(room);

    socket.emit('join', { name, room }, () => {});

    return () => {
      socket.emit('disconnect');

      socket.off();
    };
  }, [ENDPOINT, location.search]);

  useEffect(() => {
    socket.on('message', message => {
      setMessages([...messages, message]);
    });
  }, [messages]);

  const sendMessage = event => {
    event.preventDefault();

    if (message) {
      socket.emit('sendMessage', message, () => setMessage(''));
    }
  };

  return (
    <React.Fragment>
      <div class='chat-container'>
        <header class='chat-header'>
          <h1>
            <i class='fas fa-smile'></i> ChatCord
          </h1>
          <a href='index.html' class='btn'>
            Leave Room
          </a>
        </header>

        <main class='chat-main'>
          <div class='chat-sidebar'>
            <h3>
              <FontAwesomeIcon icon={faHouseUser} />
              <span className='chip'>JavaScript</span>
            </h3>
            <h3>
              <FontAwesomeIcon icon={faUserFriends} />
              <span className='chip'>Users</span>
            </h3>

            <ul id='users'>
              <li>Brad</li>
              <li>John</li>
              <li>Mary</li>
              <li>Paul</li>
              <li>Mike</li>
            </ul>
          </div>
          <div class='chat-messages'>
            <Messages messages={messages} name={name} />

            <Input
              message={message}
              setMessage={setMessage}
              sendMessage={sendMessage}
            />
          </div>
        </main>
      </div>
    </React.Fragment>
  );
};

export default Chat;
