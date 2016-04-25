import React, { Component } from 'react';

export default class Icon extends Component {
  static propTypes = {
    icon: React.PropTypes.string.isRequired,
    size: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.number,
    ]),
    style: React.PropTypes.object,
  };

  static defaultProps = {
    size: 24,
  }
  shouldComponentUpdate(nextProps) {
    return this.props.icon !== nextProps.icon;
  }
  _mergeStyles(...args) {
      // This is the m function from "CSS in JS" and can be extracted to a mixin
    return Object.assign({}, ...args);
  }

  renderGraphic = () => {
    switch (this.props.icon) {
      case 'my-icon':
        return (
            <g><path d="M7.41 7.84l4.59 4.58 4.59-4.58 1.41 1.41-6 6-6-6z"/></g> // eslint-disable-line
          );
      case 'another-icon':
        return (
            <g><path d="M7.41 15.41l4.59-4.58 4.59 4.58 1.41-1.41-6-6-6 6z"/></g> // eslint-disable-line
          );
      case 'info-outline':
        return (
          <g><path d="M11 17h2v-6h-2v6zm1-15c-5.52 0-10 4.48-10 10s4.48 10 10 10 10-4.48 10-10-4.48-10-10-10zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-11h2v-2h-2v2z"></path></g>
        );
      case 'accessibility':
        return (
          <g><path d="M12 2c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2zm9 7h-6v13h-2v-6h-2v6h-2v-13h-6v-2h18v2z"></path></g> // eslint-disable-line
        );
      case 'settings':
        return (
          <g><path d="M19.43 12.98c.04-.32.07-.64.07-.98s-.03-.66-.07-.98l2.11-1.65c.19-.15.24-.42.12-.64l-2-3.46c-.12-.22-.39-.3-.61-.22l-2.49 1c-.52-.4-1.08-.73-1.69-.98l-.38-2.65c-.03-.24-.24-.42-.49-.42h-4c-.25 0-.46.18-.49.42l-.38 2.65c-.61.25-1.17.59-1.69.98l-2.49-1c-.23-.09-.49 0-.61.22l-2 3.46c-.13.22-.07.49.12.64l2.11 1.65c-.04.32-.07.65-.07.98s.03.66.07.98l-2.11 1.65c-.19.15-.24.42-.12.64l2 3.46c.12.22.39.3.61.22l2.49-1c.52.4 1.08.73 1.69.98l.38 2.65c.03.24.24.42.49.42h4c.25 0 .46-.18.49-.42l.38-2.65c.61-.25 1.17-.59 1.69-.98l2.49 1c.23.09.49 0 .61-.22l2-3.46c.12-.22.07-.49-.12-.64l-2.11-1.65zm-7.43 2.52c-1.93 0-3.5-1.57-3.5-3.5s1.57-3.5 3.5-3.5 3.5 1.57 3.5 3.5-1.57 3.5-3.5 3.5z"></path></g> // eslint-disable-line
        );
      case 'folder':
        return (
          <g><path d="M10 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2z"></path></g> // eslint-disable-line
        );
      case 'pdf':
        return (
          <g><path d="M6 2c-1.1 0-1.99.9-1.99 2l-.01 16c0 1.1.89 2 1.99 2h12.01c1.1 0 2-.9 2-2v-12l-6-6h-8zm7 7v-5.5l5.5 5.5h-5.5z"></path></g> // eslint-disable-line
        );
      case 'add':
        return (
          <g><path d="M19 13h-6v6h-2v-6h-6v-2h6v-6h2v6h6v2z"></path></g> // eslint-disable-line
        );
      case 'delete':
        return (
          <g><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2v-12h-12v12zm13-15h-3.5l-1-1h-5l-1 1h-3.5v2h14v-2z"></path></g>  // eslint-disable-line
        );
      case 'done':
        return (
          <g><path d="M9 16.17l-4.17-4.17-1.42 1.41 5.59 5.59 12-12-1.41-1.41z"></path></g> // eslint-disable-line
        );
      case 'dashboard':
        return (
          <g><path d="M3 13h8v-10h-8v10zm0 8h8v-6h-8v6zm10 0h8v-10h-8v10zm0-18v6h8v-6h-8z"></path></g> // eslint-disable-line
        );
      case 'bug-report':
        return (
          <g><path d="M20 8h-2.81c-.45-.78-1.07-1.45-1.82-1.96l1.63-1.63-1.41-1.41-2.17 2.17c-.46-.11-.93-.17-1.42-.17-.49 0-.96.06-1.41.17l-2.18-2.17-1.41 1.41 1.62 1.63c-.74.51-1.36 1.18-1.81 1.96h-2.81v2h2.09c-.05.33-.09.66-.09 1v1h-2v2h2v1c0 .34.04.67.09 1h-2.09v2h2.81c1.04 1.79 2.97 3 5.19 3s4.15-1.21 5.19-3h2.81v-2h-2.09c.05-.33.09-.66.09-1v-1h2v-2h-2v-1c0-.34-.04-.67-.09-1h2.09v-2zm-6 8h-4v-2h4v2zm0-4h-4v-2h4v2z"></path></g>  // eslint-disable-line
        );
      case 'help':
        return (
          <g><path d="M12 2c-5.52 0-10 4.48-10 10s4.48 10 10 10 10-4.48 10-10-4.48-10-10-10zm1 17h-2v-2h2v2zm2.07-7.75l-.9.92c-.72.73-1.17 1.33-1.17 2.83h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2h-2c0-2.21 1.79-4 4-4s4 1.79 4 4c0 .88-.36 1.68-.93 2.25z"></path></g>  // eslint-disable-line
        );
      case 'account-circle':
        return (
          <g><path d="M12 2c-5.52 0-10 4.48-10 10s4.48 10 10 10 10-4.48 10-10-4.48-10-10-10zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"></path></g>  // eslint-disable-line
        );
      case 'mode-edit':
        return (
          <g><path d="M3 17.25v3.75h3.75l11.06-11.06-3.75-3.75-11.06 11.06zm17.71-10.21c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"></path></g>  // eslint-disable-line
        );
      case 'redo':
        return (
          <g><path d="M18.4 10.6c-1.85-1.61-4.25-2.6-6.9-2.6-4.65 0-8.58 3.03-9.96 7.22l2.36.78c1.05-3.19 4.05-5.5 7.6-5.5 1.95 0 3.73.72 5.12 1.88l-3.62 3.62h9v-9l-3.6 3.6z"></path></g>  // eslint-disable-line
        );
      case 'home':
        return (
          <g><path d="M10 20v-6h4v6h5v-8h3l-10-9-10 9h3v8z"></path></g>
        );
      case 'trending-up':
        return (
          <g><path d="M16 6l2.29 2.29-4.88 4.88-4-4-7.41 7.42 1.41 1.41 6-6 4 4 6.3-6.29 2.29 2.29v-6z"></path></g>
        );
      case 'question-answer':
        return (
          <g><path d="M21 6h-2v9h-13v2c0 .55.45 1 1 1h11l4 4v-15c0-.55-.45-1-1-1zm-4 6v-9c0-.55-.45-1-1-1h-13c-.55 0-1 .45-1 1v14l4-4h10c.55 0 1-.45 1-1z"></path></g>
        );
      case 'file-upload':
        return (
          <g><path d="M9 16h6v-6h4l-7-7-7 7h4zm-4 2h14v2h-14z"></path></g>
        );
      case 'message':
        return (
          <g><path d="M20 2h-16c-1.1 0-1.99.9-1.99 2l-.01 18 4-4h14c1.1 0 2-.9 2-2v-12c0-1.1-.9-2-2-2zm-2 12h-12v-2h12v2zm0-3h-12v-2h12v2zm0-3h-12v-2h12v2z"></path></g>
        );
      default:
        return (
          <g><path d="M12 2c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2zm9 7h-6v13h-2v-6h-2v6h-2v-13h-6v-2h18v2z"></path></g> // eslint-disable-line
        );
    }
  }

  render() {
    const styles = {
      fill: 'currentcolor',
      verticalAlign: 'middle',
      width: this.props.size, // CSS instead of the width attr to support non-pixel units
      height: this.props.size, // Prevents scaling issue in IE
    };
    return (
      <svg viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet" fit
        style={this._mergeStyles(
          styles,
          this.props.style
        )}
      >
          {this.renderGraphic()}
      </svg>
    );
  }
}
