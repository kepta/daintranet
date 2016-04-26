import React from 'react';
import { Button, Glyphicon, ButtonToolbar, Badge } from 'react-bootstrap';
import Chips from './Chips';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import { Link } from 'react-router';
import Waypoint from 'react-waypoint';
import Immutable from 'immutable';

function isStarred() {

}


export default class Toolbar extends React.Component {
  static propTypes = {
    pathString: React.PropTypes.array.isRequired,
    goToPath: React.PropTypes.func.isRequired,
    timeStamp: React.PropTypes.string,
    folders: React.PropTypes.number.isRequired,
    setSearch: React.PropTypes.func,
    search: React.PropTypes.object,
    quickSearch: React.PropTypes.object,
    addToFav: React.PropTypes.func.isRequired,
    fav: React.PropTypes.object,
  }

  static defaultProps = {
    pathString: [],
  }


  constructor(props, state) {
    super(props);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }

  state = {
    showFixed: false,
  }

  getHeading(pathString) {
    if (pathString.length === 0) {
      return 'Intranet';
    } else if (pathString.length === 1 || pathString.length === 2) {
      return pathString[pathString.length - 1];
    } else {
      return pathString[2];
    }
  }
  _handleWaypointLeave = () => {
    this.setState({
      showFixed: true,
    });
  }
  _handleWaypointEnter = () => {
    this.setState({
      showFixed: false,
    });
  }
  style = () => {
    return {
      wrapper: {
        height: '202px',
        backgroundColor: '#f5f5f5',
      },
      badge: {
        backgroundColor: '#e7a800',
      },
      updated: {
        display: 'flex',
        justifyContent: 'center',
        color: 'grey',
        fontSize: '0.75em',
      },
      jumbo: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: window.innerWidth < 600 ? '100px' : '140px',
      },
      header: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: '12px',
      },
    };
  }

  shouldTrend = (t) => {
    let sum = 0;
    for (let i = 0; i < t.length; i++) {
      sum += t.charCodeAt(i);
    }
    return sum%5 === 0;
  }
  addToFav = () => {
    return this.props.addToFav(Immutable.fromJS({
      isFile: false,
      name: this.getHeading(this.props.pathString),
      path: this.props.pathString,
    }));
  }
  isStarred = () => {
    return this.props.fav.find((o) => {
      return o.get('name') === this.getHeading(this.props.pathString);
    });
  }

  render() {
    const starred = this.isStarred();
    const style = this.style();
    const { pathString, goToPath, timeStamp, folders } = this.props;

    const lastUpdated = (
      <span>
        Last updated &nbsp;{timeStamp} &nbsp; ago
      </span>
    );

    return (
      <div style={style.wrapper}>
        <div style={style.jumbo}>
          <div style={style.header} id="list-top">
            <h1 className="intranet-heading">&nbsp;&nbsp;
              {this.getHeading(pathString)}
              <span>
                <Badge pullRight style={style.badge}>{folders}</Badge>
              </span>
              </h1>&nbsp;
          </div>
          <ButtonToolbar>
            {isStarred()}
            {
              this.props.pathString.length === 3 || this.props.pathString.length ===2 ?
              <Button
                key={0}
                bsSize="small"
                bsStyle={ starred ? 'success': 'default'}
                onClick={this.addToFav}
              >
              <Glyphicon glyph="star" /> {starred ? 'Starred': 'Star'}</Button>
              : null
            }
            {
              this.shouldTrend(this.getHeading(pathString)) ?
              <Button key={1} bsSize="small" bsStyle="danger"><Glyphicon glyph="fire" /> Trending</Button>
              : null
            }
          </ButtonToolbar>
        </div>
        <div style={style.updated}>
          {lastUpdated}
        </div>
        <Waypoint
          onEnter={this._handleWaypointEnter}
          onLeave={this._handleWaypointLeave}
        />
        <Chips
          pathString={pathString}
          goToPath= {goToPath}
          setSearch={this.props.setSearch}
          search={this.props.search}
          showFixed={this.state.showFixed}
          quickSearch={this.props.quickSearch}
        />
    </div>
    );
  }
}

// style =
