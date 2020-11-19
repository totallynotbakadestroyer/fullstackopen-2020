import BlogForm from "./BlogForm";
import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { fireEvent, render } from "@testing-library/react";

describe("Blog form", () => {
  let component;
  beforeEach(() => {
    component = render(<BlogForm />);
  });
  test("should be hidden by default", () => {
    const div = component.container.querySelector(".toggleableContent");
    expect(div).toHaveStyle("display: none");
  });
  test("should be visible after pressing button", () => {
    const button = component.container.querySelector(".toggleVisible");
    fireEvent.click(button);
    const div = component.container.querySelector(".toggleableContent");
    expect(div).not.toHaveStyle("display: none");
  });
  test("should not be visible after pressing close button", () => {
    const show = component.container.querySelector(".toggleVisible");
    const close = component.container.querySelector(".closeVisible");
    fireEvent.click(show);
    const div = component.container.querySelector(".toggleableContent");
    expect(div).not.toHaveStyle("display: none");
    fireEvent.click(close);
    expect(div).toHaveStyle("display: none");
  });
  test("should return proper props after creating new blog", () => {
    const handleNewBlog = jest.fn();
    component = render(<BlogForm handleNewBlog={handleNewBlog} />);
    const form = component.container.querySelector("form");
    const authorInput = component.container.querySelector("#author");
    const titleInput = component.container.querySelector("#title");
    const urlInput = component.container.querySelector("#url");
    fireEvent.change(authorInput, {
      target: { value: "TestAuthor" },
    });
    fireEvent.change(titleInput, {
      target: { value: "TestTitle" },
    });
    fireEvent.change(urlInput, {
      target: { value: "TestUrl" },
    });
    fireEvent.submit(form);
    expect(handleNewBlog.mock.calls).toHaveLength(1);
    expect(handleNewBlog.mock.calls[0][0]).toEqual({
      author: "TestAuthor",
      title: "TestTitle",
      url: "TestUrl",
    });
  });
});
