import React, { useEffect, useContext, useMemo, useState, useCallback } from "react";
import { ListingsContext } from "../../../contexts/ListingsContext";
import ListingItem from "../../../components/ListingItem/ListingItem";
import classes from "./Listings.module.css";
import Loader from "../../../components/Loader/Loader";

function Listings() {
  const {
    fetchUniversities,
    universities: { entities },
    updateUniversities,
    userInterface: { universitiesFetching, universitiesFetched, universitiesFailed, universitiesError}
  } = useContext(ListingsContext);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortEnabled, setSortEnabled] = useState(false);
  const [stateEnabled, setStateEnabled] = useState(false);

  const filterList = useMemo(() => {
    let updatedList = Object.values(entities);
    if (sortEnabled) {
      updatedList.sort((a, b) => a.name.localeCompare(b.name));
    }
    if (stateEnabled) {
      updatedList = updatedList.filter((item) => !!item["state-province"]);
    }
    return updatedList;
  }, [entities, sortEnabled, stateEnabled]);

  const handleSortToggle = useCallback(() => {
    setSortEnabled((prevState) => !prevState);
  }, []);

  const handleStateToggle = useCallback(() => {
    setStateEnabled((prevState) => !prevState);
  }, []);

  const deleteUniversity = useCallback((name) => {
    setTimeout(() => {
      const updatedEntities = { ...entities };
      delete updatedEntities[name];
      updateUniversities(updatedEntities);
    }, 500);
  }, [entities, updateUniversities]);

  useEffect(() => {
    fetchUniversities();
  }, []);

  const updateSearch = useCallback((event) => {
    const valueToSearch = event.target.value.trim().toLowerCase();
    setSearchTerm(valueToSearch);
  }, []);

  const applySearchFilter = useCallback((list) => {
    return list.filter((item) =>
      item.name.toLowerCase().includes(searchTerm)
    );
  }, [searchTerm]); 

  return (
    <>
      <div className={classes.container}>
        <div className={classes.search}>
            <input type="text" placeholder="Search by name" value={searchTerm} onChange={updateSearch} />
        </div>
        <div className={classes.filters}>
          <div>
            <input type="checkbox" id="sort" name="sort" value="sort" 
            checked={sortEnabled}
            onChange={handleSortToggle} />
            <label htmlFor="sort" data-content="Sorting">Sorting</label>
          </div>
          <div>
            <input type="checkbox" id="state" name="state" value="state" 
            checked={stateEnabled}
            onChange={handleStateToggle} />
            <label htmlFor="state" data-content="State">State</label>
          </div>
            
        </div>
        {universitiesFetching ? <Loader /> :
          <table className={classes['university-table']}>
            <thead>
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Country</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {universitiesFetched && (searchTerm ? applySearchFilter(filterList) : filterList)?.map((item) => {
                return (
                  <ListingItem
                    key={item.name}
                    data={item}
                    deleteItem={deleteUniversity}
                  />
                );
              })}
              {universitiesFetched && filterList.length === 0 && <tr><td colSpan={3}><h2 style={{textAlign: "center"}}>No Result found!!</h2></td></tr>}
              {universitiesFailed && <tr><td colSpan={3}><h2 style={{textAlign: "center"}}>{universitiesError}</h2></td></tr>}
            </tbody>
          </table>
        }
      </div>
    </>
  );
}

export default Listings;
