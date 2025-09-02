import React from "react";

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, info: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    // log to console and keep the UI visible
    console.error("Uncaught error in component tree:", error, info);
    this.setState({ info });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: 20, color: '#b91c1c', background: '#fff7f7' }}>
          <h2>Application error</h2>
          <p>An unexpected error occurred while rendering the app.</p>
          <details style={{ whiteSpace: 'pre-wrap' }}>
            {String(this.state.error)}
            {this.state.info && '\n\n' + JSON.stringify(this.state.info.componentStack, null, 2)}
          </details>
        </div>
      );
    }
    return this.props.children;
  }
}
