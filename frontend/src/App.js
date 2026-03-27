import { useState, useEffect } from 'react';
import ListingList from './components/ListingList';
import FilterBar from './components/FilterBar';
import './App.css';

function App() {
  const [listings, setListings] = useState([]);
  const [filters, setFilters] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const params = new URLSearchParams(filters).toString();
    setLoading(true);
    fetch(`http://localhost:3001/api/listings?${params}`)
      .then(res => res.json())
      .then(data => {
        setListings(data);
        setLoading(false);
      });
  }, [filters]);

  return (
    <div className="app">
      <header>
        <h1>🏠 Smart Housing Finder</h1>
        <p>Wohnungen in Deutschland — alles an einem Ort</p>
      </header>
      <FilterBar onFilter={setFilters} />
      {loading ? <p className="loading">Laden...</p> : <ListingList listings={listings} />}
    </div>
  );
}

export default App;