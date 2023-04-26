const directionTypes = ['fl', 'fr', 'rl', 'rr'] as const
export type DirectionType = (typeof directionTypes)[number]
