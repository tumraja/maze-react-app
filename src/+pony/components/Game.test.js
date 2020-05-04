import React from 'react';
import { render } from '@testing-library/react'
import { Game } from "./Game";
import { BrowserRouter } from "react-router-dom";

test('Game Component with status InActive', () => {
    const { container } = render(<BrowserRouter><Game /></BrowserRouter>);

    const spanElementWithTitle = container.querySelector("span.Game-primary--main");
    expect(spanElementWithTitle.textContent).toBe("Create a new Maze game");

    const summaryElement = container.querySelector("summary");
    expect(summaryElement.textContent).toBe("Important information");

    const pElements = container.getElementsByTagName("p");
    expect(pElements.length).toBe(3);

    const inputElements = container.getElementsByTagName("input");
    expect(inputElements.length).toBe(3);
});


test('Game Component with status Active', () => {
});

test('Game Component with status Won', () => {
});

test('Game Component with status Lost', () => {
});
