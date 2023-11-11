import React, { useState } from "react";
import { FaCheck } from "react-icons/fa";
import { editMark, getIndidualMark } from "../apis/actions.api";
import Cookies from "universal-cookie";

const MarkList = ({ item,  isAdmin , userid}) => {

  const [newMark, setNewMark] = useState(item);
  const [isEditing, setIsEditing] = useState(false);

  const cookies = new Cookies();
  console.log(cookies.get('token'));

  const cancelEdit = () => {
    setIsEditing(false);
    setNewMark((prev) => ({ ...prev, mark: item.mark }));
  };

  const setMarks = (e) => {
    setNewMark((prev) => ({ ...prev, mark: e.target.value }));
    console.log(newMark);
  };

  const editMarkOfStudent = async () => {
    setIsEditing(false)
    try {
      const response = await editMark( userid , newMark , cookies.get('token') )
      console.log(response);
      setNewMark(newMark)
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="mark-list-item">
      <p style={{ fontWeight: "bold" }}>{item.subject}</p>
      {!isEditing && <p> { isEditing ? newMark.mark : item.mark } </p>}
      {isEditing && (
        <input
          className="edit-input"
          type="number"
          name="newMark"
          onChange={(e) => setMarks(e)}
        />
      )}
      <p>{item.code}</p>
      {isAdmin && (
        <div className="admin-buttons">
          {!isEditing && (
            <button onClick={() => setIsEditing(!isEditing)}>
              <FaCheck />
            </button>
          )}

          {isEditing && <button onClick={() => cancelEdit()}> X </button>}
          {isEditing && (
            <button onClick={() => editMarkOfStudent()}>
              <FaCheck />
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default MarkList;
