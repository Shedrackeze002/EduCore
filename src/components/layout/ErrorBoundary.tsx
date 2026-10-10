import { Component, type ReactNode } from 'react';

export class ErrorBoundary extends Component<{ children: ReactNode }, { error: Error | null }> {
  state = { error: null as Error | null };

  static getDerivedStateFromError(error: Error) {
    return { error };
  }

  componentDidCatch(error: Error) {
    console.error(error);
  }

  render() {
    if (!this.state.error) return this.props.children;
    const chunk = /Loading chunk|dynamically imported module|Failed to fetch/i.test(this.state.error.message);
    return (
      <div className="flex min-h-[70vh] items-center justify-center p-6">
        <div className="card max-w-md p-6 text-center">
          <h1 className="text-xl font-semibold">{chunk ? 'EduCore was updated' : 'Something went wrong'}</h1>
          <p className="mt-2 text-sm text-ink-3">{chunk ? 'A newer version is available. Reload to continue.' : this.state.error.message}</p>
          <button type="button" className="mt-4 rounded-xl bg-brand px-4 py-2 font-medium text-brand-ink" onClick={() => window.location.reload()}>
            Reload
          </button>
        </div>
      </div>
    );
  }
}
