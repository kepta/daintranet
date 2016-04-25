import React from 'react';
import { Breadcrumb, BreadcrumbItem } from 'react-bootstrap';
import Icon from '../../helper/Icons';

const handleClick = (key, pathString, goToPath) => {
  return goToPath(pathString.slice(0, key+1));
};
const searchStyle = () => {
  return {
    overflowX: 'hidden',
    margin: window.innerWidth < 600 ? '0 20px 0px 0' : '0 20px 10px 0',
    padding: window.innerWidth < 600 ? '4px 10px' : 0,
    borderTop: window.innerWidth < 600 ? 'solid 1px #e0e0e0': 0,
  };
};

const chipsDisplay = (string, length, k) => {
  if (window.innerWidth < 600) {
    if (length > 3) {
      if (k > 2) {
        return '..';
      }
      return `${string.slice(0, 4)}..`;
    }
    if (length > 2) {
      return `${string.slice(0, 5)}..`;
    }
  }
  return string;
};
export default class Chips extends React.Component {

  static propTypes = {
    goToPath: React.PropTypes.func.isRequired,
    pathString: React.PropTypes.array,
    setSearch: React.PropTypes.func,
    showFixed: React.PropTypes.bool.isRequired,
    search: React.PropTypes.object,
    quickSearch: React.PropTypes.object,
  }

  handleSearchChange = () => {
    const value = this.refs.search.value;
    if (value && value.length >= 1 && value !== '' && value !== ' ') {
      clearTimeout(this.lastQuery);
      this.lastQuery = setTimeout(() => this.props.setSearch(value), 800);
    } else {
      this.clearSearch();
    }
  }

  clearSearch = () => {
    this.props.setSearch('');
    this.refs.search.value='';
  }

  styleFoo = () => {
    return {
      wrapper: {
        position: this.props.showFixed ? 'fixed' : undefined,
        top: this.props.showFixed ? '50px' : undefined,
        left: this.props.showFixed ? '0px' : undefined,
        paddingBottom: this.props.showFixed? '4px' : undefined,
        borderBottom: this.props.showFixed? 'solid 1px #e0e0e0' : undefined,
        display: 'flex',
        flexDirection: window.innerWidth < 600 ? 'column': 'row',
        justifyContent: 'space-between',
        width: '100%',
        zIndex: '1000',
        backgroundColor: 'rgb(245, 245, 245)',
      },
    };
  };

  render() {
    const searchButton = !(this.props.search || this.props.quickSearch) ?
    (<button className="btn" type="button">
    <span className=" glyphicon glyphicon-search"></span>
    </button>) :
    (<button className="btn" type="button" onClick={this.clearSearch}>
    <span className=" glyphicon glyphicon-remove"></span>
    </button>
    );
    const { pathString, goToPath } = this.props;
    const search = (
      <div className="intranet-search" style={searchStyle()}>
        <input type="text" className="query form-control"
          ref="search" placeholder="Search" onChange={this.handleSearchChange}
        />
          <span className="input-group-btn">
          {searchButton}
        </span>
      </div>
    );
    const style = this.styleFoo();
    const home = (
      <BreadcrumbItem onClick={function foo() {goToPath([]);}} key={-1}>
        <Icon icon="home" style={{ fill: '#000' }} />
      </BreadcrumbItem>
    );

    const List = pathString.map((e, k) => {
      return (
        <BreadcrumbItem
          key={k}
          onClick={function foo() {handleClick(k, pathString, goToPath);}}
        >
          {chipsDisplay(e, pathString.length, k)}
        </BreadcrumbItem>
      );
    });
    // return (<div>hellow rold how are you</div>);
    return (
      <div style={style.wrapper} className="intranet-breadcrumb">
        <Breadcrumb>
          {[home].concat(List)}
        </Breadcrumb>
        {search}
      </div>
    );
  }
}
