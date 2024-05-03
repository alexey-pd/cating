export const rearrangeArray = <T>(array: T[]) =>
  array.map((value, index) => {
    const newIndex = (index + 1) % array.length;
    return array[newIndex];
  });
