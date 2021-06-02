import React, { Component } from "react";
import { ServiceUrl } from "../SharedServices/Constant/ServicesUrl";
import { Messages } from "../SharedServices/Constant/Messages";
import { Services } from "../SharedServices/Services";
import { TextBox } from "../SharedServices/Generics/TextBox";
import { Grid } from "../SharedServices/Generics/Grid";
import { PopUpBox } from "../SharedServices/PopUpBox/PopUpBox";
import { MaskInput } from "../SharedServices/Generics/MaskInput";

import "./Contacts.css";
export class Contact extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ContactList: [],
      ContactListHeaders: [
        {
          headerName: "First Name",
          field: "firstName",
          sortable: true,
          tooltipField: "firstName",
        },
        {
          headerName: "Last Name",
          field: "lastName",
          sortable: true,
          tooltipField: "lastName",
        },
        {
          headerName: "Email",
          field: "email",
          sortable: true,
          tooltipField: "email",
        },
        {
          headerName: "Phone",
          field: "phone",
          sortable: true,
          tooltipField: "phone",
        },
        { headerName: "Status", field: "status", sortable: true },
        {
          headerName: "Action",
          field: "Action",
          hide: false,
          cellRenderer: (params) => {
            var link = document.createElement("a");
            link.href = "#";
            link.innerText = "Edit";
            link.addEventListener("click", (e) => {
              e.preventDefault();
              this.editContact(e, params.data.contactId);
            });
            return link;
          },
        },
      ],
      IsPopUpOpen: false,
      Id: 0,
      FirstName: "",
      LastName: "",
      Status: "Active",
      Email: "",
      Phone: "",
      AddEditSuccessMsg: "",
      AddEditSuccessStatus: true,
      ValidationErrors: {},
      FilterText: "",
      GridRendered: false,
      UserRoleFunctionlityList: [],
      DisplayAddBtn: false,
      DisplayEditBtn: false,
    };
    this.GetUserRoleFunctionlity();
  }

  componentDidMount = async () => {
    if (
      localStorage.userStatus === undefined ||
      localStorage.userStatus === Messages.USER_NOT_AUTHENTICATED
    ) {
      localStorage.clear();
      this.props.history.push("/");
    }
    this.getContacts();
  };

  GetUserRoleFunctionlity = async () => {
    const userRoleFunctionlity = {
      username: localStorage.username,
    };
    var url = ServiceUrl.GET_USER_ROLE_FUNCTIONLITY;
    return new Promise(async (resolve, reject) => {
      try {
        var details = await Services.PostHandler(
          url,
          JSON.stringify(userRoleFunctionlity)
        );
      } catch (ex) {
        return reject(ex);
      }
      resolve(this);
      this.setState({ UserRoleFunctionlityList: details });
      if (this.state.UserRoleFunctionlityList.length > 0) {
        const rolesFuctionlityList = this.state.UserRoleFunctionlityList.filter(
          (item) => item.functionalityName.indexOf("CONTACT_") !== -1
        );
        for (const item of rolesFuctionlityList) {
          switch (item.functionalityName) {
            case Messages.CONTACT_ADD:
              this.setState({ DisplayAddBtn: true });
              break;
            case Messages.CONTACT_EDIT:
              this.setState({ DisplayEditBtn: true });
              break;
            default:
              break;
          }
        }
      }
      if (
        this.state.UserRoleFunctionlityList.length > 0 &&
        this.state.DisplayEditBtn === false
      ) {
        var items = this.state.ContactListHeaders.find(
          (item) => item.headerName === "Action"
        );
        items["hide"] = true;
      }
    });
  };

  handleChange = (event, value) => {
    if (event.target.name !== "Status") {
      this.setState({ [event.target.name]: event.target.value });
    } else {
      this.setState({
        Status: event.target.checked === true ? "Active" : "Inactive",
      });
    }
  };

  addContact = () => {
    this.setState({
      IsPopUpOpen: true,
      PopUpTital: Messages.NEW_CONTACT_TITLE,
      AddEditSuccessMsg: "",
    });
  };

  editContact = async (e, editContactId) => {
    const { ContactList } = this.state;
    var obj = ContactList.find((item) => item.contactId === editContactId);

    this.setState({
      Id: editContactId,
      FirstName: obj.firstName,
      LastName: obj.lastName,
      Email: obj.email,
      Phone: obj.phone,
      Status: obj.status,
      PopUpTital: Messages.EDIT_CONTACT_TITLE,
      IsPopUpOpen: true,
      AddEditSuccessMsg: "",
    });
  };

  saveContact = async () => {
    const { Id, FirstName, LastName, Email, Phone, Status } = this.state;
    var isValid = this.validate();
    if (isValid) {
      const ContactObj = {
        contactId: Id,
        firstName: FirstName,
        lastName: LastName,
        email: Email,
        phone: Phone,
        status: Status,
      };

      var url = ServiceUrl.SAVE_CONTACT;
      var saveMsg = await Services.PostHandler(
        url,
        JSON.stringify(ContactObj),
        localStorage.clientId
      );

      this.setState({
        AddEditSuccessMsg: saveMsg,
        AddEditSuccessStatus: saveMsg.includes("successfully"),
      });

      if (saveMsg.includes("successfully")) {
        this.getContacts();
      }
      this.clearForm();
    }
  };

  getContacts = async () => {
    var url = ServiceUrl.GET_CONTACTS;
    var contacts = await Services.GetData(url, localStorage.clientId);
    this.setState({ ContactList: contacts, GridRendered: true });
  };

  validate = () => {
    const { FirstName, LastName, Email, Phone } = this.state;
    let ValidationErrors = {};
    let isFormValid = true;
    if (!FirstName) {
      ValidationErrors.FirstName = Messages.FIELD_VALIDATION_STATUS;
      isFormValid = false;
    }
    if (!LastName) {
      ValidationErrors.LastName = Messages.FIELD_VALIDATION_STATUS;
      isFormValid = false;
    }
    if (!Email) {
      ValidationErrors.Email = Messages.FIELD_VALIDATION_STATUS;
      isFormValid = false;
    }
    if (!Phone) {
      ValidationErrors.Phone = Messages.FIELD_VALIDATION_STATUS;
      isFormValid = false;
    }
    this.setState({ ValidationErrors: ValidationErrors });
    return isFormValid;
  };

  clearForm = () => {
    this.setState({
      FirstName: "",
      LastName: "",
      Email: "",
      Phone: "",
      Id: 0,
      Status: "Active",
      IsPopUpOpen: false,
    });
  };

  filterTextChange = (event) => {
    this.setState({ FilterText: event.target.value, AddEditSuccessMsg: "" });
  };
  render() {
    const {
      ValidationErrors,
      ContactListHeaders,
      IsPopUpOpen,
      PopUpTital,
      AddEditSuccessStatus,
      AddEditSuccessMsg,
      ContactList,
      FirstName,
      LastName,
      Email,
      Phone,
      Status,
      DisplayAddBtn,
      GridRendered,
      FilterText,
    } = this.state;
    return (
      <form autoComplete="off">
        <div className="row">
          <div className="col-sm-4" style={{ paddingLeft: "0px" }}>
            <input
              type="text"
              onChange={this.filterTextChange}
              style={{ width: "100%" }}
              className="form-control"
              placeholder="Enter text to search"
            ></input>
          </div>
          <div
            className="col-sm-8"
            style={{ paddingRight: "0px", textAlign: "center" }}
          >
            <span style={{ color: AddEditSuccessStatus ? "green" : "red" }}>
              {AddEditSuccessMsg}
            </span>
            {DisplayAddBtn === true && (
              <button
                type="button"
                id="AddContactBtn"
                onClick={this.addContact}
              >
                Add
              </button>
            )}
          </div>
        </div>
        <div className="row">
          <br></br>
        </div>
        <div className="row">
          {GridRendered && (
            <Grid
              columnDefs={ContactListHeaders}
              rowData={ContactList}
              pagination="true"
              paginationPageSize="5"
              enableBrowserTooltips="true"
              filterText={FilterText}
            />
          )}
        </div>
        <div className="row">
          {IsPopUpOpen && (
            <PopUpBox
              content={
                <>
                  <div className="row" style={{ marginTop: "1%" }}>
                    <div className="col-sm-4">
                      <TextBox
                        id="firstName"
                        label="First Name *"
                        name="FirstName"
                        type="text"
                        value={FirstName}
                        onChange={this.handleChange}
                        validationErrors={ValidationErrors.FirstName}
                        requiredProp={true}
                      />
                    </div>
                    <div className="col-sm-8">
                      <TextBox
                        id="lastName"
                        label="Last Name *"
                        name="LastName"
                        type="text"
                        value={LastName}
                        onChange={this.handleChange}
                        validationErrors={ValidationErrors.LastName}
                      />
                    </div>
                  </div>
                  <div className="row" style={{ marginTop: "1%" }}>
                    <div className="col-sm-4">
                      <TextBox
                        id="email"
                        label="Email *"
                        name="Email"
                        type="text"
                        value={Email}
                        onChange={this.handleChange}
                        validationErrors={ValidationErrors.Email}
                        requiredProp={true}
                      />
                    </div>
                    <div className="col-sm-8">
                      <MaskInput
                        id="phone"
                        label="Phone Number *"
                        name="Phone"
                        type="text"
                        mask="999 999 9999"
                        value={Phone}
                        onChange={this.handleChange}
                        validationErrors={ValidationErrors.Phone}
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-sm-4" id="ActiveChBx">
                      <div className="custom-control custom-switch">
                        <input
                          type="checkbox"
                          className="custom-control-input"
                          id="Status"
                          name="Status"
                          checked={Status === "Active" ? true : false}
                          onChange={this.handleChange}
                        />
                        <label
                          className="custom-control-label"
                          htmlFor="Status"
                        >
                          <span id="StatusLabel">Active</span>
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-sm-12">
                      <button
                        type="button"
                        id="SaveContactBtn"
                        onClick={this.saveContact}
                      >
                        Save
                      </button>
                    </div>
                  </div>
                </>
              }
              handleClose={this.clearForm}
              popUpTital={PopUpTital}
            />
          )}
        </div>
      </form>
    );
  }
}
