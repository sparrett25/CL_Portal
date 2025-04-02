import React, { useState, useEffect } from 'react';
import { useUserContext } from '@/context/UserContext';
import { useNavigate } from 'react-router-dom';
import { getArchivedReflections } from '@/utils/reflectionUtils';  // Utility function for fetching archived reflections

const ReflectionArchiveView = () => {
  const { userProfile, isLoading } = useUserContext();
  const navigate = useNavigate();
  
  const [archivedReflections, setArchivedReflections] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    if (isLoading) {
      return;
    }

    // Fetch archived reflections
    const loadArchivedReflections = async () => {
      if (!userProfile) {
        navigate('/login');  // Redirect to login if no user profile is found
        return;
      }

      try {
        const reflectionsData = await getArchivedReflections(userProfile.id);
        setArchivedReflections(reflectionsData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching archived reflections:', error);
        setLoading(false);
      }
    };

    loadArchivedReflections();
  }, [userProfile, isLoading, navigate]);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading archived reflections...</p>
      </div>
    );
  }

  if (!archivedReflections || archivedReflections.length === 0) {
    return (
      <div>
        <h2>No archived reflections found</h2>
        <p>It seems like you don't have any reflections saved yet. Start your journey!</p>
      </div>
    );
  }

  return (
    <div className="reflection-archive-view">
      <h1>Your Reflection Archive</h1>
      <div className="reflection-list">
        {archivedReflections.map((reflection, index) => (
          <div key={index} className="reflection-card">
            <h3>{reflection.title}</h3>
            <p>{reflection.text}</p>
            <button onClick={() => navigate(`/reflection/${reflection.id}`)}>View Details</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReflectionArchiveView;
