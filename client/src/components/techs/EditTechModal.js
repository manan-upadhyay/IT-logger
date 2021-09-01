import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { updateTech } from "../../actions/techActions";
import M from "materialize-css/dist/js/materialize.min.js";
import PropTypes from "prop-types";

const EditTechModal = ({ currentTech, updateTech }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  useEffect(() => {
    if (currentTech) {
      setFirstName(currentTech.firstName);
      setLastName(currentTech.lastName);
    }
  }, [currentTech]);

  const onSubmit = () => {
    if (firstName === "" || lastName === "") {
      M.toast({ html: "Please Enter a firstname and lastname" });
    } else {
      const newTech = {
        id: currentTech._id,
        firstName,
        lastName,
      };
      updateTech(newTech);
      M.toast({ html: `${firstName} ${lastName} updated!` });

      setFirstName("");
      setLastName("");
    }
  };

  return (
    <div id="edit-tech-modal" className="modal">
      <div className="modal-content">
        <h4> Edit Technician</h4>
        <br />
        <div className="row">
          <div className="input-field">
            <input
              type="text"
              name="firstName"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>
        </div>

        <div className="row">
          <div className="input-field">
            <input
              type="text"
              name="lastName"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
        </div>
      </div>
      <div className="modal-footer">
        <a
          href="#!"
          onClick={onSubmit}
          className="modal-close waves-effect waves-light  blue  btn"
        >
          Enter
        </a>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  currentTech: state.tech.currentTech,
});

EditTechModal.propTypes = {
  updateTech: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, { updateTech })(EditTechModal);
