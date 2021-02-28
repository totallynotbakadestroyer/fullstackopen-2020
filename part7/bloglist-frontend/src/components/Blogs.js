import React from "react";
import { useSelector } from "react-redux";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import TableHead from "@material-ui/core/TableHead";
import Table from "@material-ui/core/Table";
import TableContainer from "@material-ui/core/TableContainer";
import TableBody from "@material-ui/core/TableBody";
import { Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";

const Blogs = () => {
  const blogs = useSelector((state) => state.blogs);

  const useStyles = makeStyles({
    table: {
      minWidth: "100%",
    },
  });
  const classes = useStyles();

  return (
    <TableContainer style={{ width: "100%" }} component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Blog name</TableCell>
            <TableCell align="right">Author</TableCell>
            <TableCell align="right">Added by</TableCell>
            <TableCell align="right">Total Likes</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {blogs.map((blog) => (
            <TableRow key={blog.id}>
              {console.log(blog)}
              <TableCell component="th" scope="row">
                {blog.title}
              </TableCell>
              <TableCell align="right">{blog.author}</TableCell>
              <TableCell component={Link} to={`/users/${blog.creator.id}`} align="right">
                {blog.creator.name}
              </TableCell>
              <TableCell align="right">{blog.likes}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default Blogs;
