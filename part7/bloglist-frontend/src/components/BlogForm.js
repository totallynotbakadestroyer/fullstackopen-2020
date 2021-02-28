import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createBlog } from "../reducers/blogsReducer.js";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  textField: {
    marginBottom: 15,
  },
}));

const BlogForm = () => {
  const [visible, setVisible] = useState(false);
  const [author, setBlogAuthor] = useState("");
  const [title, setBlogTitle] = useState("");
  const [url, setBlogUrl] = useState("");

  const dispatch = useDispatch();
  const classes = useStyles();

  const createNew = (event) => {
    event.preventDefault();
    dispatch(createBlog({ author, title, url }));
    setBlogTitle("");
    setBlogAuthor("");
    setBlogUrl("");
    setVisible(false);
  };

  return (
    <div>
      <div>
        <Button
          variant={"outlined"}
          style={{ marginBottom: 15 }}
          className="toggleVisible"
          onClick={() => setVisible(true)}
        >
          new blog
        </Button>
      </div>
      <Dialog fullWidth onClose={() => setVisible(false)} open={visible}>
        <DialogTitle>create new</DialogTitle>
        <form onSubmit={createNew}>
          <DialogContent>
            <TextField
              onChange={({ target }) => setBlogTitle(target.value)}
              value={title}
              type="text"
              name="title"
              label={"Title"}
              id="title"
              className={classes.textField}
              fullWidth
            />
            <TextField
              value={author}
              onChange={({ target }) => setBlogAuthor(target.value)}
              type="text"
              name="author"
              id="author"
              label={"Author"}
              className={classes.textField}
              fullWidth
            />
            <TextField
              onChange={({ target }) => setBlogUrl(target.value)}
              value={url}
              type="text"
              name="url"
              id="url"
              label={"URL"}
              className={classes.textField}
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button
              size={"small"}
              className="closeVisible"
              type="button"
              onClick={() => setVisible(false)}
            >
              close
            </Button>
            <Button size={"small"} type="submit">
              add new
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
};

export default BlogForm;
