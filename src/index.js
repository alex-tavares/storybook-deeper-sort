const getOrder = (item, orderObject) =>
  orderObject[item]?.order ?? Object.keys(orderObject).length;

const compare = ({ aFile, bFile, orderObject, docsFirst }) => {
  if (docsFirst) {
    if (aFile.type === "docs" && bFile.type === "docs") {
      return aFile.name.localeCompare(bFile.name);
    }

    if (aFile.type === "docs") {
      return -1;
    }

    if (bFile.type === "docs") {
      return 1;
    }
  }

  if (orderObject) {
    if (aFile.name in orderObject && bFile.name in orderObject) {
      return (
        getOrder(aFile.name, orderObject) - getOrder(bFile.name, orderObject)
      );
    }

    if (aFile.name in orderObject) {
      return getOrder(aFile.name, orderObject) - getOrder("*", orderObject);
    }

    if (bFile.name in orderObject) {
      return getOrder("*", orderObject) - getOrder(bFile.name, orderObject);
    }
  }

  return aFile.name.localeCompare(bFile.name);
};

const transformArrayIntoOrderObject = (arr, obj = {}) => {
  arr?.forEach((item, index, array) => {
    if (typeof item === "string") {
      obj[item] = { order: index, children: null };
    }

    if (Array.isArray(item)) {
      const parent = array[index - 1];

      if (typeof parent !== "string") {
        return obj;
      }

      obj[parent].children = transformArrayIntoOrderObject(item);
    }
  });

  return obj;
};

const deeperSortSetup = (orderArray, config = {}) => {
  const { docsFirst = true } = config;
  const orderObject = transformArrayIntoOrderObject(orderArray);

  // eslint-disable-next-line no-undef
  globalThis.deeperSort = (a, b) => {
    const aPaths = a.tags.includes("unattached-mdx")
      ? a.title.split("/")
      : a.title.split("/").concat(a.name);

    const bPaths = b.tags.includes("unattached-mdx")
      ? b.title.split("/")
      : b.title.split("/").concat(b.name);

    const matchingLevels = Math.min(aPaths.length, bPaths.length);

    let currentOrderObj = orderObject;

    for (let level = 0; level < matchingLevels; level++) {
      if (level > 0) {
        currentOrderObj =
          currentOrderObj?.[aPaths[level - 1]]?.children ||
          currentOrderObj?.["*"]?.children;
      }

      if (aPaths[level] !== bPaths[level]) {
        return compare({
          aFile: {
            name: aPaths[level],
            type: level === aPaths.length - 1 ? a.type : "dir",
          },
          bFile: {
            name: bPaths[level],
            type: level === bPaths.length - 1 ? b.type : "dir",
          },
          orderObject: currentOrderObj,
          docsFirst,
        });
      }
    }

    return 0;
  };
};

export default deeperSortSetup;
