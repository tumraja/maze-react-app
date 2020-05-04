import React from 'react'
import { render } from '@testing-library/react'
import { GameIntro } from "./GameIntro";

test('GameIntro Component', () => {
    const { container, getByText } = render(<GameIntro />);
    const primaryIntroText = getByText(/Create a new Maze game/i);

    const paragraphs = container.getElementsByTagName("p");
    const summary = container.getElementsByTagName("summary");

    expect(primaryIntroText).toBeInTheDocument();
    expect(paragraphs.length).toBe(3);
    expect(summary).toBeTruthy()
});
