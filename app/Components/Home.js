import React from 'react';
import Nav from './Navbar';
import Sidebar from './Sidebar';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actions } from '../redux/actions';


export class Home extends React.Component {

  static propTypes = {
    children: React.PropTypes.object.isRequired,
    actions: React.PropTypes.object.isRequired,
  }
  constructor(props, state) {
    super(props);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }
  state = {
    sidebarOpen: false,
  }

  toggleSideBar = () => {
    // toggles sidebar
    this.setState({ sidebarOpen: !this.state.sidebarOpen });
  }

  style = () => {
    return {
      overlay: {
        opacity: this.state.sidebarOpen ? '0.4' : '0',
        zIndex: this.state.sidebarOpen ? '500' : '0',
        pointerEvents: this.state.sidebarOpen ? 'all' : 'none',
      },
    };
  }

  render() {
    const style = this.style();
    return (
      <div className="wrapper0">
        <div className="side-content">
          <Nav toggleSideBar={this.toggleSideBar} sidebarOpen={this.state.sidebarOpen} />
          <div style={{ marginTop: '50px', height: 'calc(100vh - 50px)' }}>
            {this.props.children}
          </div>
        </div>
        <div className="overlay" style={style.overlay} onClick={this.toggleSideBar} />
        <Sidebar actions={this.props.actions} toggleSideBar={this.toggleSideBar} sidebarOpen={this.state.sidebarOpen} />
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch),
  };
}

function mapStateToProps(state) {
  return { ...state.reducer };
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);

// export default Home;
