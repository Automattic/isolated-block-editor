/**
 * Helper to generate mock transport modules for an isolated channel.
 *
 * @param {number} count - Number of transport modules to generate.
 * @return {Object[]} - Array of transport modules.
 */
export function getTransports(count: number): any[];
/**
 * Emulate a pause between typing events for Yjs to make a new undo stack item.
 *
 * Requires jest.useRealTimers().
 *
 * @param {import('@testing-library/dom').Screen} screen
 */
export function pauseTyping(screen: import('@testing-library/dom').Screen): Promise<void>;
//# sourceMappingURL=utils.d.ts.map