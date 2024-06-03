import React from 'react';

const UserTypeDialog = ({ open, onClose, userType, onChangeUserType, onSave }) => {
  if (!open) return null;

  return (
    <div className="fixed  inset-0 bg-black bg-opacity-30 flex items-center justify-center">
      <div className="bg-c3 p-8 rounded-md font-[Lato]">
        <h2 className="text-white text-[20px] font-bold mb-4">Change User Type</h2>
        <select
          value={userType}
          onChange={(e) => onChangeUserType(e.target.value)}
          className="p-2 border text-[18px] rounded-md"
        >
          <option value="Admin">Admin</option>
          <option value="Staff">Staff</option>
        </select>
        <div className="flex justify-start mt-5">
          <button onClick={onClose} className="mr-2 px-3 py-2 bg-gray-500 text-white rounded-md">
            Cancel
          </button>
          <button onClick={onSave}
            className="px-3 py-2 bg-green-500 text-white rounded-md"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserTypeDialog;
