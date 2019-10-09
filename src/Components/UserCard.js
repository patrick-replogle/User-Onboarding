import React from "react";

const UserCard = props => {
  console.log(props);
  return (
    <div className="userCard">
      <p>Name: {props.user.name}</p>
      <p>Email: {props.user.email}</p>
      <p>Password: {props.user.password}</p>
      <p>Role: {props.user.role}</p>
      <p>Date: {props.user.date}</p>
      <p>Note: {props.user.note}</p>
      <p>Education: {props.user.education}</p>
    </div>
  );
};

export default UserCard;
