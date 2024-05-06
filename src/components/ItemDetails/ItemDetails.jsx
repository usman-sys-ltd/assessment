import React from "react";
import classes from "./ItemDetails.module.css"

function ItemDetails({title, description}) {
  return <>
    <div className={classes.left}>
      <h2 className={classes.title}>{title}</h2>
    </div>
    <div className={classes.right}>
      <p className={classes.description}>{description}</p>
    </div>
  </>;
}

export default ItemDetails;
