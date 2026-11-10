// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';

// jsdom implements none of the browser APIs below. The app treats each of them
// as progressive enhancement, so inert stand-ins are enough to render it.
window.matchMedia = (query) => ({
    matches: false,
    media: query,
    addEventListener: () => {},
    removeEventListener: () => {},
});

window.scrollTo = () => {};

class InertObserver {
    observe() {}

    unobserve() {}

    disconnect() {}
}

window.IntersectionObserver = InertObserver;
window.ResizeObserver = InertObserver;

// There is no WebGL in jsdom, and three.js ships as ESM that Jest cannot load,
// so the canvases are stubbed out. They are decorative; the pages render
// their CSS fallbacks without them.
jest.mock('./webgl/HeroCanvas', () => () => null);
jest.mock('./webgl/SignalCanvas', () => () => null);
jest.mock('./webgl/ShowcaseCanvas', () => () => null);
