import React from "react";

function SearchEngine({ query, setQuery, search }) {
  return (
    <div className="SearchEngine w-full flex justify-evenly items-center mb-8 mt-4">
      <input
        type="text"
        className="city-search w-3/4 h-10 rounded-lg px-4 text-lg text-gray-700 placeholder-gray-500 focus:outline-none"
        placeholder="Enter city name"
        name="query"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyPress={(e) => e.key === 'Enter' && search(e)}
      />
      <button onClick={search} className="w-10 h-10 bg-[#374151] text-white rounded-lg text-xl flex items-center justify-center hover:bg-blue-500">
        <i className="fas fa-search"></i>
      </button>
    </div>
  );
}

export default SearchEngine;
