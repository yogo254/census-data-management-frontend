import React from "react";
import axios from "axios";
import { connect } from "react-redux";
import { next } from "../../actions/StackPanel";
import { personUpdate } from "../../actions/Person";
import { addAlert } from "../../actions/Alert";
import { serverAddress } from "../../config/Config";
import Alert from "../Alert";
import uuid from "uuid/v4";

const Identification = ({ next, personUpdate, person, context, addAlert }) => {
  const submit = e => {
    e.preventDefault();

    let formData = new FormData(e.target).entries();
    let data = [...[...formData]];
    let obj = {};

    data.forEach(d => {
      let name = d[0];
      let value = d[1];
      obj[`${name}`] = value;
    });
    if (!person.id) obj.id = uuid();
    else obj.id = person.id;

    axios
      .post(`${serverAddress}/api/person/register`, obj)

      .then(res => {
        if (res.data.code === 403)
          addAlert({ type: "danger", message: res.data.message });
        else {
          personUpdate(obj);
          next();
        }
      });
  };
  return (
    <div className="row">
      <div className="col s10 offset-s1 m8 offset-m2 ">
        {context === "updateperson" ? (
          <h4 className=" blue-text">Update Identification Details</h4>
        ) : (
          <h4 className=" blue-text">Add Identification Details</h4>
        )}
      </div>
      <div className="col s4 offset-s4 ">
        <div>
          <img className="  circle avatar" src={person.avatar} />
        </div>
      </div>
      <div className="col s10 offset-s1 m8 offset-m2 card-panel grey lighten-4  z-depth-0">
        <form className="form" onSubmit={e => submit(e)}>
          <div className="row">
            <div className="input-field">
              <p className="left blue-text">National ID:</p>
              <input
                className="black-text"
                type="text"
                id="nationalid"
                name="nationalId"
                placeholder="National ID"
                defaultValue={person.nationalId}
              />
            </div>
            <div className="input-field">
              <p className="left blue-text">Passport NO:</p>
              <input
                className="black-text"
                type="text"
                id="passportno"
                name="passportNo"
                placeholder="Passport No"
                defaultValue={person.passportNo}
              />
            </div>

            <div className="input-field">
              <p className="left blue-text">Birth CERT NO:</p>
              <input
                className="black-text"
                type="text"
                required
                id="birthno"
                name="birthNo"
                placeholder="birthNo"
                defaultValue={person.birthNo}
              />
            </div>

            <div>
              <button
                type="submit"
                className="btn common white-text waves-effect waves-light nav-btn right"
              >
                Next
              </button>
            </div>
            <Alert />
          </div>
        </form>
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  person: state.person,
  context: state.context
});

export default connect(mapStateToProps, { next, personUpdate, addAlert })(
  Identification
);
