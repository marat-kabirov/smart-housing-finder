function ListingCard({ listing }) {
  return (
    <div className="listing-card">
      <div className="listing-card__header">
        <span className="listing-card__source">{listing.source}</span>
        {listing.price && <span className="listing-card__price">{listing.price} €</span>}
      </div>
      <h3 className="listing-card__title">{listing.title}</h3>
      <div className="listing-card__details">
        {listing.city && <span>📍 {listing.city}</span>}
        {listing.rooms && <span>🚪 {listing.rooms} Zimmer</span>}
        {listing.size_sqm && <span>📐 {listing.size_sqm} m²</span>}
      </div>
      <a href={listing.url} target="_blank" rel="noreferrer" className="listing-card__link">
        Anzeige ansehen →
      </a>
    </div>
  );
}

export default ListingCard;