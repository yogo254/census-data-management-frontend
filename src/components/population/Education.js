import React from "react";
import { connect } from "react-redux";
import uuid from "uuid/v4";

import { addEducation, removeEducation } from "../../actions/Person";
import { next, previous } from "../../actions/StackPanel";
import { addAlert } from "../../actions/Alert";
import Alert from "../Alert";
import moment from "moment";

const Education = ({
  addEducation,
  removeEducation,
  next,
  previous,
  addAlert,
  person,
  context
}) => {
  return (
    <div className="row">
      <div className="col s10 offset-s1 m8 offset-m2 ">
        {context === "updateperson" ? (
          <h4 className=" blue-text">Update Education Details</h4>
        ) : (
          <h4 className=" blue-text">Add Education Details</h4>
        )}
      </div>
      <div className="col s4 offset-s4 ">
        <div>
          <img className="  circle avatar" src={person.avatar} />
        </div>
      </div>
      <div className="col s10 offset-s1 m8 offset-m2 card-panel grey lighten-4 grey-text text-darken-4 z-depth-0">
        {person.educations.map(e => {
          return (
            <form
              key={uuid()}
              className="form"
              onSubmit={event => {
                event.preventDefault();
                let formData = new FormData(event.target).entries();
                let data = [...[...formData]];
                let obj = {};

                if (e.id === "") obj.id = uuid();
                else obj.id = e.id;

                data.forEach(d => {
                  let name = d[0];
                  let value = d[1];
                  obj[`${name}`] = value;
                });

                if (moment(obj.start).isValid() && moment(obj.end).isValid()) {
                  obj.start = moment(obj.start).format("YYYY-MM-DD");
                  obj.end = moment(obj.end).format("YYYY-MM-DD");
                  addEducation(obj);
                } else if (
                  moment(obj.start, "DD-MM-YYYY").isValid() &&
                  moment(obj.end, "DD-MM-YYYY").isValid()
                ) {
                  obj.start = moment(obj.start, "DD-MM-YYYY").format(
                    "YYYY-MM-DD"
                  );
                  obj.end = moment(obj.end, "DD-MM-YYYY").format("YYYY-MM-DD");
                  addEducation(obj);
                } else
                  addAlert({
                    message: `invalid Education dates @ institution: ${obj.institution}`,
                    type: "danger"
                  });
              }}
            >
              {e.id === "" ? (
                <h6 className="black-text darken-4">Add New</h6>
              ) : null}
              <div className="row">
                <div className="input-field">
                  <p className="left">Institution:</p>
                  <input
                    className="black-text"
                    type="text"
                    required
                    id="institution"
                    name="institution"
                    defaultValue={e.institution}
                  />
                </div>
                <div className="input-field">
                  <p className="left">Certification:</p>
                  <input
                    className="black-text"
                    type="text"
                    required
                    id="certification"
                    name="certification"
                    defaultValue={e.certification}
                  />
                </div>
                <div className="input-field">
                  <p className="left">Description:</p>
                  <textarea
                    className="black-text materialize-textarea"
                    type="text"
                    id="description"
                    name="description"
                    defaultValue={e.description}
                  />
                </div>

                <div className="input-field">
                  <p className="left">Start Date:</p>
                  <input
                    className="black-text"
                    type="text"
                    required
                    id="start"
                    name="start"
                    defaultValue={moment(e.start).format("DD-MM-YYYY")}
                  />
                </div>
                <div className="input-field">
                  <p className="left">End Date:</p>
                  <input
                    className="black-text"
                    type="text"
                    name="end"
                    required
                    id="end"
                    defaultValue={moment(e.end).format("DD-MM-YYYY")}
                  />
                </div>

                <div>
                  <button
                    type="submit"
                    className="btn green white-text waves-effect waves-light nav-btn right"
                  >
                    {e.id === "" ? "add" : "save"}
                  </button>
                  {e.id !== "" ? (
                    <button
                      onClick={c => removeEducation(e.id)}
                      className="btn white  purple-text border-purple waves-effect waves-light nav-btn left"
                    >
                      Remove
                    </button>
                  ) : null}
                </div>
              </div>
              <Alert />
            </form>
          );
        })}

        <div>
          <button
            onClick={() => next()}
            className="btn common white-text waves-effect waves-light nav-btn right"
          >
            Next
          </button>
          <button
            onClick={() => previous()}
            type="submit"
            className="btn common white-text waves-effect waves-light nav-btn left"
          >
            Previous
          </button>
        </div>
      </div>
    </div>
  );
};
const mapStateToProps = state => ({
  person: state.person,
  context: state.context
});

export default connect(mapStateToProps, {
  addEducation,
  removeEducation,
  next,
  previous,
  addAlert
})(Education);
