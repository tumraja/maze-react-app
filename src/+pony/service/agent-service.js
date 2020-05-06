export function determineAllPossiblePositions(current, mazeWidth, mazeData, visitedPositions, markedPositions, possiblePositionsToReachTheGoal, mazeHeight) {
    const northMove = current - mazeWidth;
    if (
        northMove >= 0 &&
        !mazeData[current].includes('north') &&
        !visitedPositions.includes(northMove)
    ) {
        visitedPositions.push(northMove);
        markedPositions.push(northMove);
        possiblePositionsToReachTheGoal[northMove] = current;
    }

    const southMove = current + mazeWidth;
    if (
        southMove < mazeWidth * mazeHeight &&
        !mazeData[southMove].includes('north') &&
        !visitedPositions.includes(southMove)
    ) {
        visitedPositions.push(southMove);
        markedPositions.push(southMove);
        possiblePositionsToReachTheGoal[southMove] = current;
    }

    const eastMove = current + 1;
    if (eastMove % mazeWidth !== 0 &&
        !mazeData[eastMove].includes('west') &&
        !visitedPositions.includes(eastMove)
    ) {
        visitedPositions.push(eastMove);
        markedPositions.push(eastMove);
        possiblePositionsToReachTheGoal[eastMove] = current;
    }

    const westMove = current - 1;
    if (
        current % mazeWidth !== 0 &&
        !mazeData[current].includes('west') &&
        !visitedPositions.includes(westMove)
    ) {
        visitedPositions.push(westMove);
        markedPositions.push(westMove);
        possiblePositionsToReachTheGoal[westMove] = current;
    }
}


export function getDirections(currentPosition, ponyPosition, goalPosition, mazeWidth, possiblePositions) {
    let position = goalPosition;
    const directions = [];

    while (currentPosition !== ponyPosition) {
        position = currentPosition;
        currentPosition = possiblePositions[currentPosition];

        if (position + 1 === currentPosition) {
            directions.push('west');
        } else if (position - 1 === currentPosition) {
            directions.push('east');
        } else if (position - mazeWidth === currentPosition) {
            directions.push('south');
        } else if (position + mazeWidth === currentPosition) {
            directions.push('north');
        }
    }

    return directions.reverse();
}
