import React, { useState, createContext } from "react";
import ApiService from "../utils/ApiService";

export const ListingsContext = createContext();

const ListingsContextProvider = (props) => {
  const [userInterface, setUserInterface] = useState({
    universitiesFetching: false,
    universitiesFetched: false,
    universitiesFailed: false,
    universitiesError: null,
  });
  const { universitiesFetching, universitiesFetched } = userInterface;
  const [universities, setUniversities] = useState({
    ids: [],
    entities: {}, // considering the university name as a unique Identifier
  });

  const updateUniversities = (data) =>{
    setUniversities({
      ids: Object.keys(data),
      entities: data,
    });
  }

  const fetchUniversities = async (forceFetch = false) => {
    const cachedData = JSON.parse(localStorage.getItem('entities'))
    if (cachedData){
      updateUniversities(cachedData)
      setUserInterface((prevState) => ({
        ...prevState,
        universitiesFetching: false,
        universitiesFetched: true,
        universitiesFailed: false,
        universitiesError: null,
      }));
      return;
    }
    const fetching = universitiesFetching;
    const alreadyFetched = universitiesFetched;
    if ((!forceFetch && alreadyFetched) || fetching) {
      return;
    }
    const params = {
      country: "United Arab Emirates", // we can add this dynamically as well in the function argument
    };
    try {
      setUserInterface((prevState) => ({
        ...prevState,
        universitiesFetching: true,
        universitiesFetched: false,
        universitiesFailed: false,
        universitiesError: null,
      }));
      const { data } = await ApiService.get("search", params);
      let allIds = [];
      let allEntities = {};
      data.forEach((item) => {
        allIds.push(item.name);
        allEntities[item.name] = item;
      });
      setUniversities({
        ids: allIds,
        entities: allEntities,
      });
      localStorage.setItem("entities", JSON.stringify(allEntities));
      setUserInterface((prevState) => ({
        ...prevState,
        universitiesFetching: false,
        universitiesFetched: true,
        universitiesFailed: false,
        universitiesError: null,
      }));
    } catch (error) {
      setUserInterface((prevState) => ({
        ...prevState,
        universitiesFetching: false,
        universitiesFetched: false,
        universitiesFailed: true,
        universitiesError: error.message,
      }));
    }
  };

  return (
    <ListingsContext.Provider
      value={{ fetchUniversities, universities, updateUniversities, userInterface }}
    >
      {props.children}
    </ListingsContext.Provider>
  );
};

export default ListingsContextProvider;
