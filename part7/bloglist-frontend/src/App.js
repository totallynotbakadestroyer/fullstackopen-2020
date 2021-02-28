import React, { useEffect } from "react";
import LoginForm from "./components/LoginForm.js";
import Blogs from "./components/Blogs.js";
import BlogForm from "./components/BlogForm";
import Notification from "./components/Notification.js";
import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import { initBlogs } from "./reducers/blogsReducer.js";
import { initAuth, logout } from "./reducers/authReducer.js";
import { Switch, Route, useRouteMatch, Link } from "react-router-dom";
import Users from "./components/Users.js";
import SingleUser from "./components/SingleUser.js";
import { initUsers } from "./reducers/usersReducer.js";
import SingleBlog from "./components/SingleBlog.js";
import { Box, Button, Container, Toolbar } from "@material-ui/core";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  menuButton: {
    marginRight: theme.spacing(2),
    color: "white",
  },
}));

const App = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const users = useSelector((state) => state.users);
  const blogs = useSelector((state) => state.blogs);

  const userById = (id) => users.find((a) => a.id === id);
  const blogById = (id) => blogs.find((a) => a.id === id);

  const classes = useStyles();

  const userMatch = useRouteMatch("/users/:id");
  const blogMatch = useRouteMatch("/blogs/:id");

  const user = userMatch ? userById(userMatch.params.id) : null;
  const blog = blogMatch ? blogById(blogMatch.params.id) : null;

  const handleLogout = () => {
    dispatch(logout());
  };

  useEffect(() => {
    dispatch(initBlogs());
    dispatch(initAuth());
    dispatch(initUsers());
  }, [dispatch]);

  if (!auth) {
    return <LoginForm />;
  }
  return (
    <div>
      <CssBaseline />
      <AppBar position={"static"} style={{ marginBottom: 15 }}>
        <Toolbar style={{ display: "flex" }}>
          <Typography
            color={"inherit"}
            style={{ textDecoration: "none", flex: 1 }}
            component={Link}
            to={"/"}
            variant="h6"
            noWrap
          >
            Blog-list
          </Typography>
          <Button component={Link} to={"/users"} className={classes.menuButton}>
            All Users
          </Button>
          <Button component={Link} to={"/"} className={classes.menuButton}>
            All Blogs
          </Button>
          <Button onClick={handleLogout} className={classes.menuButton}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>
      <main>
        <Container maxWidth={"xl"}>
          <Box>
            <Switch>
              <Route path={"/blogs/:id"}>
                <SingleBlog blog={blog} />
              </Route>
              <Route path={"/users/:id"}>
                <SingleUser user={user} />
              </Route>
              <Route path={"/users"}>
                <Users users={users} />
              </Route>
              <Route path={"/"}>
                <div>
                  <Notification notification />
                  <BlogForm />
                </div>
                <Blogs />
              </Route>
            </Switch>
          </Box>
        </Container>
      </main>
    </div>
  );
};

export default App;
