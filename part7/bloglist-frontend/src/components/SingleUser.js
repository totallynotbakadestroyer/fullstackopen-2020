import React from "react";
import { Link } from "react-router-dom";
import { List, ListItem, ListItemText, Paper } from "@material-ui/core";

const SingleUser = ({ user }) => {
  if (!user) {
    return null;
  }

  return (
    <div>
      <h1>{user.name}</h1>
      <h2>Added blogs:</h2>
      <Paper>
        <List component={"nav"}>
          {user.blogs.map((blog) => (
            <ListItem
              button
              component={Link}
              to={`/blogs/${blog.id}`}
              key={blog.id}
            >
              <ListItemText primary={blog.title} />
            </ListItem>
          ))}
        </List>
      </Paper>
    </div>
  );
};

export default SingleUser;
