import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import removeIcon from "./svg/remove_icon.svg";
import doneIcon from "./svg/done_icon.svg";
import doneIconChecked from "./svg/done_icon_checked.svg";

function Item(props) {
  const x = props;
  const rend = x.data.map(item => (
    <li key={item.id} className="item">
      <Link to={`/debtor/${item.id}`}>
        <div className="unputData">
          <div>{item.name}</div>
          <div>{item.phone}</div>
          <div>{item.dateStart}</div>
          <div>{item.dateEnd}</div>
          <div>{item.text}</div>
        </div>
      </Link>
      <button className="delete" onClick={() => props.removeFromList(item)}>
        <img className="icon" src={removeIcon} alt="Remove" />
      </button>
    </li>
  ));

  return <Fragment>{rend}</Fragment>;
}

export default Item;
