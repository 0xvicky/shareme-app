import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom"
import { client } from "../../client"
import "./Feed.css"


import Spinner from "../Spinner/Spinner";
import { searchQuery } from "../../utils/data";
const Feed = () => {
    const [loading, setLoading] = useState(false);
    const [pins, setPins] = useState()
    const { categoryId } = useParams()

    useEffect(() => {
        setLoading(true)

        if (categoryId) { //will show only the feeds whose category id provided
            const query = searchQuery(categoryId)
            try {
                client.fetch(query).then(res => setPins(res))
                setTimeout(() => setLoading(false), 1000)//to avoid flickering effect
            } catch (error) {
                console.log(`Error occured:${error}`)
            }
        }
        else {

        }//will show all feeds irrespective of category
    }, [categoryId]);



    if (loading) return <Spinner msg="We are adding ideas to your feed !" />
    return <div>Feed</div>;
};

export default Feed;
