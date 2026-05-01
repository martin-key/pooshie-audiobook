import { describe, it, expect } from "vitest";
import { CHAPTERS, fmt, parseDur, ISBN, AUTHOR, TOTAL_RUNTIME_ISO } from "@/lib/chapters";

describe("chapters data", () => {
  it("has exactly 13 chapters", () => {
    expect(CHAPTERS).toHaveLength(13);
  });

  it("marks only chapter 1 as free", () => {
    const free = CHAPTERS.filter((c) => c.free);
    expect(free).toHaveLength(1);
    expect(free[0].n).toBe(1);
  });

  it("each chapter has required fields", () => {
    for (const c of CHAPTERS) {
      expect(c.n).toBeGreaterThan(0);
      expect(c.title.length).toBeGreaterThan(0);
      expect(c.dur).toMatch(/^\d{1,2}:\d{2}$/);
      expect(c.blurb.length).toBeGreaterThan(0);
      expect(c.art).toMatch(/^\/images\//);
    }
  });

  it("chapter numbers are sequential 1..13", () => {
    expect(CHAPTERS.map((c) => c.n)).toEqual(Array.from({ length: 13 }, (_, i) => i + 1));
  });

  it("declares ISBN, author, and total runtime", () => {
    expect(ISBN).toBe("978-619-91473-0-6");
    expect(AUTHOR).toBe("Mr. Push");
    expect(TOTAL_RUNTIME_ISO).toBe("PT2H14M");
  });
});

describe("fmt", () => {
  it("formats whole seconds to mm:ss", () => {
    expect(fmt(0)).toBe("0:00");
    expect(fmt(9)).toBe("0:09");
    expect(fmt(60)).toBe("1:00");
    expect(fmt(432)).toBe("7:12");
  });

  it("floors fractional seconds", () => {
    expect(fmt(7.9)).toBe("0:07");
    expect(fmt(60.4)).toBe("1:00");
  });
});

describe("parseDur", () => {
  it("parses mm:ss into total seconds", () => {
    expect(parseDur("0:00")).toBe(0);
    expect(parseDur("7:12")).toBe(432);
    expect(parseDur("8:25")).toBe(505);
  });

  it("round-trips with fmt", () => {
    for (const c of CHAPTERS) {
      expect(fmt(parseDur(c.dur))).toBe(c.dur);
    }
  });
});
