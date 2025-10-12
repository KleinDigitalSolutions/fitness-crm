'use client';

import React from 'react';

interface RootClientLayoutProps {
  children: React.ReactNode;
}

const RootClientLayout: React.FC<RootClientLayoutProps> = ({ children }) => {
  return <>{children}</>;
};

export default RootClientLayout;
