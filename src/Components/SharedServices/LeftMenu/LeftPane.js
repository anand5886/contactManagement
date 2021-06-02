import React, { Component } from "react";
import { ServiceUrl } from "../Constant/ServicesUrl";
import { Services } from "../Services";
import { Messages } from "../Constant/Messages";
import ContactImage from "./Images/gear.png";

import {
  ProSidebar,
  SidebarHeader,
  SidebarContent,
  Menu,
  MenuItem,
} from "react-pro-sidebar";

import "react-pro-sidebar/dist/css/styles.css";
import "./LeftPane.css";
import { Link } from "react-router-dom";
export class LeftPane extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ActiveMenuItem: "",
      subMenuOpen: "",
      UserRoleFunctionlityList: [],
      ConfigMaster: false,
      ContAdd: false,
      ContEdit: false,
      ContView: false,
    };
  }
  componentDidMount = () => {
    this.GetUserRoleFunctionlity();
  };
  GetUserRoleFunctionlity = async () => {
    const userRoleFunctionlity = {
      username: localStorage.username,
    };
    var url = ServiceUrl.GET_USER_ROLE_FUNCTIONLITY;
    var details = await Services.PostHandler(
      url,
      JSON.stringify(userRoleFunctionlity)
    );
    for (const item of details) {
      switch (item.functionalityName) {
        case Messages.CONTACT_ADD:
          this.setState({ ContAdd: true });
          break;
        case Messages.CONTACT_EDIT:
          this.setState({ ContEdit: true });
          break;
        case Messages.CONTACT_VIEW:
          this.setState({ ContView: true });
          break;
        default:
          break;
      }
    }
  };

  onClickMenuItem(menuItem) {
    this.setState({ ActiveMenuItem: menuItem, subMenuOpen: true });
  }
  onSubmenuHeaderclick(menuItem) {
    this.setState({ subMenuOpen: true });
  }
  render() {
    const { ActiveMenuItem, ContAdd, ContEdit, ContView } = this.state;
    return (
      <div className="sidebarWrapper">
        <aside className="sidebar-container">
          <div className="sidebar-content clearfix">
            <ProSidebar>
              <SidebarHeader>
                <div className="sidebar-header">
                  <span id="LeftMenuLogo">MyApp</span>
                </div>
              </SidebarHeader>
              <SidebarContent>
                <Menu>
                  <div>
                    {(ContAdd || ContEdit || ContView) && (
                      <div className="row">
                        <div className="col-sm-1">
                          <img src={ContactImage} className="menuItemImage" />
                        </div>
                        <div className="col-sm-8">
                          <MenuItem
                            active={
                              ActiveMenuItem === "contactsMenuItem"
                                ? true
                                : false
                            }
                            onClick={() =>
                              this.onClickMenuItem("contactsMenuItem")
                            }
                          >
                            Contacts <Link to="/Contact" />
                          </MenuItem>
                        </div>
                      </div>
                    )}
                  </div>
                </Menu>
              </SidebarContent>
            </ProSidebar>
          </div>
        </aside>
      </div>
    );
  }
}
