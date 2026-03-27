import ListingCard from './ListingCard';

function ListingList({ listings, token, favorites, onFavoriteToggle }) {
  if (listings.length === 0) {
    return <p className="no-results">Keine Wohnungen gefunden.</p>;
  }

  return (
    <div className="listing-list">
      <p className="listing-count">{listings.length} Wohnungen gefunden</p>
      <div className="listing-grid">
        {listings.map(listing => (
          <ListingCard
            key={listing.id}
            listing={listing}
            token={token}
            isFavorite={favorites.includes(listing.id)}
            onFavoriteToggle={onFavoriteToggle}
          />
        ))}
      </div>
    </div>
  );
}

export default ListingList;