import React from "react";
import ContactInfo from "./ContactInfo";
import ContactDetails from "./ContactDetails";
import ContactCreate from "./ContactCreate";

import update from "react-addons-update";

export default class Contact extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedId: -1,
            nextId: 4,  // 새로운 연락처를 추가할 때 사용할 id
            keyword: '',
            contactData: [
                {id: 0, name: 'Albet', phone: '010-0000-0000'},
                {id: 1, name: 'Betty', phone: '010-0000-0001'},
                {id: 2, name: 'Charlie', phone: '010-0000-0002'},
                {id: 3, name: 'David', phone: '010-0000-0003'}
            ]
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
        
        this.handleCreate = this.handleCreate.bind(this);
        this.handleRemove = this.handleRemove.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
    }

    componentWillMount() {
        const contactData = localStorage.contactData;
        const nextId = localStorage.nextId;

        if(contactData) {
            this.setState({
                contactData: JSON.parse(contactData),
                nextId: nextId
            })
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if(JSON.stringify(prevState.contactData) != JSON.stringify(this.state.contactData)) {
            localStorage.contactData = JSON.stringify(this.state.contactData);
        }

        if(prevState.nextId != this.state.nextId) {
            localStorage.nextId = this.state.nextId;
        }
    }

    handleChange(e) {
        this.setState({
            keyword: e.target.value
        });
    }

    // 왜 id를 사용하나요? -> 검색을 통한 필터링 후에도 올바른 결과를 출력하기 위해
    handleClick(id) {
        this.setState({
            selectedId: id
        });

        console.log(id, 'is selected');
    }

    handleCreate(contact) {
        contact.id = this.state.nextId;

        this.setState({
            contactData: update(this.state.contactData, { $push: [contact] }),
            nextId: this.state.nextId + 1
        });
    }

    handleRemove() {
        if(this.state.selectedId < 0) {
            return;
        }

        this.setState({
            contactData: update(this.state.contactData, 
                { $splice: [[this.state.selectedId, 1]] }
            ),
            selectedId: -1
        })
    }

    handleEdit(name, phone) {
        this.setState({
            contactData: update(this.state.contactData,
                {
                    [this.state.selectedId]: {
                        name: { $set: name },
                        phone: { $set: phone}
                    }
                }
            )
        })
    }
    
    render() {
        const mapToComponent = (data) => {
            data = data.slice().sort((a,b) => a.name > b.name);
            data = data.filter(
                (contact) => {
                    return contact.name.toLowerCase().indexOf(this.state.keyword.toLocaleLowerCase()) > -1;
                }
            );
            return data.map((contact, i) => {
                return (<ContactInfo 
                    contact={contact} 
                    key={i}
                    onClick={()=> this.handleClick(contact.id)}/>);
            })
        };
        
        return(
            <div>
                <h1>Contacts</h1>
                <input
                    name="keyword"
                    placeholder="Search"
                    value={this.state.keyword}
                    onChange={this.handleChange}
                />
                <div>{mapToComponent(this.state.contactData)}</div>
                <ContactDetails
                    isSelected={this.state.selectedId != -1}
                    contact={this.state.contactData.find(contact => contact.id == this.state.selectedId)} 
                    onRemove={this.handleRemove} 
                    onEdit={this.handleEdit}
                />
                <ContactCreate
                    onCreate={this.handleCreate}
                />
            </div>
        );
    }
}