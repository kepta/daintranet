import React from 'react';
import Base from '../Base';
import { primaryTextWhite, greyShade, toolbarGray, darkGray } from '../../helper/colorPallete.js';
import { IconButton } from 'material-ui';
import { CloseOther, BackButton } from '../Icons';
import SearchBar from './SearchBar';
import LocationBar from './LocationBar';

export default class MiscBar extends Base {
  constructor(props) {
    super(props);
    this._bind('handleSearchChange', 'clearSearch');
    this.searchRef = null;
    this.state = {
      clear: false,
    };
  }
  handleSearchChange(event) {
    // return console.log(e.target.value);
    const value = event.target.value;
    // this.searchRef = event.target;
    const delay = this.props.isMobile ? 750 : 550;
    if (value.length >= 3) {
      clearTimeout(this.lastQuery);
      this.lastQuery = setTimeout(() => {
        this.props.setSearch(value);
        console.log('good');
        this.setState({
          searchString: value,
        });
      }, delay);
    }
  }
  // onBlur(event) {
  //
  // }
  clearSearch() {
    this.setState({
      clear: true,
    });
  }
  clearDone() {
    this.setState({
      clear: false,
    });
  }
  render() {
    const style = this.style();
    let whatToshow;
    let whatIcon;

    if (this.props.search) {
      whatToshow = (
        <SearchBar
          handleSearchChange={this.handleSearchChange}
          isMobile={this.props.isMobile}
        />
      );
    }
    if (this.props.home) {
      whatIcon = <BackButton style={{ fill: darkGray }}/>;
      whatToshow = <LocationBar goToStringPath={this.props.goToStringPath} pathString={this.props.pathString} />;
    }
    return (
      <div style={style.main}>
        <div style={style.leftButton}>
          <IconButton onTouchTap={this.props.goBack}>
            { whatIcon }
          </IconButton>
        </div>
        <div style={style.container}>
          {whatToshow}
        </div>
      </div>
    );
  }
  style() {
    return {
      main: {
        display: 'flex',
        height: '50px',
        flexDirection: 'row',
        backgroundColor: toolbarGray,
      },
      leftButton: {
        position: 'relative',
        alignSelf: 'center',
        left: '8px',
        // top: '10px',
      },
      container: {
        margin: '0 20px',
        display: 'flex',
        flexGrow: '1',
        alignItems: 'center'
      },
    };
  }
}
