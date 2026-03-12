import React from "react";

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends React.Component<
  React.PropsWithChildren,
  ErrorBoundaryState
> {
  constructor(props: React.PropsWithChildren) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error("[ErrorBoundary] Uncaught error:", error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div
          className="min-h-screen flex items-center justify-center p-4"
          style={{ backgroundColor: "#071A2F" }}
          data-ocid="app.error_state"
        >
          <div
            className="max-w-md w-full rounded-xl p-8 text-center"
            style={{
              backgroundColor: "#0B2A4A",
              border: "1px solid rgba(0,174,239,0.25)",
              boxShadow: "0 0 30px rgba(0,174,239,0.1)",
            }}
          >
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
              style={{ backgroundColor: "rgba(0,174,239,0.15)" }}
            >
              <svg
                className="w-8 h-8"
                fill="none"
                viewBox="0 0 24 24"
                stroke="#00AEEF"
                strokeWidth={2}
                aria-hidden="true"
                role="img"
              >
                <title>Warning</title>
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
            </div>
            <h2
              className="text-xl font-black mb-2"
              style={{
                color: "#fff",
                fontFamily: '"Plus Jakarta Sans", system-ui, sans-serif',
              }}
            >
              Something went wrong
            </h2>
            <p
              className="text-sm mb-6"
              style={{ color: "rgba(255,255,255,0.6)" }}
            >
              Please refresh the page to continue.
            </p>
            <div className="flex gap-3 justify-center">
              <button
                type="button"
                onClick={() => window.location.reload()}
                className="px-4 py-2 rounded-lg text-sm font-semibold transition-all"
                style={{
                  backgroundColor: "#00AEEF",
                  color: "#fff",
                }}
                data-ocid="app.error_state.primary_button"
              >
                Refresh Page
              </button>
              <button
                type="button"
                onClick={() => {
                  window.location.href = "/";
                }}
                className="px-4 py-2 rounded-lg text-sm font-semibold transition-all"
                style={{
                  backgroundColor: "rgba(255,255,255,0.08)",
                  color: "rgba(255,255,255,0.85)",
                  border: "1px solid rgba(255,255,255,0.15)",
                }}
                data-ocid="app.error_state.secondary_button"
              >
                Go Home
              </button>
            </div>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
