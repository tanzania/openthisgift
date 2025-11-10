
import React from 'react';

export const BirthdayIcon: React.FC<{ className?: string }> = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
    <path d="m9 12-2 3h10l-2-3" />
    <path d="M12 17v4" />
    <path d="M12 3V1" />
  </svg>
);

export const ChristmasIcon: React.FC<{ className?: string }> = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2l4 4-4 4-4-4 4-4zM4.5 11l7.5 7.5L19.5 11" />
    <path d="M12 22V10" />
  </svg>
);

export const NewYearIcon: React.FC<{ className?: string }> = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 2L2 22" />
    <path d="M10 2v4" />
    <path d="M14 2v4" />
    <path d="M12 12l-2-2" />
    <path d="M12 12l2-2" />
    <path d="M12 12l-2 2" />
    <path d="M12 12l2 2" />
    <path d="M10 22v-4" />
    <path d="M14 22v-4" />
  </svg>
);

export const ValentineIcon: React.FC<{ className?: string }> = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
  </svg>
);

export const CongratsIcon: React.FC<{ className?: string }> = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s-8-4.5-8-11.8A8 8 0 0 1 12 2a8 8 0 0 1 8 8.2c0 7.3-8 11.8-8 11.8z" />
    <path d="m13.73 8.3-2.16 4.14-4.2.62 3.04 2.96-.72 4.18 3.74-1.97 3.74 1.97-.72-4.18 3.04-2.96-4.2-.62-2.16-4.14z" />
  </svg>
);
