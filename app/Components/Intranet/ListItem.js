import React from 'react';
import { ListGroupItem, ListGroup, Button } from 'react-bootstrap';
import Icon from '../../helper/Icons.js';
import { Link } from 'react-router';
import ReactDom from 'react-dom';

// import Waypoint from 'react-waypoint';

const style = {
  main: {
    paddingLeft: '15px',
    height: '60px',
  },
  content: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  icon: {
    marginRight: '10px',
  },
  button: {
    zIndex: '500,',
  },
};
const pdf = (
  <svg viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet" fit
    style={{
      fill: '#ff8a65',
      verticalAlign: 'middle',
      width: 24,
      height: 24,
    }}
  >
    <g><path d="M6 2c-1.1 0-1.99.9-1.99 2l-.01 16c0 1.1.89 2 1.99 2h12.01c1.1 0 2-.9 2-2v-12l-6-6h-8zm7 7v-5.5l5.5 5.5h-5.5z"></path></g>
  </svg>
);

const folder = (
  <svg viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet" fit
    style={{
      fill: '#ffcc80',
      verticalAlign: 'middle',
      width: 24,
      height: 24,
    }}
  >
    <g><path d="M10 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2z"></path></g>
  </svg>
);


export default class ListItem extends React.Component {

  static propTypes = {
    items: React.PropTypes.object.isRequired,
    showAttachment: React.PropTypes.func,
    isDashboard: React.PropTypes.bool,
  }

  shouldComponentUpdate(nextProps) {
    return nextProps.items !== this.props.items;
  }
  componentDidUpdate() {
     ReactDom.findDOMNode(this).scrollTop = 0;
  }

  getIcon(isFile) {
    if (isFile) {
      return pdf;
    }
    return folder;
  }

  discussionButton = (favKey) => {
    const button = (this.props.isDashboard) ? (
      <Link to={`discussion/${favKey}`} >
        <Button style={style.button}><Icon size="1em" icon="question-answer" /></Button>
      </Link>
    )
    :
    (
      null
    );
    return button;
  }

  render() {
    const obj = this.props.items;
    const props = this.props;
    if (!obj) { return null; }
    let list = [];
    list = list.concat(obj.map((item, key) => {
      return (
        <ListGroupItem
          key={key}
          style={style.main}
          onClick={ item.get('isFile') ?
            function foo() {props.showAttachment(item.get('path').toJS());}
          : function foo() {props.goToPath(item.get('path').toJS());}
          }
        >
          <div style={style.content} className="intranet-item">
            <div style={{ cursor: 'pointer' }}
            >
            {item.get('isFile') ? pdf: folder}
            &nbsp;
            { window.innerWidth < 600 && item.get('name').length > 50
              ? `${item.get('name').slice(0, 22)}...${item.get('name').slice(-15)}` : item.get('name') }
            </div>
            {
               (window.innerWidth < 600 && item.get('name').length > 50
                ? `${item.get('name').slice(0, 22)}...${item.get('name').slice(-15)}` : item.get('name')) !=='Intranet' ?
                this.discussionButton(key) : null
            }
          </div>
        </ListGroupItem>
      );
    }));
    return <ListGroup ref="list" className="intranet-list">{list}</ListGroup>;
  }
}
