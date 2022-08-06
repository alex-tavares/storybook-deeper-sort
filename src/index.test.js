import storySort from ".";

const getParams = ({ path, storyName }) => [, { kind: path, story: storyName }];

describe("index", () => {
  it("should sort paths alphabetically by keeping path1 before path2", () => {
    const aParams = getParams({
      path: "path2/subPath1",
      storyName: "story1",
    });
    const bParams = getParams({
      path: "path1/subPath2",
      storyName: "story2",
    });

    expect(storySort([])(aParams, bParams)).toBe(1);
  });

  it("should sort paths alphabetically by placing path1 after path2", () => {
    const aParams = getParams({
      path: "path1/subPath2",
      storyName: "story2",
    });
    const bParams = getParams({
      path: "path2/subPath1",
      storyName: "story1",
    });

    expect(storySort([])(aParams, bParams)).toBe(-1);
  });

  it("should sort 'customPath' before 'anotherPath' respecting order array", () => {
    const aParams = getParams({
      path: "customPath/subPath2",
      storyName: "story2",
    });
    const bParams = getParams({
      path: "anotherPath/subPath1",
      storyName: "story1",
    });

    expect(storySort(["customPath"])(aParams, bParams)).toBe(-1);
  });

  it("should sort 'customPath' before any other path respecting order array", () => {
    const aParams = getParams({
      path: "customPath/subPath2",
      storyName: "story2",
    });
    const bParams = getParams({
      path: "anotherPath/subPath1",
      storyName: "story1",
    });

    expect(storySort(["customPath", "*"])(aParams, bParams)).toBe(-1);
  });

  it("should sort 'anotherPath' after any other path respecting order array", () => {
    const aParams = getParams({
      path: "customPath/subPath2",
      storyName: "story2",
    });
    const bParams = getParams({
      path: "anotherPath/subPath1",
      storyName: "story1",
    });

    expect(storySort(["*", "anotherPath"])(aParams, bParams)).toBe(-1);
  });

  it("should sort subPaths alphabetically by keeping subPath1 before subPath2", () => {
    const aParams = getParams({ path: "path/subPath2", storyName: "story1" });
    const bParams = getParams({ path: "path/subPath1", storyName: "story2" });

    expect(storySort([])(aParams, bParams)).toBe(1);
  });

  it("should sort subPaths alphabetically by placing path1 after path2", () => {
    const aParams = getParams({ path: "path/subPath1", storyName: "story2" });
    const bParams = getParams({ path: "path/subPath2", storyName: "story1" });

    expect(storySort([])(aParams, bParams)).toBe(-1);
  });

  it("should sort 'customSubPath' before 'anotherSubPath' respecting order array", () => {
    const aParams = getParams({
      path: "path/customSubPath",
      storyName: "story2",
    });
    const bParams = getParams({
      path: "path/anotherSubPath",
      storyName: "story1",
    });

    expect(storySort(["*", ["customSubPath"]])(aParams, bParams)).toBe(-1);
  });

  it("should sort 'customSubPath' before 'anotherSubPath' under 'customPath' respecting order array", () => {
    const aParams = getParams({
      path: "customPath/customSubPath",
      storyName: "story2",
    });
    const bParams = getParams({
      path: "customPath/anotherSubPath",
      storyName: "story1",
    });

    expect(storySort(["customPath", ["customSubPath"]])(aParams, bParams)).toBe(
      -1
    );
  });

  it("should sort 'customSubPath' and 'anotherSubPath' alphabetically as they are not under 'customPath' respecting order array", () => {
    const aParams = getParams({
      path: "path/customSubPath",
      storyName: "story1",
    });
    const bParams = getParams({
      path: "path/anotherSubPath",
      storyName: "story2",
    });

    expect(storySort(["customPath", ["customSubPath"]])(aParams, bParams)).toBe(
      1
    );
  });

  it("should sort 'customSubPath' before any other subPath respecting order array", () => {
    const aParams = getParams({
      path: "path/anotherSubPath",
      storyName: "story2",
    });
    const bParams = getParams({
      path: "path/customSubPath",
      storyName: "story1",
    });

    expect(storySort(["*", ["customSubPath", "*"]])(aParams, bParams)).toBe(1);
  });

  it("should sort 'anotherSubPath' after any other subPath respecting order array", () => {
    const aParams = getParams({
      path: "path/customSubPath",
      storyName: "story2",
    });
    const bParams = getParams({
      path: "path/anotherSubPath",
      storyName: "story1",
    });

    expect(storySort(["*", ["*", "anotherSubPath"]])(aParams, bParams)).toBe(
      -1
    );
  });

  it("should sort 'customSubPath' before 'anotherSubPath' prioritizing path", () => {
    const aParams = getParams({
      path: "path/customSubPath",
      storyName: "story2",
    });
    const bParams = getParams({
      path: "path/anotherSubPath",
      storyName: "story1",
    });

    expect(
      storySort([
        "*",
        ["customSubPath", "anotherSubPath"],
        "path",
        ["anotherSubPath", "customSubPath"],
      ])(aParams, bParams)
    ).toBe(1);
  });

  it("should sort stories alphabetically by keeping story1 before story2", () => {
    const aParams = getParams({ path: "path/subPath", storyName: "story2" });
    const bParams = getParams({ path: "path/subPath", storyName: "story1" });

    expect(storySort([])(aParams, bParams)).toBe(1);
  });

  it("should sort stories alphabetically by placing story1 after story2", () => {
    const aParams = getParams({ path: "path/subPath", storyName: "story1" });
    const bParams = getParams({ path: "path/subPath", storyName: "story2" });

    expect(storySort([])(aParams, bParams)).toBe(-1);
  });

  it("should sort 'customStory' before 'anotherStory' respecting order array", () => {
    const aParams = getParams({
      path: "path/subPath",
      storyName: "customStory",
    });
    const bParams = getParams({
      path: "path/subPath",
      storyName: "anotherStory",
    });

    expect(storySort(["*", ["*", ["customStory"]]])(aParams, bParams)).toBe(-1);
  });

  it("should sort 'customStory' before any other story respecting order array", () => {
    const aParams = getParams({
      path: "path/subPath",
      storyName: "anotherStory",
    });
    const bParams = getParams({
      path: "path/subPath",
      storyName: "customStory",
    });

    expect(
      storySort(["*", ["*", ["customStory", "*"]]])(aParams, bParams)
    ).toBe(1);
  });

  it("should sort 'anotherStory' after any other story respecting order array", () => {
    const aParams = getParams({
      path: "path/subPath",
      storyName: "customStory",
    });
    const bParams = getParams({
      path: "path/subPath",
      storyName: "anotherStory",
    });

    expect(
      storySort(["*", ["*", ["*", "anotherStory"]]])(aParams, bParams)
    ).toBe(-1);
  });

  it("should sort 'customStory' before any other story prioritizing subPath", () => {
    const aParams = getParams({
      path: "path/subPath",
      storyName: "anotherStory",
    });
    const bParams = getParams({
      path: "path/subPath",
      storyName: "customStory",
    });

    expect(
      storySort(["*", ["*", ["anotherStory"], "subPath", ["customStory"]]])(
        aParams,
        bParams
      )
    ).toBe(1);
  });
});
