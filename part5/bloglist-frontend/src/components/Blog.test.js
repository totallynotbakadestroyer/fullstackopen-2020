import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { fireEvent, render } from "@testing-library/react";
import Blogs from "./blogs";

describe("Single blog render", () => {
  let component;
  beforeEach(() => {
    const blog = [
      {
        likes: 0,
        title: "Component testing is done with react-testing-library",
        author: "test",
        url: "none.com",
        creator: {
          name: "faggot",
          username: "faggot",
          id: "5fac410f0d7c89231492b9ca",
        },
        id: "5faf4db252e2d604a4a586ea",
      },
    ];

    component = render(<Blogs blogs={blog} />);
  });

  test("renders component", () => {
    expect(component.container).toHaveTextContent(
      "Component testing is done with react-testing-library"
    );
  });

  test("full info is hidden by default", () => {
    const div = component.container.querySelector(".toggleableContent");
    expect(div).toHaveStyle("display: none");
  });

  test("full info is shown when button 'view' is clicked", () => {
    const button = component.container.querySelector(".toggleVisible");
    fireEvent.click(button);
    const div = component.container.querySelector(".toggleableContent");
    expect(div).not.toHaveStyle("display: none");
  });

  test("full info is shown when button 'view' is clicked", () => {
    const button = component.container.querySelector(".toggleVisible");
    fireEvent.click(button);
    const div = component.container.querySelector(".toggleableContent");
    expect(div).not.toHaveStyle("display: none");
  });

  test("full info is shown when button 'view' is clicked", () => {
    const button = component.container.querySelector(".toggleVisible");
    fireEvent.click(button);
    const div = component.container.querySelector(".toggleableContent");
    expect(div).not.toHaveStyle("display: none");
  });

  test("like updates prop and calls like()", () => {
    const blog = [
      {
        likes: 0,
        title: "Component testing is done with react-testing-library",
        author: "test",
        url: "none.com",
        creator: {
          name: "faggot",
          username: "faggot",
          id: "5fac410f0d7c89231492b9ca",
        },
        id: "5faf4db252e2d604a4a586ea",
      },
    ];
    const handleUpdate = jest.fn()
    component = render(<Blogs blogs={blog} handleUpdate={handleUpdate} />);
    const button = component.container.querySelector(".toggleLike");
    fireEvent.click(button);
    fireEvent.click(button);
    expect(handleUpdate.mock.calls).toHaveLength(2);
    expect(blog[0].likes).toEqual(2);
  });
});
