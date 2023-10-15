import { useRouter } from 'next/router';
import React, { useState } from 'react'

const SearchAdmin = ({data, defaultValue = 'name'}) => {
    const [typeSearch, setTypeSearch] = useState(defaultValue);
    const [search, setSearch] = useState("");


    const router = useRouter()


    const handleSearch = () => {
      console.log(typeSearch)
        router.push({ query: { [typeSearch]: search } });
      };
  return (
    <div className="join mt-2">
    <div>
      <div>
        <input
          className="input input-bordered join-item"
          placeholder="Tìm kiếm người dùng..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
    </div>
    <select
      value={typeSearch}
      onChange={(e) => setTypeSearch(e.target.value)}
      className="select select-bordered join-item"
    >
      {data.map((item,index) => <option value={item.value} key={index}>{item.name}</option>
     )}
    </select>
    <div className="indicator">
      <button className="btn join-item" onClick={handleSearch}>
        Tìm kiếm
      </button>
    </div>
  </div>
  )
}

export default SearchAdmin