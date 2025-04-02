import React, { useState, useEffect } from 'react';
import { useUserContext } from '@/context/UserContext';
import { getJournalEntries, createJournalEntry } from '@/utils/journalUtils'; // Utility functions for journal handling
import { useNavigate } from 'react-router-dom';

const JournalTab = () => {
  const { userProfile, isLoading } = useUserContext();
  const [journalEntries, setJournalEntries] = useState([]);
  const [newEntryText, setNewEntryText] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoading) {
      return;
    }

    // Fetch journal entries
    const loadJournalEntries = async () => {
      if (!userProfile) {
        navigate('/login');  // Redirect to login if no user profile is found
        return;
      }

      try {
        const entriesData = await getJournalEntries(userProfile.id);
        setJournalEntries(entriesData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching journal entries:', error);
        setLoading(false);
      }
    };

    loadJournalEntries();
  }, [userProfile, isLoading, navigate]);

  const handleAddEntry = async () => {
    if (newEntryText.trim() === '') return; // Do nothing if entry text is empty

    try {
      const newEntry = await createJournalEntry(userProfile.id, newEntryText);
      setJournalEntries([newEntry, ...journalEntries]);
      setNewEntryText(''); // Clear the input after adding
    } catch (error) {
      console.error('Error creating journal entry:', error);
    }
  };

  const handleDeleteEntry = async (entryId) => {
    try {
      await deleteJournalEntry(entryId); // Implement deleteJournalEntry as a utility
      setJournalEntries(journalEntries.filter(entry => entry.id !== entryId));
    } catch (error) {
      console.error('Error deleting journal entry:', error);
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading journal entries...</p>
      </div>
    );
  }

  return (
    <div className="journal-tab">
      <h1>Your Journal</h1>
      <textarea
        value={newEntryText}
        onChange={(e) => setNewEntryText(e.target.value)}
        placeholder="Write a new journal entry..."
        rows={5}
        className="journal-input"
      />
      <button onClick={handleAddEntry} className="add-entry-button">
        Add Entry
      </button>

      {journalEntries.length === 0 ? (
        <p>No journal entries yet. Start your journey!</p>
      ) : (
        <div className="journal-entries-list">
          {journalEntries.map((entry) => (
            <div key={entry.id} className="journal-entry-card">
              <p>{entry.text}</p>
              <button onClick={() => handleDeleteEntry(entry.id)} className="delete-entry-button">
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default JournalTab;
