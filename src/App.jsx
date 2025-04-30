import React, { useState } from "react";
import "./styles.css";

// Movie data with corrected TMDB poster URLs
const movies = [
  {
    id: 1,
    title: "Avengers: Endgame",
    description: "The epic conclusion to the Avengers saga, where heroes unite to reverse the devastating effects of Thanos' snap.",
    imageUrl: "https://image.tmdb.org/t/p/w500/or06FN3Dka5tukK1e9sl16pB3iy.jpg",
    availableTimes: ["10:00 AM", "1:00 PM", "6:00 PM", "9:00 PM"],
  },
  {
    id: 2,
    title: "The Lion King",
    description: "A young lion prince flees his kingdom only to learn the true meaning of responsibility and bravery in this timeless tale.",
    imageUrl: "https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
    availableTimes: ["12:00 PM", "3:00 PM", "7:00 PM"],
  },
  {
    id: 3,
    title: "Interstellar",
    description: "A team of explorers travels through a wormhole in space to ensure humanity's survival in this mind-bending sci-fi epic.",
    imageUrl: "https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",
    availableTimes: ["11:00 AM", "2:00 PM", "5:00 PM"],
  },
  {
    id: 4,
    title: "Inception",
    description: "A thief enters the dreams of others to steal secrets, tasked with planting an idea in this thrilling sci-fi masterpiece.",
    imageUrl: "https://image.tmdb.org/t/p/w500/or06FN3Dka5tukK1e9sl16pB3iy.jpg",
    availableTimes: ["1:00 PM", "4:00 PM", "7:00 PM"],
  },
  {
    id: 5,
    title: "The Dark Knight",
    description: "Batman faces the Joker, a chaotic force wreaking havoc on Gotham, in this gripping superhero saga.",
    imageUrl: "https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
    availableTimes: ["10:30 AM", "2:30 PM", "6:30 PM"],
  },
  {
    id: 6,
    title: "Spider-Man: No Way Home",
    description: "Peter Parker's identity is revealed, leading to a multiverse adventure with Doctor Strange in this Marvel blockbuster.",
    imageUrl: "https://image.tmdb.org/t/p/w500/1g0dhYtq4irTY1GPXvft6k4YLjm.jpg",
    availableTimes: ["12:00 PM", "3:00 PM", "8:00 PM"],
  },
];

function Header() {
  return (
    <header className="header">
      <div className="logo">
        <i className="fas fa-ticket-alt logo-icon"></i>
        <span>BookMyTicket</span>
      </div>
      <nav className="nav">
        <a href="/">Home</a>
        <a href="/about">About</a>
        <a href="/services">Services</a>
        <a href="/contact">Contact</a>
      </nav>
    </header>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>© 2025 BookMyTicket. All rights reserved.</p>
        <div className="socials">
          <a href="https://twitter.com" target="_blank" rel="noreferrer">
            <i className="fab fa-twitter"></i>
          </a>
          <a href="https://github.com" target="_blank" rel="noreferrer">
            <i className="fab fa-github"></i>
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noreferrer">
            <i className="fab fa-linkedin"></i>
          </a>
        </div>
      </div>
    </footer>
  );
}

