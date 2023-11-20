
function RandomFloat(floor: number, ceiling: number):number {
    return Math.random() * (ceiling - floor) + floor;
}

export default RandomFloat;