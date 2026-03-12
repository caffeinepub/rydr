import React from "react";

interface ChunkErrorState {
  hasError: boolean;
  retried: boolean;
  retryKey: number;
}

export class ChunkErrorBoundary extends React.Component<
  React.PropsWithChildren,
  ChunkErrorState
> {
  constructor(props: React.PropsWithChildren) {
    super(props);
    this.state = { hasError: false, retried: false, retryKey: 0 };
  }

  static getDerivedStateFromError(): Partial<ChunkErrorState> {
    return { hasError: true };
  }

  componentDidCatch(error: Error) {
    const isChunkError =
      error.message.includes("Failed to fetch") ||
      error.message.includes("Loading chunk") ||
      error.message.includes("dynamically imported module");

    // Auto-retry once on chunk load errors
    if (isChunkError && !this.state.retried) {
      setTimeout(() => {
        this.setState((prev) => ({
          hasError: false,
          retried: true,
          retryKey: prev.retryKey + 1,
        }));
      }, 100);
    }
  }

  handleRetry = () => {
    this.setState((prev) => ({
      hasError: false,
      retryKey: prev.retryKey + 1,
    }));
  };

  render() {
    if (this.state.hasError) {
      return (
        <div
          className="min-h-[60vh] flex items-center justify-center p-4"
          data-ocid="chunk.error_state"
        >
          <div className="max-w-sm w-full text-center">
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4"
              style={{ backgroundColor: "rgba(0,174,239,0.12)" }}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="#00AEEF"
                strokeWidth={2}
                aria-hidden="true"
                role="img"
              >
                <title>Retry</title>
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                />
              </svg>
            </div>
            <h3
              className="font-bold mb-2"
              style={{ color: "var(--foreground, #fff)" }}
            >
              This page failed to load
            </h3>
            <p
              className="text-sm mb-5"
              style={{
                color: "var(--muted-foreground, rgba(255,255,255,0.5))",
              }}
            >
              Please refresh the page to try again.
            </p>
            <div className="flex flex-col gap-2">
              <button
                type="button"
                onClick={this.handleRetry}
                className="px-4 py-2 rounded-lg text-sm font-semibold"
                style={{ backgroundColor: "#00AEEF", color: "#fff" }}
                data-ocid="chunk.error_state.primary_button"
              >
                Retry
              </button>
              <div className="flex gap-2 justify-center">
                <a
                  href="/"
                  className="text-sm underline"
                  style={{ color: "#00AEEF" }}
                  data-ocid="chunk.error_state.link"
                >
                  Go to Home
                </a>
                <span style={{ color: "rgba(255,255,255,0.3)" }}>·</span>
                <a
                  href="/dashboard"
                  className="text-sm underline"
                  style={{ color: "#00AEEF" }}
                  data-ocid="chunk.error_state.secondary_button"
                >
                  Go to Dashboard
                </a>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return (
      <React.Fragment key={this.state.retryKey}>
        {this.props.children}
      </React.Fragment>
    );
  }
}
