// app/competition/[competitionId]/error.tsx
'use client';

import { useEffect } from 'react';

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div>
      <h2 style={{ lineHeight: 1, width: '400px', height: '400px', fontSize: '40px' }}>
        Something went wrong!
      </h2>
      <button
        style={{ lineHeight: 1, width: '400px', height: '400px', fontSize: '40px' }}
        onClick={() => reset()}
      >
        Try again
      </button>
    </div>
  );
}
