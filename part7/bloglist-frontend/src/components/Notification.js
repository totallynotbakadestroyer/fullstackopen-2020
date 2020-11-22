import React from "react";
import { useSelector } from "react-redux";
import { Alert } from "@material-ui/lab";

const Notification = () => {
  const notification = useSelector((state) => state.notifications);
  if (notification === null) {
    return null;
  }
  return <Alert color={notification.type}>{notification.message}</Alert>;
};

export default Notification;
