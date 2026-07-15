"use client";

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function ClientTracker() {
  const pathname = usePathname();

  useEffect(() => {
    // Generate a simple anonymous visitor ID and store in localStorage
    let visitorId = localStorage.getItem('visitor_id');
    if (!visitorId) {
      visitorId = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
      localStorage.setItem('visitor_id', visitorId);
    }

    const apiUrl = process.env.NEXT_PUBLIC_API_URL || '';
    
    // Fire and forget
    fetch(`${apiUrl}/api/track.php`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        path: pathname,
        visitor: visitorId
      })
    }).catch(() => {}); // ignore errors for tracking
    
  }, [pathname]);

  return null;
}
