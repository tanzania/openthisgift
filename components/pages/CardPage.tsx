import React, { useState, useMemo, useRef, useEffect } from 'react';
import { useSearchParams, useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { THEMES } from '../../constants';
import type { Theme } from '../../types';
import { GiftIcon, Volume2Icon, VolumeXIcon, WhatsAppIcon } from '../icons/UIIcons';

const CardPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const { senderName } = useParams<{ senderName?: string }>();
  const [isOpened, setIsOpened] = useState(false);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  
  const unslugifyName = (slug: string = '') => {
    return slug
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
  };

  const { from, to, themeId } = useMemo(() => ({
    from: senderName ? unslugifyName(senderName) : 'A secret admirer',
    to: searchParams.get('to') || 'You',
    themeId: searchParams.get('theme') || 'birthday',
  }), [searchParams, senderName]);

  const theme: Theme | undefined = useMemo(() => THEMES.find(t => t.id === themeId), [themeId]);

  useEffect(() => {
    // Update meta tags for social sharing previews (client-side)
    if (theme) {
      document.title = `${to}, you have a message from ${from}!`;
      
      const setMetaTag = (property: string, content: string) => {
        let element = document.querySelector(`meta[property="${property}"]`);
        if (element) {
          element.setAttribute('content', content);
        }
      };
      
      setMetaTag('og:title', `🎁 ${from} sent you a surprise!`);
      setMetaTag('og:description', `Tap to open your special message.`);
      setMetaTag('og:image', theme.ogImage);
      setMetaTag('og:url', window.location.href);
    }
  }, [theme, from, to]);

  useEffect(() => {
    if (isOpened && audioRef.current) {
      audioRef.current.play().then(() => {
        setIsMusicPlaying(true);
      }).catch(error => console.error("Audio playback failed:", error));
    }
  }, [isOpened]);

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isMusicPlaying) {
        audioRef.current.pause();
        setIsMusicPlaying(false);
      } else {
        audioRef.current.play();
        setIsMusicPlaying(true);
      }
    }
  };

  if (!theme) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100 text-red-500">
        Oops! This greeting card is not available.
      </div>
    );
  }

  return (
    <div className={`w-screen h-screen overflow-hidden transition-colors duration-1000 bg-gradient-to-br ${theme.gradient}`}>
      <AnimatePresence>
        {!isOpened ? (
          <motion.div
            key="pre-open"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.5 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 flex flex-col items-center justify-center text-center p-4 cursor-pointer"
            onClick={() => setIsOpened(true)}
          >
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
            >
              <GiftIcon className={`w-24 h-24 ${theme.textColor}`} />
            </motion.div>
            <h2 className={`mt-6 text-3xl font-semibold ${theme.textColor}`}>A special message for you!</h2>
            <p className={`mt-2 text-lg ${theme.textColor} opacity-80`}>Touch to open your gift 🎁</p>
          </motion.div>
        ) : (
          <motion.div
            key="post-open"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="absolute inset-0 flex flex-col items-center justify-center text-center p-6"
          >
            <div className="w-full max-w-md">
              <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.3, type: 'spring', stiffness: 120 }}
                className="mb-8"
              >
                <theme.icon className={`w-20 h-20 mx-auto ${theme.textColor}`} />
              </motion.div>

              <motion.h1
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.7 }}
                className={`font-pacifico text-4xl md:text-5xl lg:text-6xl ${theme.textColor} drop-shadow-lg`}
              >
                {theme.greeting(to)}
              </motion.h1>

              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.9, duration: 0.7 }}
                className={`mt-6 text-xl md:text-2xl ${theme.textColor} opacity-90`}
              >
                From, <span className="font-semibold">{from}</span>
              </motion.p>
            </div>
            
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5, duration: 1 }}
                className="absolute bottom-6 left-6 right-6 flex justify-center items-center"
            >
                <a
                    href={`https://wa.me/?text=${encodeURIComponent(`Create your own surprise gift card! It's fun and takes just 10 seconds: ${window.location.origin}`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-green-500 text-white font-bold py-3 px-6 rounded-full hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-white transition-transform transform hover:scale-105 duration-300 flex items-center space-x-3"
                >
                    <WhatsAppIcon className="w-6 h-6"/>
                    <span>Send to WhatsApp</span>
                </a>
            </motion.div>
            
          </motion.div>
        )}
      </AnimatePresence>
      {isOpened && (
         <button
            onClick={toggleMusic}
            className="absolute top-4 right-4 bg-black/20 text-white rounded-full p-3 hover:bg-black/40 transition-colors"
            aria-label="Toggle Music"
        >
            {isMusicPlaying ? <Volume2Icon className="w-6 h-6" /> : <VolumeXIcon className="w-6 h-6" />}
        </button>
      )}

      <audio ref={audioRef} src={theme.musicSrc} loop preload="auto" />
    </div>
  );
};

export default CardPage;