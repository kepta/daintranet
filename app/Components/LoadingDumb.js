import React from 'react';
import { ProgressBar } from 'react-bootstrap';

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
};

export default class LoadingDumb extends React.Component {
  state = {
    progress: 0,
  };

  componentDidMount() {
    this.mounted = true;
  }

  componentWillUnmount() {
    this.mounted = false;
    clearTimeout(this.timeout);
  }

  timeouts = [];

  render() {
    this.timeout = setTimeout(() => {
      if (this.mounted) {
        this.setState({ progress: this.state.progress + (3 * Math.random()) });
      }
    }, 500);

    return (
      <div style={{ display: 'flex', height: '100vh' }}>
        <div style={styles.container}>
          <div style={styles.welcome}>
            Loading !!
          </div>
          <div style={styles.instructions}>
            Going to cafe
          </div>
          <div style={styles.instructions}>
            Grabbing some vadas
            from padma kamal
          </div>
          <div style={{ display: 'block', width: '75vw' }}>
            <ProgressBar
              active
              now={this.state.progress}
            />
          </div>
        </div>
      </div>
    );
  }
}
