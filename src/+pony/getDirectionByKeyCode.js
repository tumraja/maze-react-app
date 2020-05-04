export function getDirectionByKeyCode(keyCode) {
    const supportedKeyCodes = [37, 38, 39, 40];

    if (!supportedKeyCodes.includes(keyCode)) {
        return undefined;
    }

    const moveKeyMapper = {
        37: {direction: 'west'},
        38: {direction: 'north'},
        39: {direction: 'east'},
        40: {direction: 'south'}
    };

    return moveKeyMapper[keyCode].direction;
}
