// utils/reflectionUtils.js
export const getReflection = async (userId, tone) => {
  try {
    // Fetch reflection based on user profile and current tone
    const response = await fetch(`/api/reflections?user_id=${userId}&tone=${tone}`);
    const data = await response.json();

    if (response.ok) {
      return data.reflection;  // Assuming the reflection is under "reflection" key
    } else {
      throw new Error(data.message || 'Error fetching reflection');
    }
  } catch (error) {
    console.error('Error fetching reflection:', error);
    throw error;  // Rethrow to be caught in the component
  }
};
