import React from 'react';
import socket from '../socket-connection';
import Message from '../components/Message';

class Wall extends React.Component {
    constructor () {
        super ();
        this.submitHandler = this.submitHandler.bind(this);
        this.state = {
            messages: []
        }
    }
    submitHandler (e) {
        e.preventDefault();
        if (this.input.value !== '') {
            socket.emit('send message', {message: this.input.value, author: localStorage.getItem('email')})
            this.input.value = '';
            return false;
        } else {
            return
        }
    }
    componentDidMount () {
        
        socket.on('chat message', (message) => {
            this.setState((prevState, props) => {
                messages: prevState.messages.push(message);
            });
        });
    }
    componentWillUnmount () {
        socket.removeAllListeners('chat message');
    }
    render () {
        const messages = this.state.messages.map((message, i) => {
                return  <Message 
                            thumbnail={message.thumbnail} 
                            author={message.author}
                            message={message.message}
                            time={message.time}
                            key={i}
                        />
        });
        return (
            <div className="wall">
                <ul className="wall__chat">{messages}</ul>
                <form className="wall__form" onSubmit={this.submitHandler}>
                    <input placeholder="Type..." className="wall__input" autoComplete="off" type="text" id="m" ref={ref => {this.input = ref}}/>
                    <button className="wall__button"></button>
                </form>
            </div> 
        )
    }
}



module.exports = Wall;