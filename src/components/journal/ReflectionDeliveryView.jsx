import React, { useState, useEffect } from 'react';
import { useUserContext } from '@/context/UserContext';
import { useToneContext } from '@/context/ToneContext';
import { useNavigate } from 'react-router-dom';
import { getReflection } from '@/utils/reflectionUtils';  // Custom utility function to fetch reflections

const ReflectionDeliveryView = () => {
  const { userProfile, isLoading } = useUserContext();
  const { currentTone } = useToneContext();
  const navigate = useNavigate();

  const [reflection, setReflection] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isLoading) {
      return;
    }

    // Fetching reflection data
    const loadReflection = async () => {
      if (!userProfile) {
        navigate('/login');  // Redirect to login if no user profile is found
        return;
      }

      try {
        const reflectionData = await getReflection(userProfile.id, currentTone);
        setReflection(reflectionData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching reflection:', error);
        setLoading(false);
      }
    };

    loadReflection();
  }, [userProfile, currentTone, isLoading, navigate]);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading your reflection...</p>
      </div>
    );
  }

  if (!reflection) {
    return (
      <div>
        <p>No reflection found for this tone.</p>
      </div>
    );
  }

  return (
    <div className="reflection-delivery">
      <h1>Your Reflection</h1>
      <p>{reflection.text}</p>
      <button onClick={() => navigate('/next-step')}>Proceed to Next Step</button>
    </div>
  );
};

export default ReflectionDeliveryView;
