'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

interface VideoSectionProps {
  videoThumbnail?: string;
  videoUrl?: string;
}

const VideoSection: React.FC<VideoSectionProps> = ({
  videoThumbnail = '/images/img_group_176.png',
  videoUrl = 'https://www.youtube.com/watch?v=psnDFw7_nKo' 
}) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlay = () => {
    setIsPlaying(true);
  };

  return (
    <section className="relative py-24">
      {/* Background image */}
      <div className="absolute inset-0 z-0 bg-darkBlue">
        <Image
          src="/images/img_group_177.png"
          alt="Background Pattern"
          fill
          className="object-cover opacity-30"
        />
      </div>

      {/* Video container */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="relative aspect-video rounded-xl overflow-hidden shadow-2xl">
            {!isPlaying ? (
              <>
                {/* Thumbnail */}
                <Image
                  src={videoThumbnail}
                  alt="Video Thumbnail"
                  fill
                  className="object-cover"
                />
                
                {/* Overlay with logo */}
                <div className="absolute inset-0 bg-darkBlue bg-opacity-20 flex items-center justify-center">
                  <div className="relative h-16 w-32 md:h-20 md:w-40">
                    <Image
                      src="/images/img_blue_4.png"
                      alt="Equipo Logo"
                      fill
                      className="object-contain opacity-70"
                    />
                  </div>
                </div>
                
                {/* Play button */}
                <motion.button
                  className="absolute inset-0 m-auto w-20 h-20 rounded-full bg-white bg-opacity-20 flex items-center justify-center cursor-pointer z-10"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handlePlay}
                >
                  <div className="w-16 h-16 rounded-full bg-primary-500 flex items-center justify-center">
                    <svg 
                      className="w-8 h-8 text-white ml-1" 
                      viewBox="0 0 24 24" 
                      fill="currentColor"
                    >
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </motion.button>
              </>
            ) : (
              // Embedded video player (iframe)
              <iframe
                src={videoUrl}
                className="absolute inset-0 w-full h-full"
                title="Equipo Healthcare Video"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default VideoSection;