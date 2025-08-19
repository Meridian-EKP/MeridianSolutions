/**
 * Shine Direction Utilities
 * 
 * This file contains utilities for determining the direction of shine effects
 * on interactive cards based on mouse entry/exit points.
 * 
 * Used by: Main page component for cycle card shine animations
 */

/**
 * Determines the direction of the shine effect based on mouse entry/exit point
 * 
 * This function calculates which edge of the card the mouse entered/exited from
 * and returns the appropriate CSS class for the directional shine animation.
 * 
 * @param e - Mouse event containing clientX and clientY coordinates
 * @param element - The card element to calculate relative positions
 * @param isEntering - Boolean indicating if this is an entry (true) or exit (false) event
 * @returns CSS class name for the directional shine animation
 */
export const getShineDirection = (e: React.MouseEvent, element: HTMLElement, isEntering: boolean): string => {
  // Get the card's position and dimensions relative to the viewport
  const rect = element.getBoundingClientRect();
  const x = e.clientX - rect.left; // Mouse X position relative to card left edge
  const y = e.clientY - rect.top;  // Mouse Y position relative to card top edge
  const w = rect.width;  // Card width
  const h = rect.height; // Card height
  
  // Calculate distances from each edge to determine closest edge
  const distFromTop = y;                    // Distance from top edge
  const distFromBottom = h - y;             // Distance from bottom edge
  const distFromLeft = x;                   // Distance from left edge
  const distFromRight = w - x;              // Distance from right edge
  
  // Find which edge is closest (where mouse entered/exited)
  const minDist = Math.min(distFromTop, distFromBottom, distFromLeft, distFromRight);
  
  if (isEntering) {
    // Entrance: shine goes FROM the entry edge to the opposite side
    if (minDist === distFromTop) return 'shine-top-to-bottom';
    if (minDist === distFromBottom) return 'shine-bottom-to-top';
    if (minDist === distFromLeft) return 'shine-left-to-right';
    if (minDist === distFromRight) return 'shine-right-to-left';
  } else {
    // Exit: shine goes TO the exit edge (reverse direction)
    // Note: Exit animations are currently disabled per user request
    if (minDist === distFromTop) return 'shine-bottom-to-top'; // towards top
    if (minDist === distFromBottom) return 'shine-top-to-bottom'; // towards bottom
    if (minDist === distFromLeft) return 'shine-right-to-left'; // towards left
    if (minDist === distFromRight) return 'shine-left-to-right'; // towards right
  }
  
  return 'shine-left-to-right'; // fallback direction
};

/**
 * Available shine direction CSS classes
 */
export const SHINE_DIRECTIONS = {
  TOP_TO_BOTTOM: 'shine-top-to-bottom',
  BOTTOM_TO_TOP: 'shine-bottom-to-top',
  LEFT_TO_RIGHT: 'shine-left-to-right',
  RIGHT_TO_LEFT: 'shine-right-to-left'
} as const;

export type ShineDirection = typeof SHINE_DIRECTIONS[keyof typeof SHINE_DIRECTIONS];
