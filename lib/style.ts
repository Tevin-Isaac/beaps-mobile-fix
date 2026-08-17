// Auto-fit grid track that can never force horizontal overflow on
// narrow phones: the min track size shrinks to the container width
// instead of staying pinned at `px`.
export const autoFit = (px: number): string => `repeat(auto-fit, minmax(min(${px}px, 100%), 1fr))`;
