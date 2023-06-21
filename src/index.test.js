/* eslint-disable no-undef */
import deeperSortSetup from ".";

describe("index", () => {
  it("should sort paths alphabetically by keeping path1 before path2", () => {
    const aParams = {
      title: "path2/subPath1",
      name: "story1",
      tags: [],
      type: "story",
    };
    const bParams = {
      title: "path1/subPath2",
      name: "story2",
      tags: [],
      type: "story",
    };

    deeperSortSetup([]);

    expect(globalThis.deeperSort(aParams, bParams)).toBe(1);
  });

  it("should sort paths alphabetically by placing path1 after path2", () => {
    const aParams = {
      title: "path1/subPath2",
      name: "story2",
      tags: [],
      type: "story",
    };
    const bParams = {
      title: "path2/subPath1",
      name: "story1",
      tags: [],
      type: "story",
    };

    deeperSortSetup([]);

    expect(globalThis.deeperSort(aParams, bParams)).toBe(-1);
  });

  it("should sort 'customPath' before 'anotherPath' respecting order array", () => {
    const aParams = {
      title: "customPath/subPath2",
      name: "story2",
      tags: [],
      type: "story",
    };
    const bParams = {
      title: "anotherPath/subPath1",
      name: "story1",
      tags: [],
      type: "story",
    };

    deeperSortSetup(["customPath"]);

    expect(globalThis.deeperSort(aParams, bParams)).toBe(-1);
  });

  it("should sort 'customPath' before any other path respecting order array", () => {
    const aParams = {
      title: "customPath/subPath2",
      name: "story2",
      tags: [],
      type: "story",
    };
    const bParams = {
      title: "anotherPath/subPath1",
      name: "story1",
      tags: [],
      type: "story",
    };

    deeperSortSetup(["customPath", "*"]);

    expect(globalThis.deeperSort(aParams, bParams)).toBe(-1);
  });

  it("should sort 'anotherPath' after any other path respecting order array", () => {
    const aParams = {
      title: "customPath/subPath2",
      name: "story2",
      tags: [],
      type: "story",
    };
    const bParams = {
      title: "anotherPath/subPath1",
      name: "story1",
      tags: [],
      type: "story",
    };

    deeperSortSetup(["*", "anotherPath"]);

    expect(globalThis.deeperSort(aParams, bParams)).toBe(-1);
  });

  it("should sort subPaths alphabetically by keeping subPath1 before subPath2", () => {
    const aParams = { title: "path/subPath2", name: "story1", tags: [] };
    const bParams = { title: "path/subPath1", name: "story2", tags: [] };

    deeperSortSetup([]);

    expect(globalThis.deeperSort(aParams, bParams)).toBe(1);
  });

  it("should sort subPaths alphabetically by placing path1 after path2", () => {
    const aParams = { title: "path/subPath1", name: "story2", tags: [] };
    const bParams = { title: "path/subPath2", name: "story1", tags: [] };

    deeperSortSetup([]);

    expect(globalThis.deeperSort(aParams, bParams)).toBe(-1);
  });

  it("should sort 'customSubPath' before 'anotherSubPath' respecting order array", () => {
    const aParams = {
      title: "path/customSubPath",
      name: "story2",
      tags: [],
      type: "story",
    };
    const bParams = {
      title: "path/anotherSubPath",
      name: "story1",
      tags: [],
      type: "story",
    };

    deeperSortSetup(["*", ["customSubPath"]]);

    expect(globalThis.deeperSort(aParams, bParams)).toBe(-1);
  });

  it("should sort 'customSubPath' before 'anotherSubPath' under 'customPath' respecting order array", () => {
    const aParams = {
      title: "customPath/customSubPath",
      name: "story2",
      tags: [],
      type: "story",
    };
    const bParams = {
      title: "customPath/anotherSubPath",
      name: "story1",
      tags: [],
      type: "story",
    };

    deeperSortSetup(["customPath", ["customSubPath"]]);

    expect(globalThis.deeperSort(aParams, bParams)).toBe(-1);
  });

  it("should sort 'customSubPath' and 'anotherSubPath' alphabetically as they are not under 'customPath' respecting order array", () => {
    const aParams = {
      title: "path/customSubPath",
      name: "story1",
      tags: [],
      type: "story",
    };
    const bParams = {
      title: "path/anotherSubPath",
      name: "story2",
      tags: [],
      type: "story",
    };

    deeperSortSetup(["customPath", ["customSubPath"]]);

    expect(globalThis.deeperSort(aParams, bParams)).toBe(1);
  });

  it("should sort 'customSubPath' before any other subPath respecting order array", () => {
    const aParams = {
      title: "path/anotherSubPath",
      name: "story2",
      tags: [],
      type: "story",
    };
    const bParams = {
      title: "path/customSubPath",
      name: "story1",
      tags: [],
      type: "story",
    };

    deeperSortSetup(["*", ["customSubPath", "*"]]);

    expect(globalThis.deeperSort(aParams, bParams)).toBe(1);
  });

  it("should sort 'anotherSubPath' after any other subPath respecting order array", () => {
    const aParams = {
      title: "path/customSubPath",
      name: "story2",
      tags: [],
      type: "story",
    };
    const bParams = {
      title: "path/anotherSubPath",
      name: "story1",
      tags: [],
      type: "story",
    };

    deeperSortSetup(["*", ["*", "anotherSubPath"]]);

    expect(globalThis.deeperSort(aParams, bParams)).toBe(-1);
  });

  it("should sort 'customSubPath' before 'anotherSubPath' prioritizing path", () => {
    const aParams = {
      title: "path/customSubPath",
      name: "story2",
      tags: [],
      type: "story",
    };
    const bParams = {
      title: "path/anotherSubPath",
      name: "story1",
      tags: [],
      type: "story",
    };

    deeperSortSetup([
      "*",
      ["customSubPath", "anotherSubPath"],
      "path",
      ["anotherSubPath", "customSubPath"],
    ]);

    expect(globalThis.deeperSort(aParams, bParams)).toBe(1);
  });

  it("should sort stories alphabetically by keeping story1 before story2", () => {
    const aParams = { title: "path/subPath", name: "story2", tags: [] };
    const bParams = { title: "path/subPath", name: "story1", tags: [] };

    deeperSortSetup([]);

    expect(globalThis.deeperSort(aParams, bParams)).toBe(1);
  });

  it("should sort stories alphabetically by placing story1 after story2", () => {
    const aParams = { title: "path/subPath", name: "story1", tags: [] };
    const bParams = { title: "path/subPath", name: "story2", tags: [] };

    deeperSortSetup([]);

    expect(globalThis.deeperSort(aParams, bParams)).toBe(-1);
  });

  it("should sort 'customStory' before 'anotherStory' respecting order array", () => {
    const aParams = {
      title: "path/subPath",
      name: "customStory",
      tags: [],
      type: "story",
    };
    const bParams = {
      title: "path/subPath",
      name: "anotherStory",
      tags: [],
      type: "story",
    };

    deeperSortSetup(["*", ["*", ["customStory"]]]);

    expect(globalThis.deeperSort(aParams, bParams)).toBe(-1);
  });

  it("should sort 'customStory' before any other story respecting order array", () => {
    const aParams = {
      title: "path/subPath",
      name: "anotherStory",
      tags: [],
      type: "story",
    };
    const bParams = {
      title: "path/subPath",
      name: "customStory",
      tags: [],
      type: "story",
    };

    deeperSortSetup(["*", ["*", ["customStory", "*"]]]);

    expect(globalThis.deeperSort(aParams, bParams)).toBe(1);
  });

  it("should sort 'anotherStory' after any other story respecting order array", () => {
    const aParams = {
      title: "path/subPath",
      name: "customStory",
      tags: [],
      type: "story",
    };
    const bParams = {
      title: "path/subPath",
      name: "anotherStory",
      tags: [],
      type: "story",
    };

    deeperSortSetup(["*", ["*", ["*", "anotherStory"]]]);

    expect(globalThis.deeperSort(aParams, bParams)).toBe(-1);
  });

  it("should sort 'customStory' before any other story prioritizing subPath", () => {
    const aParams = {
      title: "path/subPath",
      name: "anotherStory",
      tags: [],
      type: "story",
    };
    const bParams = {
      title: "path/subPath",
      name: "customStory",
      tags: [],
      type: "story",
    };

    deeperSortSetup(["*", ["*", ["anotherStory"], "subPath", ["customStory"]]]);

    expect(globalThis.deeperSort(aParams, bParams)).toBe(1);
  });

  it("should not consider unattached-mdx Docs name in path", () => {
    const aParams = {
      title: "path",
      name: "Doc",
      tags: ["unattached-mdx"],
      type: "docs",
    };
    const bParams = {
      title: "path",
      name: "Story",
      tags: [],
      type: "story",
    };

    deeperSortSetup([]);

    expect(globalThis.deeperSort(aParams, bParams)).toBe(0);
  });

  it("should prioritize docs over stories", () => {
    const aParams = {
      title: "path",
      name: "Doc",
      tags: [],
      type: "docs",
    };
    const bParams = {
      title: "path",
      name: "customStory",
      tags: [],
      type: "story",
    };

    deeperSortSetup([]);

    expect(globalThis.deeperSort(aParams, bParams)).toBe(-1);
  });

  it("should not prioritize docs over stories", () => {
    const aParams = {
      title: "path",
      name: "Doc",
      tags: [],
      type: "docs",
    };
    const bParams = {
      title: "path",
      name: "customStory",
      tags: [],
      type: "story",
    };

    deeperSortSetup([], { docsFirst: false });

    expect(globalThis.deeperSort(aParams, bParams)).toBe(1);
  });
});
