import { useState } from 'react';
import { generateResponse } from '../api/listings';

function ListingCard({ listing, token, isFavorite, onFavoriteToggle }) {
  const [aiMessage, setAiMessage] = useState('');
  const [loadingAI, setLoadingAI] = useState(false);
  const [showAI, setShowAI] = useState(false);

  const handleGenerateResponse = async () => {
    setLoadingAI(true);
    setShowAI(true);
    const data = await generateResponse(listing);
    setAiMessage(data.message || data.error);
    setLoadingAI(false);
  };

  return (
    <div className="listing-card">
      <div className="listing-card__header">
        <span className="listing-card__source">{listing.source}</span>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          {listing.price && <span className="listing-card__price">{listing.price} €</span>}
          {token && (
            <button
              className={`favorite-btn ${isFavorite ? 'active' : ''}`}
              onClick={() => onFavoriteToggle(listing.id)}
            >
              {isFavorite ? '❤️' : '🤍'}
            </button>
          )}
        </div>
      </div>
      <h3 className="listing-card__title">{listing.title}</h3>
      <div className="listing-card__details">
        {listing.city && <span>📍 {listing.city}</span>}
        {listing.rooms && <span>🚪 {listing.rooms} Zimmer</span>}
        {listing.size_sqm && <span>📐 {listing.size_sqm} m²</span>}
      </div>
      <div className="listing-card__footer">
        <a href={listing.url} target="_blank" rel="noreferrer" className="listing-card__link">
          Anzeige ansehen →
        </a>
        <button className="btn-ai" onClick={handleGenerateResponse}>
          ✨ Anschreiben
        </button>
      </div>
      {showAI && (
        <div className="ai-message">
          <div className="ai-message__header">
            <span>✨ KI-Anschreiben</span>
            <button onClick={() => setShowAI(false)}>✕</button>
          </div>
          {loadingAI ? (
            <p className="ai-loading">Wird generiert...</p>
          ) : (
            <>
              <p className="ai-text">{aiMessage}</p>
              <button className="btn-copy" onClick={() => navigator.clipboard.writeText(aiMessage)}>
                📋 Kopieren
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default ListingCard;