// FIX: Import React to resolve the error "Cannot find namespace 'React'".
import React from 'react';

export interface Theme {
  id: string;
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  gradient: string;
  textColor: string;
  greeting: (receiverName: string) => string;
  musicSrc: string;
  ogImage: string;
}