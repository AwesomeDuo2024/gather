// https://refine.dev/blog/react-unit-testing/#snapshot-testing
// https://nextjs.org/docs/app/building-your-application/testing/jest

import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import NavBar from "../NavBar";
import React from "react";

describe("NavBar", () => {
  test("should render logo", () => {
    // render component in virtual dom
    render(<NavBar />);

    // select elements
    const logo = screen.getByTestId("logo");

    // assert presence and/or text of elements selected
    expect(logo).toBeInTheDocument();
  });

  test("should render 'How to use' nav link", () => {
    render(<NavBar />);
    const faqLink = screen.getByTestId("faq-link");
    expect(faqLink).toBeInTheDocument();
    expect(faqLink).toHaveTextContent("How to use");
  });

  test("should render 'Donate' nav link", () => {
    render(<NavBar />);
    const donateLink = screen.getByTestId("donate-link");
    expect(donateLink).toBeInTheDocument();
    expect(donateLink).toHaveTextContent("Donate");
  });
});

describe("NavBar component matches snapshot", () => {
  test("should match snapshot", () => {
    const { asFragment } = render(<NavBar />);
    expect(asFragment()).toMatchSnapshot();
  });
});
