import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import M from "materialize-css/dist/js/materialize.min.js";
import { deleteTech } from "../../actions/techActions";

const TechItem = ({ deleteTech, tech: { firstName, lastName, id } }) => {
  const onDelete = () => {
    deleteTech(id);
    M.toast({ html: `Tech Deleted: ${firstName} ${lastName}` });
  };

  return (
    <li className="collection-item">
      <div>
        {firstName} {lastName}
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
};

export default connect(null, { deleteTech })(TechItem);
