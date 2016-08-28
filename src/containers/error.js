import React from 'react';
import { connect } from 'react-redux';

const Error = (props) => {
  if (props.error) {
    return (
      <div className="errorContainer">
        {props.errorMessage}
      </div>
    );
  } else {
    return (
      <div />
    );
  }
};

const mapStateToProps = (state) => ({
  error: state.error.isError,
  errorMessage: state.error.errorMsg,
});

export default connect(mapStateToProps, null)(Error);
