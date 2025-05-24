function Profile({ image, name, date }) {
    return (
      <div className="Profile">
        {image ? (
          <img src={image} alt={name} className="Profile-image" />
        ) : (
          <div className="Profile-placeholder">Brak zdjęcia</div>
        )}
        <p className="Profile-name">{name}</p>
        <p>z nami od: {date}</p>
      </div>
    );
  }

  export default Profile;