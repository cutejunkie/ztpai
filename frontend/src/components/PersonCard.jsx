function PersonCard({ image, name }) {
    return (
      <div className="PersonCard">
        {image ? (
          <img src={image} alt={name} className="PersonCard-image" />
        ) : (
          <div className="PersonCard-placeholder">Brak zdjęcia</div>
        )}
        <p className="PersonCard-name">{name}</p>
      </div>
    );
  }

  export default PersonCard;