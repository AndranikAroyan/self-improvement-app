// src/pages/JournalingPage/JournalingPage.js
import React, { useState, useEffect } from 'react';
import { saveJournal, getJournals } from '../../services/journalService';
import './JournalingPage.css';

const JournalingPage = () => {
  const [journals, setJournals] = useState([]);
  const [newJournal, setNewJournal] = useState('');

  useEffect(() => {
    const fetchJournals = async () => {
      try {
        const fetchedJournals = await getJournals();
        setJournals(fetchedJournals);
      } catch (error) {
        console.error('Error fetching journals:', error);
      }
    };

    fetchJournals();
  }, []);

  const handleSaveJournal = async () => {
    if (newJournal.trim()) {
      try {
        await saveJournal({ content: newJournal });
        setNewJournal('');
        const updatedJournals = await getJournals();
        setJournals(updatedJournals);
      } catch (error) {
        console.error('Error saving journal:', error);
      }
    }
  };

  return (
    <div className="journaling-page-container">
      <h2>Journaling</h2>
      <div className="journals-list">
        {journals.map((journal) => (
          <div key={journal.id} className="journal-entry">
            <p>{journal.content}</p>
            <small>{new Date(journal.date).toLocaleString()}</small>
          </div>
        ))}
      </div>

      <textarea
        value={newJournal}
        onChange={(e) => setNewJournal(e.target.value)}
        placeholder="Write your journal entry..."
      ></textarea>
      <button onClick={handleSaveJournal}>Save Journal</button>
    </div>
  );
};

export default JournalingPage;
