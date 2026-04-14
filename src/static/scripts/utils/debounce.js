/**
 * Tiny debounce function for text/search input elements
 *
 * @param {*} func What function we want to run after the debounce
 * @param {*} delay When do we run it?
 * @returns {(...args: {}) => void} 
 */
const debounce = (func, delay) => {
    // When this function triggers we want to reset the timeout so we store our setTimeout
    let timeoutId;
    return function (...args) {
        // Clear first
        clearTimeout(timeoutId);

        // Then we set the new timeout
        timeoutId = setTimeout(() => {
            func.apply(this, args);
        }, delay);
    };
}

export default debounce