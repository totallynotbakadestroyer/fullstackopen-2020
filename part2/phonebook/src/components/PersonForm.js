import React from "react";

const PersonForm = ({
  newName,
  addName,
  newNumber,
  handleNameChange,
  handlePhoneChange,
}) => {
  return (
    <div>
      <form>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          number: <input value={newNumber} onChange={handlePhoneChange} />
        </div>
        <div>
          <button onClick={addName} type="submit">
            add
          </button>
        </div>
      </form>
    </div>
  );
};
export default PersonForm;
