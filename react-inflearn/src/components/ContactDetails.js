import React from 'react';
import PropTypes from 'prop-types';

export default class ContactDetails extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isEdit: false,
            name: '',
            phone: ''
        };

        this.handleToggle = this.handleToggle.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
    }

    handleToggle() {
        if(!this.state.isEdit) {
            this.setState({
                name: this.props.contact.name,
                phone: this.props.contact.phone
            })
        } else {
            this.handleEdit();
        }

        // setState는 비동기이다.
        this.setState({
            isEdit: !this.state.isEdit
        });
        // setState()가 끝나기도 전에 console.log()가 실행되기 때문에 초기값이 false여도 이벤트 발생 때 log에는 false가 찍힌다.
        console.log(!this.state.isEdit);
    }

    handleChange(e) {
        let nextState = {};
        nextState[e.target.name] = e.target.value;  // 여기서 name은 input의 name, state.name이 아니다.
        this.setState(nextState);
    }

    handleEdit() {
        this.props.onEdit(this.state.name, this.state.phone);
    }

    handleKeyPress(e) {
        if(e.charCode == 13) {  // 13 : Enter
            this.handleToggle();
        }
    }
    
    render() {
        const details = (
            <div>
                <p>{this.props.contact.name}</p>
                <p>{this.props.contact.phone}</p>
            </div>
        );
        const eidt = (
            <div>
                <p>
                    <input 
                        type="text" 
                        name="name" 
                        placeholder="name" 
                        value={this.state.name} 
                        onChange={this.handleChange}
                    />
                </p>
                <p>
                    <input 
                        type="text" 
                        name="phone" 
                        placeholder="phone" 
                        value={this.state.phone} 
                        onChange={this.handleChange}
                        onKeyPress={this.handleKeyPress}
                    />
                </p>
            </div>
        );
        const view = this.state.isEdit ? eidt : details;
        const blank = (<div>Not Selected</div>);


        return(
            <div>
                <h2>Details</h2>
                {this.props.isSelected? view : blank }
                <p>
                    <button onClick={this.handleToggle}>
                        { this.state.isEdit ? 'OK' : 'Edit' }
                    </button>
                    <button onClick={this.props.onRemove}>Remove</button>
                </p>
            </div>
        );
    }
}

ContactDetails.defaultProps = {
    contact: {
        name: '',
        phone: ''
    },
    onRemove: () => { console.log('onRemove not defined'); },
    onEdit: () => { console.log('onEdit not defined'); }
}

ContactDetails.propTypes = {
    contact: PropTypes.object,
    onRemove: PropTypes.func,
    onEdit: PropTypes.func
}