import React from 'react';
import ReactEmoji from 'react-emoji';
import './Message.css';

const Message = ({ message: { text, user }, name }) => {
  let isSentByCurrentUser = false;

  const trimmedName = name.trim().toLowerCase();

  if (user === trimmedName) {
    isSentByCurrentUser = true;
  }

  return isSentByCurrentUser ? (
    <div className='messageContainer justifyEnd'>
      <p className='sentText pr-10'>{trimmedName}</p>
      <div>
        <p className='messageText colorDark backgroundDarkPrimary'>
          {ReactEmoji.emojify(text)}
        </p>
      </div>
    </div>
  ) : (
    <div className='messageContainer justifyStart'>
      <div>
        <p className='messageText colorDark backgroundOrange'>
          {ReactEmoji.emojify(text)}
        </p>
      </div>
      <p className='sentText pl-10 '>{user}</p>
    </div>
  );
};

export default Message;
