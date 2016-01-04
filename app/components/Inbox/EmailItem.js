import React from 'react';
import Base from '../Base';

export default class EmailList extends Base {
    constructor(props) {
      super(props);
      this.handleClick.bind(this);
      this.styles = this.styles();
      this.state = {
        read: localStorage.getItem(this.props.Id)? true : false,
      };
    }
    handleClick(Id, e) {
      this.props.displayMail(Id);
      this.setState({
        read: true,
      });
      localStorage.setItem(this.props.Id, true);
    }
    showDot() {
      if (!this.state.read) {
        return (
        <div style={ this.styles.leftContent} >
            <div style={this.styles.read} >
            </div>
        </div>
        );
      } else {
        return (
            <div style={{ visibility: 'hidden' }} >
                <div style={{ width: '20px', display: 'block', color: 'white' }}>
                </div>
            </div>
        );
      }
    }
    render() {
      let fro = this.props.from[0].p;
      if (!this.props.from[0].p) {
        fro = this.props.from[0].d ? this.props.from[0].d : this.props.from[0].a;
      }
      return (
          <div onTouchTap={this.handleClick.bind(this, this.props.Id)}>
              <div style={this.styles.main} >
                  {this.showDot()}
                  <div style= {{ width: '100%' }}>
                      <li style={this.styles.rightContent} className="email-list hover ellipsis">
                          <div style={this.styles.from}
                            className="mui-text-title mui-text-black from ellipsis"
                          >
                            {fro}
                          </div>
                          <div style={this.styles.subject}
                            className="mui-text-body1 mui-text-black subject ellipsis"
                          >
                            {this.props.subject}
                          </div>
                          <div style={{ display: 'none' }}></div>
                      </li>
                  </div>
              </div>
              <div style={this.styles.divider} className="mui-divider divider"></div>

          </div>
      );
    }
    styles() {
      return {
        main: {
          display: 'flex',
          flexDirection: 'row',
          // justifyContent : 's',
          width: '100%',
          alignItems: 'center',
        },
        read: {
            // display: 'flex',
          backgroundColor: '#c06',
          height: '10px',
          borderRadius: '25px',
          width: '10px',
            // paddingLeft : '20px'
            // paddingLeft: '10px'
        },
        leftContent: {
          display: 'flex',
          paddingLeft: '5px',
          paddingRight: '5px',
        },
        rightContent: {
            // display: 'flex',
          width: '100%',
          paddingLeft: '5px',
          minHeight: '72px !important',
        },
        divider: {
          position: 'relative',
          bottom: 0,
        },
        from: {
          paddingTop: '6px',
        },
        subject: {
          paddingTop: '6px',
        },
      };
    }
}
