import { describe, expect, it } from "vitest";
import { content } from "./content";

/** Turns a nested object into { "path.to[0].text": "…" } so two languages can be compared. */
function flatten(value: unknown, prefix = ""): Record<string, string> {
  if (typeof value === "string") return { [prefix]: value };
  if (Array.isArray(value)) {
    return value.reduce<Record<string, string>>(
      (all, item, index) => ({ ...all, ...flatten(item, `${prefix}[${index}]`) }),
      {}
    );
  }
  if (value && typeof value === "object") {
    return Object.entries(value).reduce<Record<string, string>>(
      (all, [key, item]) => ({ ...all, ...flatten(item, prefix ? `${prefix}.${key}` : key) }),
      {}
    );
  }
  return {};
}

const en = flatten(content.en);
const es = flatten(content.es);

describe("bilingual content", () => {
  it("has exactly the same texts in English and Spanish", () => {
    expect(Object.keys(es).sort()).toEqual(Object.keys(en).sort());
  });

  it("has no empty text", () => {
    for (const [key, text] of [...Object.entries(en), ...Object.entries(es)]) {
      expect(text.trim(), key).not.toBe("");
    }
  });

  it("really translates the main texts", () => {
    for (const key of ["hero.title", "hero.description", "nav.links.work", "contact.title"]) {
      expect(es[key], key).not.toBe(en[key]);
    }
  });

  it("lists the same projects, in the same order, in both languages", () => {
    expect(content.es.work.projects.map((project) => project.id)).toEqual(
      content.en.work.projects.map((project) => project.id)
    );
  });
});
