'use client';

export default function PostError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div>
      {error.digest} <button onClick={reset}>rest</button>
    </div>
  );
}
