const binarySearch = (dim) =>
  function bin(start, end) {
    const guess = Math.floor((start + end) / 2);
    if (window.matchMedia(`(${dim}: ${guess}px)`).matches) {
      return guess;
    }
    return window.matchMedia(`(min-${dim}: ${guess}px)`).matches
      ? bin(guess, end)
      : bin(start, guess);
  };

export const getCorrectDimension = (dim = "width", range = 2000) => {
  let prop = "inner" + dim.charAt(0).toUpperCase() + dim.slice(1);
  return new Promise((res, rej) => {
    setTimeout(() => {
      if (window.matchMedia(`(${dim}: ${window[prop]}px)`).matches) {
        res(window[prop]);
      }
      const start = window[prop] - range >= 0 ? window[prop] - range : 0;
      const end = window[prop] + range;
      res(binarySearch(dim)(start, end));
    }, 50);
  });
};
