import React, {useState, useEffect} from "react";
import {useParams} from "react-router-dom";
import {client} from "../../client";
import "./Feed.css";
import Spinner from "../Spinner/Spinner";
import {searchQuery, feedQuery} from "../../utils/data";
import MasonryLayout from "../MasonryLayout/MasonryLayout";

const Feed = () => {
  const [loading, setLoading] = useState(false);
  const [pins, setPins] = useState(null);
  const {categoryId} = useParams();

  useEffect(() => {
    setLoading(true);

    if (categoryId) {
      //will show only the feeds whose category id provided
      const query = searchQuery(categoryId);
      try {
        client.fetch(query).then(res => setPins(res));
        setTimeout(() => setLoading(false), 1000); //to avoid flickering effect
        setLoading(false);
      } catch (error) {
        console.log(`Error occured:${error}`);
      }
    } else {
      try {
        client.fetch(feedQuery).then(res => {
          setPins(res);
        });
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      } catch (error) {
        console.log(`Error occured while fetching all pins:${error}`);
      }
    } //will show all feeds irrespective of category
  }, [categoryId]);

  if (loading) return <Spinner msg='We are adding ideas to your feed !' />;
  return <div>{pins && <MasonryLayout pins={pins} />}</div>;
};

export default Feed;
