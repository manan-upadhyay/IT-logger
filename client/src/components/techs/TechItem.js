import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import M from "materialize-css/dist/js/materialize.min.js";
import { deleteTech, setCurrentTech } from "../../actions/techActions";

const TechItem = ({ deleteTech, setCurrentTech, tech }) => {
  const { firstName, lastName, _id } = tech;
  const onDelete = () => {
    deleteTech(_id);
    M.toast({ html: `Tech Deleted: ${firstName} ${lastName}` });
  };

  return (
    <li className="collection-item">
      <div>
        <a
          href="#edit-tech-modal"
          className="black-text modal-trigger"
          onClick={() => setCurrentTech(tech)}
        >
          {firstName} {lastName}
        </a>
        <a href="#!" className="secondary-content" onClick={onDelete}>
          <i className="material-icons grey-text">delete</i>
        </a>
      </div>
    </li>
  );
};

TechItem.propTypes = {
  tech: PropTypes.object.isRequired,
  deleteTech: PropTypes.func.isRequired,
  setCurrentTech: PropTypes.func.isRequired,
};

export default connect(null, { setCurrentTech, deleteTech })(TechItem);
