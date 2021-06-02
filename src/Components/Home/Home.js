import React, { Component } from "react";

import { Container } from "reactstrap";
import { HeaderMenu } from "../SharedServices/Header/HeaderMenu";

import { LeftPane } from "../SharedServices/LeftMenu/LeftPane";
import { Messages } from "../SharedServices/Constant/Messages";



export class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      UserRoleFunctionlityList: [],
    };
  }

  componentDidMount() {
    if (localStorage.userStatus === Messages.USER_NOT_AUTHENTICATED) {
      localStorage.clear();
      this.props.history.push("/");
    }
  }
  
  render() {
    return (
      <React.Fragment>
        <div className="row">
          <div className="col-sm-12">
            <HeaderMenu />
          </div>
        </div>
        <div className="row">
          <div className="col-sm-3" style={{ maxWidth: "20%" }}>
            <LeftPane></LeftPane>
          </div>
          <div className="col-sm-9">
           
            <Container>
              {this.props.children}
              
            </Container>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
