/**
 * Accent Styles Utilities
 * 
 * This file contains utilities for generating deterministic accent styles
 * for service cards and other UI elements.
 * 
 * Used by: Main page component for service card styling
 */

/**
 * Generates deterministic accent styles for service cards
 * 
 * This function creates unique, visually appealing background patterns for each service card
 * using a deterministic pseudo-random number generator. This ensures each card gets a
 * consistent, unique pattern every time while maintaining visual variety.
 * 
 * @param idx - Index of the service card (0-based)
 * @returns CSS properties object with background gradient
 */
export const generateAccentStyle = (idx: number): React.CSSProperties => {
  /**
   * Deterministic pseudo-random number generator
   * Uses sine function with large multiplier for pseudo-random distribution
   * Returns value between 0 and 1
   */
  const rand = (n: number) => {
    const x = Math.sin((idx + 1) * (n + 1) * 12.9898) * 43758.5453;
    return x - Math.floor(x);
  };
  
  // Helper functions for generating CSS values
  const pct = (n: number) => `${Math.round(rand(n) * 100)}%`; // Percentage for positioning
  const sz = (n: number, min: number, max: number) => `${Math.round(min + rand(n) * (max - min))}px`; // Size within range
  
  // Three-color palette for visual variety
  const c1 = 'var(--accent-blue-2)';  // Light blue
  const c2 = '#00ff95';               // Bright green
  const c3 = 'var(--accent-pink-2)';  // Light pink
  
  /**
   * Creates a radial gradient string with specified parameters
   * @param w - Width of the gradient
   * @param h - Height of the gradient
   * @param atX - X position (percentage)
   * @param atY - Y position (percentage)
   * @param col - Color of the gradient
   * @param stop - Where the gradient stops (default 60%)
   */
  const g = (
    w: string,
    h: string,
    atX: string,
    atY: string,
    col: string,
    stop = '60%'
  ) => `radial-gradient(${w} ${h} at ${atX} ${atY}, ${col}, transparent ${stop})`;
  
  // Generate three overlapping radial gradients for complex visual effect
  const bg = [
    g(sz(1, 240, 340), sz(2, 180, 280), pct(3), pct(4), c1),      // Large blue gradient
    g(sz(5, 220, 320), sz(6, 160, 260), pct(7), pct(8), c2, '65%'), // Medium green gradient
    g(sz(9, 240, 340), sz(10, 180, 260), pct(11), pct(12), c3, '62%'), // Large pink gradient
  ].join(',');
  
  return { background: bg };
};
