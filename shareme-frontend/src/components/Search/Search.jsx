import React, {useState, useEffect} from "react";
import {client} from "../../client";
import {feedQuery, searchQuery} from "../../utils/data";

import MasonryLayout from "../MasonryLayout/MasonryLayout";
import Spinner from "../Spinner/Spinner";
const Search = ({search}) => {
  const [pins, setPins] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (search) {
      console.log(search);
      setLoading(true);
      let query = searchQuery(search.toLowerCase());
      client.fetch(query).then(res => {
        setPins(res);
        setLoading(false);
      });
    } else {
      client.fetch(feedQuery).then(res => {
        setPins(res);
        setLoading(false);
      });
    }
  }, [search]);

  return (
    <div>
      {loading && <Spinner msg='Searching Pins...' />}
      {pins?.length > 0 && <MasonryLayout pins={pins} />}
      {pins?.length === 0 && search !== "" && !loading && <div>No Pins Found</div>}
    </div>
  );
};

export default Search;
