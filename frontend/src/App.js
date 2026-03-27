import { useState, useEffect } from 'react';
import ListingList from './components/ListingList';
import FilterBar from './components/FilterBar';
import AuthModal from './components/AuthModal';
import { fetchListings, fetchFavorites, addFavorite, removeFavorite } from './api/listings';
import './App.css';

function App() {
  const [listings, setListings] = useState([]);
  const [filters, setFilters] = useState({});
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user') || 'null'));
  const [favorites, setFavorites] = useState([]);
  const [showAuth, setShowAuth] = useState(false);
  const [showFavorites, setShowFavorites] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(filters).toString();
    setLoading(true);
    fetchListings(filters).then(data => {
      setListings(data);
      setLoading(false);
    });
  }, [filters]);

  useEffect(() => {
    if (token) {
      fetchFavorites(token).then(data => {
        if (Array.isArray(data)) setFavorites(data.map(f => f.id));
      });
    }
  }, [token]);

  const handleAuth = (token, user) => {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    setToken(token);
    setUser(user);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setToken(null);
    setUser(null);
    setFavorites([]);
  };

  const handleFavoriteToggle = async (listingId) => {
    if (favorites.includes(listingId)) {
      await removeFavorite(token, listingId);
      setFavorites(prev => prev.filter(id => id !== listingId));
    } else {
      await addFavorite(token, listingId);
      setFavorites(prev => [...prev, listingId]);
    }
  };

  const displayedListings = showFavorites
    ? listings.filter(l => favorites.includes(l.id))
    : listings;

  return (
    <div className="app">
      <header>
        <div className="header-top">
          <div>
            <h1>🏠 Smart Housing Finder</h1>
            <p>Wohnungen in Deutschland — alles an einem Ort</p>
          </div>
          <div className="header-actions">
            {token ? (
              <>
                <span className="user-email">{user?.email}</span>
                <button className="btn-secondary" onClick={() => setShowFavorites(!showFavorites)}>
                  {showFavorites ? 'Alle anzeigen' : `❤️ Favoriten (${favorites.length})`}
                </button>
                <button className="btn-secondary" onClick={handleLogout}>Abmelden</button>
              </>
            ) : (
              <button className="btn-primary" onClick={() => setShowAuth(true)}>Anmelden</button>
            )}
          </div>
        </div>
      </header>
      <FilterBar onFilter={setFilters} />
      {loading
        ? <p className="loading">Laden...</p>
        : <ListingList
            listings={displayedListings}
            token={token}
            favorites={favorites}
            onFavoriteToggle={handleFavoriteToggle}
          />
      }
      {showAuth && <AuthModal onClose={() => setShowAuth(false)} onAuth={handleAuth} />}
    </div>
  );
}

export default App;