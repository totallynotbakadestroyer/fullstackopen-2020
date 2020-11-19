import React from "react";
import { useSelector } from "react-redux";

const Notification = () => {
  const notification = useSelector((state) => state.notifications);
  if (notification === null) {
    return null;
  }
  return <div className={notification.type}>{notification.content}</div>;
};

export default Notification;
