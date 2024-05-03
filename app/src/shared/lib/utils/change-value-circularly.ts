export const changeValueCircularly =
  (count: number) => (currentIndex: number, length: number) => {
    const result = [currentIndex];
    let next = currentIndex;

    // eslint-disable-next-line no-plusplus
    for (let i = 2; i <= count; i++) {
      next = (next + 1) % length;
      result.push(next);
    }

    return result;
  };
