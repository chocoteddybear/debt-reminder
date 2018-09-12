import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./style.css";
import Item from "./Item";
import addIcon from "./svg/add_icon.svg";
import removeIcon from "./svg/remove_icon.svg";

// HTTP Requests

const path = process.env.PORT || 8080;

const addItem = item => {
  const options = {
    method: "POST",
    body: JSON.stringify(item),
    headers: new Headers({
      "Content-Type": "application/json"
    })
  };
  return fetch(`${path}/users`, options)
    .then(response => response.json())
    .catch(error => console.error(`Error: ${error}`));
};

const removeItem = item => {
  const options = {
    method: "DELETE"
  };
  return fetch(`${path}/users/${item}`, options);
};

// Component App

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputName: "",
      inputPhone: "",
      inputDateStart: "",
      inputDateEnd: "",
      inputText: "",
      list: []
    };
  }

  // Take items from db.json to state

  componentDidMount() {
    return fetch(`${path}/users`)
      .then(res => res.json())
      .then(list => {
        this.setState({
          list
        });
      });
  }

  // Tracking input value by name of the input

  changeInput(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  addToList(name, phone, dateStart, dateEnd, text) {
    const itemData = {
      name,
      phone,
      dateStart,
      dateEnd,
      text
    };

    if (text) {
      this.state.list.push({
        id: this.state.list.length + 1,
        name: name,
        phone: phone,
        dateStart: dateStart,
        dateEnd: dateEnd,
        text: text
      });
      this.setState({
        List: this.state.list,
        inputName: "",
        inputPhone: "",
        inputDateStart: "",
        inputDateEnd: "",
        inputText: ""
      });
      addItem(itemData);
    }
  }

  removeFromList = value => {
    removeItem(value.id);
    const indexArrItem = this.state.list.indexOf(value);

    this.state.list.splice(indexArrItem, 1);

    // for (var i = 0; i < this.state.List.length; i++) {
    //   if (this.state.List[i] === value)
    //     return this.state.List.splice(i, 1);
    //   break;
    // }

    this.setState({ list: this.state.list });
  };

  render() {
    return (
      <div className="container">
        <div className="row">
          <header>
            <h1>Sharing is caring</h1>
            <div className="header-flexblock">
              <input
                type="text"
                placeholder="Name"
                name="inputName"
                value={this.state.inputName}
                onChange={e => this.changeInput(e)}
              />
              <input
                type="text"
                placeholder="Phone"
                name="inputPhone"
                value={this.state.inputPhone}
                onChange={e => this.changeInput(e)}
              />
            </div>
            <div className="header-flexblock">
              <input
                type="text"
                placeholder="When start?"
                name="inputDateStart"
                value={this.state.inputDateStart}
                onChange={e => this.changeInput(e)}
              />
              <input
                type="text"
                placeholder="When end?"
                name="inputDateEnd"
                value={this.state.inputDateEnd}
                onChange={e => this.changeInput(e)}
              />
            </div>
            <div className="header-flexblock">
              <input
                type="text"
                placeholder="What share?"
                name="inputText"
                value={this.state.inputText}
                onChange={e => this.changeInput(e)}
                onKeyPress={e => {
                  if (e.key === "Enter") {
                    this.addToList(this.state.inputText);
                  }
                }}
              />
              <button
                onClick={() =>
                  this.addToList(
                    this.state.inputName,
                    this.state.inputPhone,
                    this.state.inputDateStart,
                    this.state.inputDateEnd,
                    this.state.inputText
                  )
                }
                disabled={!this.state.inputText}
              >
                <img src={addIcon} alt="Add" />
              </button>
            </div>
          </header>
          <ul className="item-list">
            <Item data={this.state.list} removeFromList={this.removeFromList} />
            {/* {this.state.list ? (
              this.state.list.map(post => (
                <li key={post.id} className="item">
                  <Link to={`/user/${post.id}`}>
                    <div className="unputData">
                      <div>{post.name || "[no name]"}</div>
                      <div>{post.phone || "[no phone]"}</div>
                      <div>{post.dateStart || "[no start date]"}</div>
                      <div>{post.dateEnd || "[no end date]"}</div>
                      <div>{post.text || "[no text]"}</div>
                    </div>
                  </Link>
                  <button
                    className="delete"
                    onClick={() => this.removeFromList(post)}
                  >
                    <img className="icon" src={removeIcon} alt="Remove" />
                  </button>
                </li>
              ))
            ) : (
              <div>Loading...</div>
            )} */}
          </ul>
        </div>
      </div>
    );
  }
}

export default App;
