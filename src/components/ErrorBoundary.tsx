import React from 'react';

interface ErrorBoundaryState {
  hasError: boolean;
}

export class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  ErrorBoundaryState
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#08090E] text-white flex flex-col items-center justify-center px-6 text-center gap-4">
          <div className="px-3 py-1 rounded-full bg-[#CCFF00] text-black text-xs font-black uppercase tracking-wider">
            Runtime Error
          </div>
          <h1 className="text-2xl sm:text-3xl font-black uppercase tracking-tight">
            Something went wrong
          </h1>
          <p className="text-sm text-white/75 max-w-md">
            An unexpected error occurred while rendering this page. Reload to restore the application.
          </p>
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="min-h-[44px] px-6 py-2.5 rounded-full bg-[#CCFF00] text-black font-black text-sm hover:bg-white transition-colors cursor-pointer"
          >
            Reload Page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
