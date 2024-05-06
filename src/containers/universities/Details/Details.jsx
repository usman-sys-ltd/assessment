import React, { useContext, useEffect, useState } from "react";
import classes from "./Details.module.css";
import { useParams } from "react-router-dom";
import ItemDetails from "../../../components/ItemDetails/ItemDetails";
import { ListingsContext } from "../../../contexts/ListingsContext";
import Loader from "../../../components/Loader/Loader";

function Details() {
  const { id } = useParams();
  const {
    fetchUniversities,
    universities: { entities },
    userInterface: { universitiesFetched },
  } = useContext(ListingsContext);
  
  const [selectedUniversity, setSelectedUiversity] = useState({});
  
  useEffect(()=> {
    if (!universitiesFetched) {
      fetchUniversities();
      return;
    }
    setSelectedUiversity(entities[id]);
  },[universitiesFetched])

  if (!universitiesFetched) {
    return <Loader verticalCenter={true} />;
  }
  if (universitiesFetched && !selectedUniversity){
    return  <h1 className={classes.container}>Record not Found</h1>
  }

  const {
    alpha_two_code,
    name,
    country,
    domains,
    web_pages,
    "state-province": stateProvince,
  } = selectedUniversity;

  return (
    <div className={classes.container}>
      <div className={classes.card}>
        <div className={classes.header}>University Details</div>
        <div className={classes.content}>
          <ItemDetails title={"Name"} description={name} />
          <ItemDetails title={"Country Code"} description={alpha_two_code} />
          <ItemDetails title={"Country"} description={country} />
          <ItemDetails title={"Domains"} description={domains?.join(" ")} />
          <ItemDetails title={"Web Pages"} description={web_pages?.join(" ")} />
          {stateProvince && (
            <ItemDetails title={"State/Province"} description={stateProvince} />
          )}
        </div>
      </div>
    </div>
  );
}

export default Details;
