 export const getItems = (count) =>
    Array.from({ length: count }, (column, element) => element).map((element) => ({
      id: `list-${element}`,
      title: `Fake Title ${element}`,
    }));