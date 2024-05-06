import React, { useState } from "react";
import classes from "./ListingItem.module.css";
import { Link } from "react-router-dom";

function ListingItem({ data , deleteItem }) {

  const { name, country } = data;

  const [isDelete, setIsDelete] = useState(false);

  return <tr className={isDelete ? classes['delete-transition'] : ""}>
    <th scope="row">{name}</th>
    <td data-title="Country">{country}</td>
    <td data-title="Actions">
      <Link data-testid="detail-btn" to={name}><button className={classes['action-btn']}>Detail</button></Link>
      <button data-testid="delete-btn" className={classes['action-btn']} onClick={() => {setIsDelete(true); deleteItem(name);}}>Delete</button>
    </td>
  </tr>;
}

export default ListingItem;
