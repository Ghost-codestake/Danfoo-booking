import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { LogOut, CheckCircle } from "lucide-react";

const DanfooBooking = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Get username passed from login
  const userName = location.state?.userName || "User";

  // Notification state
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    // Show success notification on login
    setNotification(` Welcome ${userName}, you are logged in successfully!`);

    const timer = setTimeout(() => {
      setNotification(null);
    }, 3000);

    return () => clearTimeout(timer);
  }, [userName]);

  // Handle logout
  const handleLogout = () => {
    navigate("/"); 
  };

  // Available Trips Data
  const availableTrips = [
    { id: 1, route: "Lagos → Abuja", departure: "08:00 AM", price: "₦15,000" },
    { id: 2, route: "Lagos → Kano", departure: "10:30 AM", price: "₦18,500" },
    {
      id: 3,
      route: "Lagos → Port Harcourt",
      departure: "02:00 PM",
      price: "₦12,000",
    },
  ];

  // My Bookings Data
  const myBookings = [
    {
      id: "DNF001234",
      route: "Lagos → Abuja",
      travelDate: "Dec 25, 2024",
      status: "confirmed",
      price: "₦15,000",
    },
    {
      id: "DNF001235",
      route: "Abuja → Lagos",
      travelDate: "Dec 30, 2024",
      status: "pending",
      price: "₦15,000",
    },
  ];

  // Booking History Data
  const bookingHistory = [
    {
      id: "DNF001230",
      route: "Lagos → Ibadan",
      travelDate: "Dec 15, 2024",
      status: "completed",
      price: "₦8,000",
    },
    {
      id: "DNF001225",
      route: "Kano → Kaduna",
      travelDate: "Nov 28, 2024",
      status: "cancelled",
      price: "₦10,500",
    },
    {
      id: "DNF001220",
      route: "Abuja → Jos",
      travelDate: "Nov 10, 2024",
      status: "completed",
      price: "₦7,500",
    },
  ];

  return (
    <div className="danfoo-app">
      {/* ✅ Notification */}
      {notification && (
        <div className="danfoo-notification success">
          <CheckCircle size={18} /> <span>{notification}</span>
        </div>
      )}

      {/* Header */}
      <header className="danfoo-header">
        <div className="danfoo-logo">Danfoo</div>
        <div className="danfoo-user">
          <span className="danfoo-username">Hello, {userName}</span>
          <button className="danfoo-logout-btn" onClick={handleLogout}>
            <LogOut size={18} /> Logout
          </button>
        </div>
      </header>

      <div className="danfoo-container">
        {/* Find Your Trip Section */}
        <section className="danfoo-section">
          <h2 className="danfoo-section-title">Find Your Trip</h2>
          <div className="danfoo-trip-form">
            <div className="danfoo-form-group">
              <label htmlFor="from">From</label>
              <input type="text" id="from" placeholder="Enter departure city" />
            </div>
            <div className="danfoo-form-group">
              <label htmlFor="to">To</label>
              <input type="text" id="to" placeholder="Enter destination city" />
            </div>
            <div className="danfoo-form-group">
              <label htmlFor="travel-date">Travel Date</label>
              <input type="date" id="travel-date" />
            </div>
            <div className="danfoo-form-group">
              <button className="danfoo-search-btn">Search Trips</button>
            </div>
          </div>
        </section>

        {/* Available Trips Section */}
        <section className="danfoo-section">
          <h2 className="danfoo-section-title">Available Trips</h2>
          {availableTrips.map((trip) => (
            <div key={trip.id} className="danfoo-trip-card">
              <div className="danfoo-trip-info">
                <div className="danfoo-trip-route">{trip.route}</div>
                <div className="danfoo-trip-time">
                  Departure: {trip.departure}
                </div>
                <div className="danfoo-trip-price">{trip.price}</div>
                <button className="danfoo-book-btn">Book Now</button>
              </div>
            </div>
          ))}
        </section>

        {/* My Bookings Section */}
        <section className="danfoo-section">
          <h2 className="danfoo-section-title">My Bookings</h2>
          <button className="danfoo-refresh-btn">Refresh</button>
          {myBookings.map((booking) => (
            <div key={booking.id} className="danfoo-booking-card">
              <div className="danfoo-booking-info">
                <div className="danfoo-booking-details">
                  <h3>{booking.route}</h3>
                  <p>Travel Date: {booking.travelDate}</p>
                  <p>Booking ID: {booking.id}</p>
                </div>
                <div className="danfoo-booking-meta">
                  <div
                    className={`danfoo-booking-status danfoo-status-${booking.status}`}
                  >
                    {booking.status.charAt(0).toUpperCase() +
                      booking.status.slice(1)}
                  </div>
                  <p className="danfoo-booking-price">{booking.price}</p>
                </div>
              </div>
            </div>
          ))}
        </section>

        {/* Booking History Section */}
        <section className="danfoo-section">
          <h2 className="danfoo-section-title">Booking History</h2>
          {bookingHistory.map((booking) => (
            <div key={booking.id} className="danfoo-booking-card">
              <div className="danfoo-booking-info">
                <div className="danfoo-booking-details">
                  <h3>{booking.route}</h3>
                  <p>Travel Date: {booking.travelDate}</p>
                  <p>Booking ID: {booking.id}</p>
                </div>
                <div className="danfoo-booking-meta">
                  <div
                    className={`danfoo-booking-status danfoo-status-${booking.status}`}
                  >
                    {booking.status.charAt(0).toUpperCase() +
                      booking.status.slice(1)}
                  </div>
                  <p className="danfoo-booking-price">{booking.price}</p>
                </div>
              </div>
            </div>
          ))}
        </section>
      </div>

      {/* Footer */}
      <footer className="danfoo-footer">
        <p>&copy; 2024 Danfoo Bus Booking System. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default DanfooBooking;
