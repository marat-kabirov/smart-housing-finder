import { useState } from 'react';

function FilterBar({ onFilter }) {
  const [city, setCity] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [minRooms, setMinRooms] = useState('');

  const handleApply = () => {
    const filters = {};
    if (city) filters.city = city;
    if (minPrice) filters.min_price = minPrice;
    if (maxPrice) filters.max_price = maxPrice;
    if (minRooms) filters.min_rooms = minRooms;
    onFilter(filters);
  };

  const handleReset = () => {
    setCity('');
    setMinPrice('');
    setMaxPrice('');
    setMinRooms('');
    onFilter({});
  };

  return (
    <div className="filter-bar">
      <input
        placeholder="Stadt (z.B. Chemnitz)"
        value={city}
        onChange={e => setCity(e.target.value)}
      />
      <input
        type="number"
        placeholder="Min. Preis €"
        value={minPrice}
        onChange={e => setMinPrice(e.target.value)}
      />
      <input
        type="number"
        placeholder="Max. Preis €"
        value={maxPrice}
        onChange={e => setMaxPrice(e.target.value)}
      />
      <input
        type="number"
        placeholder="Min. Zimmer"
        value={minRooms}
        onChange={e => setMinRooms(e.target.value)}
      />
      <button onClick={handleApply}>Suchen</button>
      <button onClick={handleReset}>Reset</button>
    </div>
  );
}

export default FilterBar;