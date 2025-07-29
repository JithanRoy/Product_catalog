'use client';

interface ErrorFallbackProps {
  message?: string;
}

export default function ErrorFallback({ message = "Something went wrong. Please try refreshing the page." }: ErrorFallbackProps) {
  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <div className="text-center py-12">
      <div className="text-red-500 text-lg mb-4">
        {message}
      </div>
      <button 
        onClick={handleRefresh}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
      >
        Refresh Page
      </button>
    </div>
  );
}