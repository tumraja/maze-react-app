import React from 'react'
import { render } from '@testing-library/react'
import { Home } from "./Home";

test('Home Component', () => {
    const { container } = render(<Home />);

    const headerElement = container.querySelector("h1");
    const anchorElement = container.querySelector("a");

    expect(headerElement.childElementCount).toBe(2);
    expect(headerElement.children[0].textContent).toBe("Help to save the pony");
    expect(headerElement.children[1].textContent).toBe("from the Domokun");
    expect(anchorElement.getAttribute('href')).toBe("/game");
    expect(anchorElement.textContent).toBe("Create new maze game")
});
