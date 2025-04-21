import React from 'react';
import Image from 'next/image';

export default function Loading() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white">
      <div className="relative w-32 h-32 mb-6 animate-pulse">
        <Image
          src="/logo.svg"
          alt="Equipe Logo"
          fill
          className="object-contain"
          priority
          sizes="128px"
        />
      </div>
      
      <div className="animate-spin w-12 h-12 border-4 border-primary-500 rounded-full border-t-transparent mb-6"></div>
      
      <p className="text-gray-600">Loading Equipe Healthcare Solutions...</p>
    </div>
  );
}