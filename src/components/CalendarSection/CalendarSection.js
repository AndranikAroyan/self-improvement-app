import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './CalendarSection.css';

const CalendarSection = () => {
  const [date, setDate] = useState(new Date());
  const [events, setEvents] = useState({});
  const [selectedSlots, setSelectedSlots] = useState([]);
  const [eventDetails, setEventDetails] = useState('');
  const [showSchedule, setShowSchedule] = useState(true); // State to toggle schedule visibility

  const handleDateChange = (newDate) => {
    setDate(newDate);
    setSelectedSlots([]);
    setEventDetails('');
  };

  const handleSlotClick = (hour) => {
    setSelectedSlots((prev) =>
      prev.includes(hour) ? prev.filter((h) => h !== hour) : [...prev, hour]
    );
  };

  const handleSaveEvent = () => {
    if (selectedSlots.length > 0 && eventDetails) {
      const newEvent = {
        slots: selectedSlots,
        details: eventDetails,
      };

      setEvents((prevEvents) => ({
        ...prevEvents,
        [date.toDateString()]: [
          ...(prevEvents[date.toDateString()] || []),
          newEvent,
        ],
      }));

      setEventDetails('');
      setSelectedSlots([]);
    }
  };

  const toggleSchedule = () => {
    setShowSchedule((prev) => !prev); // Toggle schedule visibility
  };

  return (
    <div className="dashboard-page">
      <div className={`google-calendar-layout ${!showSchedule ? 'centered' : ''}`}>
        {/* Left Side: Mini Calendar */}
        <div className={`mini-calendar ${!showSchedule ? 'expanded' : ''}`}>
          <Calendar
            onChange={handleDateChange}
            value={date}
            className="dashboard-calendar"
          />
          <button onClick={toggleSchedule} className="toggle-button">
            {showSchedule ? 'Hide Schedule' : 'Show Schedule'}
          </button>
        </div>

        {/* Right Side: Scrollable Schedule */}
        {showSchedule && (
          <div className="scrollable-schedule">
            <h3>Schedule for {date.toDateString()}</h3>
            <div className="hourly-grid">
              {[...Array(24).keys()].map((hour) => {
                const eventsForHour = events[date.toDateString()]?.filter((event) =>
                  event.slots.includes(hour)
                );
                return (
                  <div
                    key={hour}
                    className={`hour-slot ${
                      selectedSlots.includes(hour) ? 'selected' : ''
                    }`}
                    onClick={() => handleSlotClick(hour)}
                  >
                    <span>{hour}:00 - {hour + 1}:00</span>
                    {eventsForHour?.map((event, index) => (
                      <div key={index} className="event-note">
                        {event.details}
                      </div>
                    ))}
                  </div>
                );
              })}
            </div>
            {selectedSlots.length > 0 && (
              <div className="event-details">
                <textarea
                  placeholder="Add event details..."
                  value={eventDetails}
                  onChange={(e) => setEventDetails(e.target.value)}
                />
                <button onClick={handleSaveEvent}>Save Event</button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CalendarSection;