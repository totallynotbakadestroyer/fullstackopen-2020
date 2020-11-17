import React from "react";
import { useSelector } from "react-redux";

const Notification = () => {
  const notification = useSelector((state) => state.notifications);
  const style = {
    border: "solid",
    padding: 10,
    borderWidth: 1,
  };
  if (notification.type) {
    return (
      <div style={style}>
        <p>
          {notification.type === "VOTE" ? "you voted " : "you added "}'
          {notification.content}'
        </p>
      </div>
    );
  } else {
    return null;
  }
};

export default Notification;
