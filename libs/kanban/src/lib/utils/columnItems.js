 export const getItems = (count) =>
    Array.from({ length: count }, (column, element) => element).map((element,) => ({
      id: `list-${element}`,
      title: `Fake Title ${element}`,
      image:`https://picsum.photos/200/300?random=${Math.random()}`,
      children: [
        { id:`list-${element + 1}`,  title: `Fake Title ${element +1}`, children: [] },
      ]
      
    }));