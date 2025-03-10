import React, { useState, useEffect } from 'react';
import './Journaling.css';
import { saveJournal, getJournals } from '../../services/journalService'; // Import journal service

const Journaling = () => {
  const [journalEntries, setJournalEntries] = useState({
    gratitude: '',
    achievements: '',
    challenges: '',
    growth: '',
    reflection: '',
  });

  const [oldJournals, setOldJournals] = useState([]); // Store old journals

  // Fetch old journals when the component mounts
  useEffect(() => {
    const fetchJournals = async () => {
      try {
        const journals = await getJournals(); // Fetch journals from the database
        setOldJournals(journals);
      } catch (error) {
        console.error('Error fetching journals:', error);
      }
    };

    fetchJournals();
  }, []);

  const handleInputChange = (e, field) => {
    setJournalEntries({
      ...journalEntries,
      [field]: e.target.value,
    });
  };

  const handleSaveJournal = async () => {
    try {
      // Save journal entries to the database
      await saveJournal(journalEntries);
      alert('Journal saved successfully!');

      // Fetch updated journals after saving
      const journals = await getJournals();
      setOldJournals(journals);

      // Clear the input fields
      setJournalEntries({
        gratitude: '',
        achievements: '',
        challenges: '',
        growth: '',
        reflection: '',
      });
    } catch (error) {
      console.error('Error saving journal:', error);
      alert('Failed to save journal. Please try again.');
    }
  };

  return (
    <div className="journaling-container">
      <h2 className="journaling-heading">Daily Journaling</h2>
      <div className="journaling-questions">
        {/* Gratitude */}
        <div className="journaling-question">
          <label>What am I grateful for today?</label>
          <textarea
            value={journalEntries.gratitude}
            onChange={(e) => handleInputChange(e, 'gratitude')}
            placeholder="Write your thoughts..."
          />
        </div>

        {/* Achievements */}
        <div className="journaling-question">
          <label>What did I accomplish today?</label>
          <textarea
            value={journalEntries.achievements}
            onChange={(e) => handleInputChange(e, 'achievements')}
            placeholder="Write your thoughts..."
          />
        </div>

        {/* Challenges */}
        <div className="journaling-question">
          <label>What challenges did I face today?</label>
          <textarea
            value={journalEntries.challenges}
            onChange={(e) => handleInputChange(e, 'challenges')}
            placeholder="Write your thoughts..."
          />
        </div>

        {/* Growth */}
        <div className="journaling-question">
          <label>What did I learn today?</label>
          <textarea
            value={journalEntries.growth}
            onChange={(e) => handleInputChange(e, 'growth')}
            placeholder="Write your thoughts..."
          />
        </div>

        {/* Reflection */}
        <div className="journaling-question">
          <label>How do I feel about today overall?</label>
          <textarea
            value={journalEntries.reflection}
            onChange={(e) => handleInputChange(e, 'reflection')}
            placeholder="Write your thoughts..."
          />
        </div>
      </div>

      {/* Save Button */}
      <button onClick={handleSaveJournal} className="journaling-save-button">
        Save Journal
      </button>

      {/* Display Old Journals */}
      <div className="old-journals">
        <h3>Past Journals</h3>
        {oldJournals.length > 0 ? (
          oldJournals.map((journal, index) => (
            <div key={index} className="journal-entry">
              <p><strong>Date:</strong> {new Date(journal.date).toLocaleDateString()}</p>
              <p><strong>Gratitude:</strong> {journal.gratitude}</p>
              <p><strong>Achievements:</strong> {journal.achievements}</p>
              <p><strong>Challenges:</strong> {journal.challenges}</p>
              <p><strong>Growth:</strong> {journal.growth}</p>
              <p><strong>Reflection:</strong> {journal.reflection}</p>
              <hr />
            </div>
          ))
        ) : (
          <p>No past journals found.</p>
        )}
      </div>
    </div>
  );
};

export default Journaling;