import React from 'react';
import { GameFormInput } from "./GameFormInput";
import { render } from "@testing-library/react";

test('GameFormInput Component', () => {
    const { container, rerender } = render(<GameFormInput type={'text'} name={'pony'} paramValue={'PonyName'} />);

    const textInputElement = container.querySelector(`[name="pony"]`);

    expect(textInputElement.getAttribute('value')).toBe('PonyName');
    expect(textInputElement.getAttribute('type')).toBe('text');

    rerender(<GameFormInput type={'number'} name={'wWidth'} paramValue={20} />);

    const numberInputElement = container.querySelector(`[name="wWidth"]`);

    expect(numberInputElement.getAttribute('value')).toBe("20");
    expect(numberInputElement.getAttribute('type')).toBe('number');

    rerender(<GameFormInput type={'number'} name={'wWidth'} paramValue={20}/>);

    const secondNumberInputElement = container.querySelector(`[name="wWidth"]`);

    expect(secondNumberInputElement.getAttribute('value')).toBe("20");
    secondNumberInputElement.setAttribute('value', 200);
    expect(secondNumberInputElement.getAttribute('value')).toBe("200");
    expect(secondNumberInputElement.getAttribute('type')).toBe('number');
});