function BookingSection() {
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [selectedTime, setSelectedTime] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [booked, setBooked] = useState(false);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [bookedSeatsByMovieAndTime, setBookedSeatsByMovieAndTime] = useState({
    "1_10:00 AM": ["A1", "B3"],
    "2_12:00 PM": ["C5", "D7"],
  });
  const totalSeats = 80;
  const seatsPerRow = 10;
  const rows = totalSeats / seatsPerRow;

  const handleMovieSelection = (movie) => {
    setSelectedMovie(movie);
    setSelectedTime("");
    setSelectedSeats([]);
    setBooked(false);
    setName("");
    setEmail("");
  };

  const handleTimeSelection = (time) => {
    setSelectedTime(time);
    setSelectedSeats([]);
    setBooked(false);
    setName("");
    setEmail("");
  };

  const handleSeatSelection = (seatId) => {
    if (!selectedMovie || !selectedTime) return;
    const key = `${selectedMovie.id}_${selectedTime}`;
    const currentBookedSeats = bookedSeatsByMovieAndTime[key] || [];
    if (currentBookedSeats.includes(seatId)) return;
    setSelectedSeats((prev) =>
      prev.includes(seatId)
        ? prev.filter((seat) => seat !== seatId)
        : [...prev, seatId]
    );
  };

  const handleBooking = () => {
    if (name && email && selectedTime && selectedSeats.length > 0) {
      const key = `${selectedMovie.id}_${selectedTime}`;
      setBookedSeatsByMovieAndTime((prev) => ({
        ...prev,
        [key]: [...(prev[key] || []), ...selectedSeats],
      }));
      setBooked(true);
    } else {
      alert("Please fill in all details and select at least one seat.");
    }
  };

  const handleBack = () => {
    setSelectedMovie(null);
    setSelectedTime("");
    setSelectedSeats([]);
    setBooked(false);
    setName("");
    setEmail("");
  };

  const renderSeats = () => {
    const seatGrid = [];
    const key = selectedMovie && selectedTime ? `${selectedMovie.id}_${selectedTime}` : null;
    const currentBookedSeats = key ? bookedSeatsByMovieAndTime[key] || [] : [];
    for (let row = 0; row < rows; row++) {
      const rowSeats = [];
      for (let col = 0; col < seatsPerRow; col++) {
        const seatId = `${String.fromCharCode(65 + row)}${col + 1}`;
        const isBooked = currentBookedSeats.includes(seatId);
        const isSelected = selectedSeats.includes(seatId);
        rowSeats.push(
          <div
            key={seatId}
            className={`seat ${isSelected ? "selected" : ""} ${isBooked ? "booked" : ""}`}
            onClick={() => handleSeatSelection(seatId)}
          >
            {seatId}
          </div>
        );
      }
      seatGrid.push(
        <div key={row} className="seat-row">
          {rowSeats}
        </div>
      );
    }
    return seatGrid;
  };

  return (
    <div className="booking-section">
      <h2 className="animated-heading">Book Your Movie Tickets</h2>
      {!selectedMovie ? (
        <div className="movie-list">
          {movies.map((movie) => (
            <div
              key={movie.id}
              className="movie-card"
              onClick={() => handleMovieSelection(movie)}
            >
              <img src={movie.imageUrl} alt={movie.title} />
              <div className="movie-info">
                <h3 className="movie-title">{movie.title}</h3>
                <p className="movie-description">{movie.description}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="movie-details">
          <button className="back-button" onClick={handleBack}>
            Back to Movies
          </button>
          <h3 className="animated-heading">{selectedMovie.title}</h3>
          <p className="movie-description">{selectedMovie.description}</p>
          <h4 className="animated-heading">Showtimes</h4>
          <div className="showtimes">
            {selectedMovie.availableTimes.map((time) => (
              <button
                key={time}
                onClick={() => handleTimeSelection(time)}
                className={selectedTime === time ? "selected" : ""}
              >
                {time}
              </button>
            ))}
          </div>
          {selectedTime && (
            <>
              <div className="seat-selection">
                <h4 className="animated-heading">
                  Select Seats for {selectedMovie.title} at {selectedTime}
                </h4>
                <div className="screen">All eyes here</div>
                <div className="seat-grid">{renderSeats()}</div>
                <div className="seat-legend">
                  <div className="legend-item">
                    <span className="seat available"></span> Available
                  </div>
                  <div className="legend-item">
                    <span className="seat selected"></span> Selected
                  </div>
                  <div className="legend-item">
                    <span className="seat booked"></span> Booked
                  </div>
                </div>
              </div>
              {selectedSeats.length > 0 && (
                <div className="booking-form">
                  <h4 className="animated-heading">Enter Your Details</h4>
                  <input
                    type="text"
                    placeholder="Enter your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                  <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <button onClick={handleBooking} className="book-button">
                    Book Ticket
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      )}

      {booked && (
        <div className="booking-success">
          <h4 className="animated-heading">Booking Confirmed!</h4>
          <p>
            Your ticket for <strong>{selectedMovie.title}</strong> at {selectedTime} has been successfully booked!
          </p>
          <p>
            Seats: <strong>{selectedSeats.join(", ")}</strong>
          </p>
          <button className="back-button" onClick={handleBack}>
            Book Another Ticket
          </button>
        </div>
      )}
    </div>
  );
}

export default function App() {
  return (
    <div className="App">
      <Header />
      <main className="main-content">
        <BookingSection />
      </main>
      <Footer />
    </div>
  );
}