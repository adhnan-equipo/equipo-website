// src/components/ui/FirebaseConnectionStatus.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { checkFirebaseConnection } from '@/lib/firebase';

const FirebaseConnectionStatus: React.FC = () => {
  const [connectionStatus, setConnectionStatus] = useState<'connecting' | 'connected' | 'disconnected'>('connecting');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const checkConnection = async () => {
      try {
        const isConnected = await checkFirebaseConnection();
        setConnectionStatus(isConnected ? 'connected' : 'disconnected');
      } catch (err) {
        setConnectionStatus('disconnected');
        setError(err instanceof Error ? err.message : 'Unknown error');
        console.error('Firebase connection check failed:', err);
      }
    };

    checkConnection();

    // Check connection every 30 seconds
    const intervalId = setInterval(checkConnection, 30000);
    
    return () => clearInterval(intervalId);
  }, []);

  // Only show in development
  if (process.env.NODE_ENV !== 'development') {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 p-3 rounded-lg shadow-lg bg-white border text-sm">
      <div className="flex items-center gap-2">
        <div 
          className={`w-3 h-3 rounded-full ${
            connectionStatus === 'connected' 
              ? 'bg-green-500' 
              : connectionStatus === 'connecting' 
                ? 'bg-yellow-500'
                : 'bg-red-500'
          }`} 
        />
        <div>
          <p className="font-medium">
            Firebase: {
              connectionStatus === 'connected' 
                ? 'Connected' 
                : connectionStatus === 'connecting' 
                  ? 'Connecting...'
                  : 'Disconnected'
            }
          </p>
          {error && <p className="text-xs text-red-500">{error}</p>}
        </div>
      </div>
    </div>
  );
};

export default FirebaseConnectionStatus;