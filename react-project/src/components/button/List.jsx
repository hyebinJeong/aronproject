import React from "react";
import iconList from "../../image/iconList.svg";
import "./List.css";

const List = () => {
  return (
    <button className="btn-list">
      <img className="list-icon" src={iconList} alt="" />
    </button>
  );
};

export default List;
