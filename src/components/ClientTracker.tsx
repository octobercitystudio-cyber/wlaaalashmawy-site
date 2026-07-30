"use client";

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function ClientTracker() {
  const pathname = usePathname();

  useEffect(() => {
    // Generate an anonymous browser identifier. It is used only for aggregate
    // visit counts and can be removed by clearing this site's browser storage.
    let visitorId = localStorage.getItem('visitor_id');
    if (!visitorId) {
      visitorId =
        typeof crypto.randomUUID === 'function'
          ? crypto.randomUUID()
          : Array.from(crypto.getRandomValues(new Uint8Array(16)))
              .map((byte) => byte.toString(16).padStart(2, '0'))
              .join('');
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
