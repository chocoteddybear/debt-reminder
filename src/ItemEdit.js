import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import removeIcon from "./svg/remove_icon.svg";
import exchangeIcon from "./svg/exchange.svg";
import backArrow from "./svg/back_arrow.svg";
import doneIcon from "./svg/done_icon.svg";
import doneIconChecked from "./svg/done_icon_checked.svg";

const path = process.env.PORT || 8080;

class ItemEdit extends Component {
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

  componentDidMount() {
    const { match } = this.props;
    return fetch(`${path}/users/${match.params.uid}`)
      .then(res => res.json())
      .then(list => {
        console.log(list);
        this.setState({
          inputName: list.name,
          inputPhone: list.phone,
          inputDateStart: list.dateStart,
          inputDateEnd: list.dateEnd,
          inputText: list.text,
          list: [list]
        });
      });
  }

  changeItem = item => {
    const { match } = this.props;
    const options = {
      method: "PATCH",
      body: JSON.stringify(item),
      headers: new Headers({
        "Content-Type": "application/json"
      })
    };
    return fetch(`${path}/users/${match.params.uid}`, options)
      .then(response => response.json())
      .catch(error => console.error(`Error: ${error}`));
  };

  changeInput(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  changeList(name, phone, dateStart, dateEnd, text) {
    const itemData = {
      name,
      phone,
      dateStart,
      dateEnd,
      text
    };

    if (text) {
      this.state.list.splice(0, 1, {
        id: this.state.list.id,
        name: name,
        phone: phone,
        dateStart: dateStart,
        dateEnd: dateEnd,
        text: text
      });
      this.setState({
        list: this.state.list
      });
    }
    this.changeItem(itemData);
  }

  render() {
    const rend = this.state.list.map(item => (
      <li key={item.id} className="item">
        <div className="unputData">
          <div>{item.name}</div>
          <div>{item.phone}</div>
          <div>{item.dateStart}</div>
          <div>{item.dateEnd}</div>
          <div>{item.text}</div>
        </div>
      </li>
    ));
    return (
      <div className="container">
        <div className="row">
          <header>
            <div className="header-flexblock">
              <Link to="/">
                <button>
                  <img src={backArrow} alt="" />
                </button>
              </Link>
              <h1>Change data</h1>
            </div>
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
                placeholder=""
                name="inputDateStart"
                value={this.state.inputDateStart}
                onChange={e => this.changeInput(e)}
              />
              <input
                type="text"
                placeholder=""
                name="inputDateEnd"
                value={this.state.inputDateEnd}
                onChange={e => this.changeInput(e)}
              />
            </div>
            <div className="header-flexblock">
              <input
                type="text"
                placeholder=""
                name="inputText"
                value={this.state.inputText}
                onChange={e => this.changeInput(e)}
                onKeyPress={e => {
                  if (e.key === "Enter") {
                    this.changeList(this.state.inputText);
                  }
                }}
              />
              <button
                onClick={() =>
                  this.changeList(
                    this.state.inputName,
                    this.state.inputPhone,
                    this.state.inputDateStart,
                    this.state.inputDateEnd,
                    this.state.inputText
                  )
                }
                disabled={!this.state.inputText}
              >
                <img src={exchangeIcon} alt="Add" />
              </button>
            </div>
          </header>
          <ul className="item-list">{rend}</ul>
        </div>
      </div>
    );
  }
}

export default ItemEdit;
