import React from "react";

const SubmitButton = (props) => {
  return (
    <button
      type="submit"
      className="btn-blue font-bold px-4 py-1.5 text-sm mt-3"
      onClick={props.handleSubmit}
    >
      {props.value}
    </button>
  );
};

export default SubmitButton;
