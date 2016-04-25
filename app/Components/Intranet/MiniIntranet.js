import React from 'react';
import Immutable from 'immutable';
import { Panel } from 'react-bootstrap';
import ListItem from './ListItem';
import { Link } from 'react-router';
import { Scrollbars } from 'react-custom-scrollbars';

const title = (
  <Link to="/intranet">Intranet</Link>
);
const Mini = ({ location, goToPath }, context) => {
  if (location.count() === 0) {
    location = Immutable.fromJS([{
      isFile: false,
      name: 'Intranet',
      path: [],
    }]);
  }
  const goToIntranet = (toPath) => {
    context.router.push('/intranet');
    goToPath(toPath);
  };
  return (
    <div className="widget-outer">
      <Panel header={title} >
        <Scrollbars id="chatList" style={{ height: 395 }}>
          <ListItem items={location} goToPath={goToIntranet} isDashboard />
        </Scrollbars>
      </Panel>
    </div>
  );
};

Mini.contextTypes = {
  router: React.PropTypes.object.isRequired,
};

Mini.propTypes = {
  location: React.PropTypes.object,
  goToPath: React.PropTypes.func,
};

Mini.defaultProps = {
  location: Immutable.fromJS([{
    isFile: false,
    name: 'Intranet',
    path: [],
  }]),
};

export default Mini;
