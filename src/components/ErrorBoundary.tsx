import React from 'react';

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  ErrorBoundaryState
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    // Surface the full error + component stack so issues aren't silently swallowed
    console.error('[ErrorBoundary] Caught a render error:', error, errorInfo.componentStack);
  }

  handleReset = (): void => {
    this.setState({ hasError: false, error: null });
  };

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
            An unexpected error occurred while rendering this page. You can try again, or reload
            if the problem continues.
          </p>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={this.handleReset}
              className="min-h-[44px] px-6 py-2.5 rounded-full bg-[#CCFF00] text-black font-black text-sm hover:bg-white transition-colors cursor-pointer"
            >
              Try Again
            </button>
            <button
              type="button"
              onClick={() => window.location.reload()}
              className="min-h-[44px] px-6 py-2.5 rounded-full bg-white/10 border border-white/20 text-white font-black text-sm hover:bg-white/20 transition-colors cursor-pointer"
            >
              Reload Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
