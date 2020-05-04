import React from 'react';
import { render, fireEvent, screen } from "@testing-library/react";
import { GameControl } from "./GameControl";

test('GameFormInput Component', () => {
    const { container, rerender } = render(<GameControl direction={'direction1'} icon={'keyboardIcon'} />);

    const firstControl = container.querySelector(`[class="PlayGame-control"]`);

    expect(firstControl.children[0].textContent).toBe('keyboardIcon');

    rerender(<GameControl direction={'direction2'} icon={'icon'} onMoveChange={move}/>);

    const secondControl = container.querySelector(`[class="PlayGame-control"]`);
    expect(secondControl.children[0].textContent).toBe('icon');

    // check if when the button is clicked will return expected direction
    fireEvent.click(screen.getByText(/icon/i));
    function move(e) {
        expect(e).toBe('direction2')
    }
});
