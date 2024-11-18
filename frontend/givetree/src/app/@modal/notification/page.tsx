import { ErrorBoundary } from 'next/dist/client/components/error-boundary';

import NotificationError from './error';
import Notification from './notification';

export default async function NotificationPage() {
  return (
    <ErrorBoundary errorComponent={NotificationError}>
      <Notification />;
    </ErrorBoundary>
  );
}

export const dynamic = 'force-dynamic';
