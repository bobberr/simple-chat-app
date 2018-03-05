import React from 'react';


const Message = (props) => {
    return (
        <li className="message">
            <img className="message__thumbnail" src={props.thumbnail || 'http://www.allkpop.com/upload/2014/05/af_org/EXO-EXO-M-Sehun-Kris_1400144013_af_org.jpeg'} alt="user photo"/>
            <div className="message__container">
                <p className="message__author">{props.author}</p> 
                <p className="message__content">{props.message}</p>
                <p className="message__time">{props.time}</p>
            </div>
        </li>
    )
}


module.exports = Message;