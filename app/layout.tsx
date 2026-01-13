import './globals.css';
import { ReactNode } from 'react';

export const metadata = {
  title: 'Smørski',
  description: 'Smørski nettside',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="no">
      <body>{children}</body>
    </html>
  );
}
