import React from 'react';
import {Modal} from 'react-bootstrap';
import socket from '../socket-connection';
import Message from '../components/Message';


class ChatModal extends React.Component {
    constructor () {
        super ();
        this.state = {
            messages: []
        }
        this.submitHandler = this.submitHandler.bind(this);
    }
    componentDidMount () {
        console.log('chat mounted')
        socket.on('incoming message', (content) => {
            if (content.author == this.props.selectedUser || content.author == this.props.currentUser) {
                this.setState((prevState, props) => {
                    messages: prevState.messages.push(content);
                });
            }
            else {
                return;
            }
        });
    }
    componentWillUnmount () {
        socket.removeAllListeners('incoming message');
        console.log('unmounted')
    }
    submitHandler (e) {
        e.preventDefault();
        const content = this.input.value;
        if (content.length > 0) {
            socket.emit('private message', {
                author: this.props.currentUser, 
                receiver: this.props.selectedUser, 
                content: content
            });
            this.input.value = '';
        }
    }
    render () {
        const messages = this.state.messages.map((item, i) => {
            return  <Message 
                        key={i} 
                        thumbnail={item.thumbnail}
                        author={item.author}
                        message={item.content}
                        time={item.time}
                    />
        });
        return (
            <div className="chat-container">
                <ul className="chat-container__chat">{messages}</ul>
                <form className="chat-container__form" onSubmit={this.submitHandler}>
                    <input placeholder="Type..." className="chat-container__input" type="text" ref={ref => {this.input = ref}}/>
                    <button className="chat-container__button"></button>
                </form>
            </div>
        )
    }
}


module.exports = ChatModal;