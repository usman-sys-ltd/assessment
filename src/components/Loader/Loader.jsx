import React from "react";
import classes from "./Loader.module.css";
import Spinner from "../../spinner.svg";

const Loader = ({verticalCenter = false}) => {

    return (
        <div data-testid="loader" className={verticalCenter ? `${classes['loader']} ${classes['vertical']}` : classes['loader']}>
            <img src={Spinner} alt="loading" />
        </div>
    )

};

export default Loader;