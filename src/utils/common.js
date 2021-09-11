export const isOnline = () => window.navigator.onLine;

export const isEscapeEvent = (evt) => evt.key === 'Escape' || evt.key === 'Esc';
