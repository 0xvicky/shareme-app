import React, { useState } from "react";
import { Routes, Route } from "react-router-dom"
import { Navbar, Feed, PinDetails, CreatePin, Search } from "../../components"

const Pins = ({ user }) => {

  const [search, setSearch] = useState('');

  return (
    <div className="px-2 m-2">
      <div className="bg-slate-200">
        <Navbar search={search} setSearch={setSearch} />
      </div>
      <div>
        <Routes>
          <Route path="/" element={<Feed />} />
          <Route path="/category/:categoryId" element={<Feed />} />
          <Route path="/pin-details/:pinId" element={<PinDetails />} />
          <Route path="/create-pin" element={<CreatePin />} />
          <Route path="/search" element={<Search search={search} setSearch={setSearch} />} />

        </Routes>
      </div>
    </div>
  )
};

export default Pins;
