// utils/journalUtils.js

// Fetch journal entries from the backend
export const getJournalEntries = async (userId) => {
  try {
    const response = await fetch(`/api/journal-entries?user_id=${userId}`);
    const data = await response.json();
    return data.entries;  // Assuming the entries are under "entries" key
  } catch (error) {
    console.error('Error fetching journal entries:', error);
    throw error;
  }
};

// Create a new journal entry
export const createJournalEntry = async (userId, text) => {
  try {
    const response = await fetch('/api/journal-entries', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ user_id: userId, text }),
    });
    const data = await response.json();
    return data.entry;  // Assuming the created entry is returned under "entry" key
  } catch (error) {
    console.error('Error creating journal entry:', error);
    throw error;
  }
};

// Delete a journal entry
export const deleteJournalEntry = async (entryId) => {
  try {
    const response = await fetch(`/api/journal-entries/${entryId}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Failed to delete journal entry');
    }
  } catch (error) {
    console.error('Error deleting journal entry:', error);
    throw error;
  }
};
