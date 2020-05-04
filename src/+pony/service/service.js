const URL = 'https://ponychallenge.trustpilot.com/pony-challenge/maze';

export async function createMaze(data) {
    const params = {
        'maze-width': parseInt(data.width),
        'maze-height': parseInt(data.height),
        'maze-player-name': data.ponyName,
        difficulty: parseInt(data.level)
    };

    const response = await fetch(URL, {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(params)
    });

    if (!response.ok && response.status === 400) {
        return response.text();
    }
    return response.json();
}

export async function move(direction, mazeId) {
    const response = await fetch(`${URL}/${mazeId}`, {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({direction: direction})
    });
    return response.json();
}

export async function getMaze(mazeId) {
    const response = await fetch(`${URL}/${mazeId}`);
    return response.json();
}

export async function printMaze(mazeId) {
    const response = await fetch(`${URL}/${mazeId}/print`);
    return response.text();
}
