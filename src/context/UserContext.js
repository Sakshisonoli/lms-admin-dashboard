import React, { createContext, useContext, useState, useEffect } from 'react';

const UserContext = createContext();

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

export const UserProvider = ({ children }) => {
  const [userContext, setUserContext] = useState(null); // Start with null to indicate loading
  const [isLoading, setIsLoading] = useState(true);

  // Load user context from localStorage on mount
  useEffect(() => {
    const storedUserType = localStorage.getItem('userType');
    const storedUserData = localStorage.getItem('userData');
    
    if (storedUserType && storedUserData) {
      try {
        const userData = JSON.parse(storedUserData);
        setUserContext({
          userType: storedUserType,
          ...userData,
        });
      } catch (error) {
        console.error('Error parsing user data:', error);
        // Set default admin context if parsing fails
        setUserContext({
          userType: 'admin',
          userId: 1,
          name: 'Admin User',
          email: 'admin@army.gov.in',
          assignedBatch: null,
          assignedBatches: [],
        });
      }
    } else {
      // Set default admin context if no stored data
      setUserContext({
        userType: 'admin',
        userId: 1,
        name: 'Admin User',
        email: 'admin@army.gov.in',
        assignedBatch: null,
        assignedBatches: [],
      });
    }
    setIsLoading(false);
  }, []);

  // Update user context (call this after login)
  const updateUserContext = (newContext) => {
    setUserContext(newContext);
    localStorage.setItem('userType', newContext.userType);
    localStorage.setItem('userData', JSON.stringify(newContext));
  };

  // Check if user can access a specific batch
  const canAccessBatch = (batch) => {
    if (!userContext) return false;
    
    if (userContext.userType === 'admin') {
      return true; // Admins can access all batches
    }
    
    if (userContext.userType === 'student') {
      return userContext.assignedBatch === batch;
    }
    
    if (userContext.userType === 'teacher') {
      return userContext.assignedBatches && userContext.assignedBatches.includes(batch);
    }
    
    return false;
  };

  // Filter data based on user access
  const filterByAccess = (items, getBatchFn) => {
    if (!userContext) return [];
    
    if (userContext.userType === 'admin') {
      return items; // Admins see everything
    }
    
    return items.filter(item => {
      const itemBatch = getBatchFn(item);
      
      if (userContext.userType === 'student') {
        // Handle both single batch and array of batches
        if (Array.isArray(itemBatch)) {
          return itemBatch.includes(userContext.assignedBatch);
        }
        return itemBatch === userContext.assignedBatch;
      }
      
      if (userContext.userType === 'teacher') {
        // Handle both single batch and array of batches
        if (Array.isArray(itemBatch)) {
          return itemBatch.some(batch => userContext.assignedBatches && userContext.assignedBatches.includes(batch));
        }
        return userContext.assignedBatches && userContext.assignedBatches.includes(itemBatch);
      }
      
      return false;
    });
  };

  // Get accessible batches for current user
  const getAccessibleBatches = () => {
    if (!userContext) return [];
    
    if (userContext.userType === 'admin') {
      return ['Commando', 'Platoon Commander']; // All batches
    }
    
    if (userContext.userType === 'student') {
      return userContext.assignedBatch ? [userContext.assignedBatch] : [];
    }
    
    if (userContext.userType === 'teacher') {
      return userContext.assignedBatches || [];
    }
    
    return [];
  };

  const value = {
    userContext,
    updateUserContext,
    canAccessBatch,
    filterByAccess,
    getAccessibleBatches,
    isLoading,
  };

  // Show loading state while initializing
  if (isLoading) {
    return null; // or a loading spinner
  }

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
