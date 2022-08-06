const getOrder = (item, orderObject) =>
  orderObject[item]?.order ?? Object.keys(orderObject).length;

const compare = (a, b, orderObject) => {
  if (orderObject) {
    if (a in orderObject && b in orderObject) {
      return getOrder(a, orderObject) - getOrder(b, orderObject);
    }

    if (a in orderObject) {
      return getOrder(a, orderObject) - getOrder("*", orderObject);
    }

    if (b in orderObject) {
      return getOrder("*", orderObject) - getOrder(b, orderObject);
    }
  }

  return a.localeCompare(b);
};

const transformArrayIntoOrderObject = (arr, obj = {}) => {
  arr?.forEach((item, index, array) => {
    if (typeof item === "string") {
      obj[item] = { order: index, children: null };
    }

    if (Array.isArray(item)) {
      if (typeof array[index - 1] !== "string") {
        return obj;
      }

      obj[array[index - 1]].children = transformArrayIntoOrderObject(
        item,
        obj[index - 1]
      );
    }
  });

  return obj;
};

const storySort = (orderArray) => {
  const orderObject = transformArrayIntoOrderObject(orderArray);

  return (a, b) => {
    const aStoryName = a[1].story;
    const bStoryName = b[1].story;

    const aPaths = a[1].kind.split("/").concat(aStoryName);
    const bPaths = b[1].kind.split("/").concat(bStoryName);

    const matchingLevels =
      aPaths.length < bPaths.length ? aPaths.length : bPaths.length;

    let currentOrderObj = orderObject;

    for (let level = 0; level < matchingLevels; level++) {
      if (level > 0) {
        currentOrderObj =
          currentOrderObj?.[aPaths[level - 1]]?.children ||
          currentOrderObj?.["*"]?.children;
      }

      if (aPaths[level] !== bPaths[level]) {
        return compare(aPaths[level], bPaths[level], currentOrderObj);
      }
    }

    return 0;
  };
};

export default storySort;
