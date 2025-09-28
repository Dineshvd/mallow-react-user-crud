import { type ReactNode } from 'react';
import {
  ErrorBoundary as ReactErrorBoundary,
  type FallbackProps,
} from 'react-error-boundary';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

function Fallback({ error, resetErrorBoundary }: FallbackProps) {
  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <p>⚠️ Something went wrong: {error.message}</p>
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  );
}

export default function ErrorBoundary({ children, fallback }: Props) {
  return (
    <ReactErrorBoundary
      FallbackComponent={fallback ? () => <>{fallback}</> : Fallback}
      onReset={() => {
        window.location.reload();
      }}
    >
      {children}
    </ReactErrorBoundary>
  );
}
