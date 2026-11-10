import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import axe from "axe-core";
import App from "./App";
import { projectLinks, site } from "./data/site";
import { LANGUAGE_STORAGE_KEY, content } from "./i18n";

async function a11yViolations() {
  const results = await axe.run(document.body, {
    iframes: false,
    runOnly: {
      type: "tag",
      values: ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"],
    },
    // jsdom does not compute real colors; contrast is checked in the design system.
    rules: { "color-contrast": { enabled: false } },
  });
  return results.violations.map(
    (violation) =>
      `${violation.id}: ${violation.help} → ${violation.nodes
        .map((node) => String(node.target))
        .join(" | ")}`
  );
}

const configuredPhoto = site.photo;
const configuredImages = {
  vietri: projectLinks.vietri.image,
  streaming: projectLinks.streaming.image,
};

beforeEach(() => {
  localStorage.clear();
});

afterEach(() => {
  // Tests change the photo; put the real one back.
  site.photo = configuredPhoto;
  projectLinks.vietri.image = configuredImages.vietri;
  projectLinks.streaming.image = configuredImages.streaming;
});

describe("Portfolio", () => {
  it("starts in English with a single level 1 heading", () => {
    render(<App />);
    expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
    expect(
      screen.getByRole("heading", { level: 1, name: content.en.hero.title })
    ).toBeInTheDocument();
    expect(document.documentElement.lang).toBe("en");
  });

  it("starts in Spanish when the browser language is Spanish", () => {
    const spy = vi.spyOn(navigator, "language", "get").mockReturnValue("es-CL");
    render(<App />);
    expect(
      screen.getByRole("heading", { level: 1, name: content.es.hero.title })
    ).toBeInTheDocument();
    expect(document.documentElement.lang).toBe("es");
    spy.mockRestore();
  });

  it("has a skip link that points to the main content", () => {
    render(<App />);
    expect(screen.getByRole("link", { name: content.en.skip })).toHaveAttribute("href", "#content");
    expect(screen.getByRole("main")).toHaveAttribute("id", "content");
  });

  it("has the header and footer landmarks", () => {
    render(<App />);
    expect(screen.getByRole("banner")).toBeInTheDocument();
    expect(screen.getByRole("contentinfo")).toBeInTheDocument();
  });

  it("shows the three projects as level 3 headings", () => {
    render(<App />);
    for (const project of content.en.work.projects) {
      expect(screen.getByRole("heading", { level: 3, name: project.title })).toBeInTheDocument();
    }
  });

  it("switches to Spanish, updates the page language and remembers the choice", async () => {
    const user = userEvent.setup();
    render(<App />);
    await user.click(screen.getByRole("button", { name: "ES" }));

    expect(
      screen.getByRole("heading", { level: 1, name: content.es.hero.title })
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "ES" })).toHaveAttribute("aria-pressed", "true");
    expect(document.documentElement.lang).toBe("es");
    expect(document.title).toBe(content.es.meta.title);
    expect(localStorage.getItem(LANGUAGE_STORAGE_KEY)).toBe("es");
  });

  it("uses the saved language on the next visit", () => {
    localStorage.setItem(LANGUAGE_STORAGE_KEY, "es");
    render(<App />);
    expect(
      screen.getByRole("heading", { level: 1, name: content.es.hero.title })
    ).toBeInTheDocument();
  });

  it("lists the experience as a timeline, newest first", () => {
    render(<App />);
    const list = screen.getByRole("list", { name: content.en.experience.listLabel });
    const headings = within(list).getAllByRole("heading", { level: 3 });
    expect(headings.map((heading) => heading.textContent)).toEqual(
      content.en.experience.entries.map((entry) => entry.role)
    );
  });

  it("shows the education and training", () => {
    render(<App />);
    expect(
      screen.getByRole("heading", { level: 3, name: content.en.experience.educationTitle })
    ).toBeInTheDocument();
    expect(screen.getByText("Laboratoria · 2018")).toBeInTheDocument();
  });

  it("links to LinkedIn, GitHub and npm", () => {
    render(<App />);
    expect(screen.getAllByRole("link", { name: /^LinkedIn/ })[0]).toHaveAttribute(
      "href",
      "https://www.linkedin.com/in/sorayasm"
    );
    expect(screen.getAllByRole("link", { name: /^GitHub/ })[0]).toHaveAttribute(
      "href",
      "https://github.com/sorayasm"
    );
    expect(screen.getAllByRole("link", { name: /^npm/ })[0]).toBeInTheDocument();
  });

  it("has a photo configured", () => {
    expect(site.photo).not.toBeNull();
    expect(site.photo?.src).toBe("/soraya.webp");
  });

  it("shows no image when the photo is turned off", () => {
    site.photo = null;
    render(<App />);
    expect(
      screen.queryByRole("img", { name: content.en.about.photoAlt })
    ).not.toBeInTheDocument();
  });

  it("shows the portrait with its alt text, in the chosen language", async () => {
    const user = userEvent.setup();
    render(<App />);

    const portrait = screen.getByRole("img", { name: content.en.about.photoAlt });
    expect(portrait).toHaveAttribute("src", "/soraya.webp");
    expect(portrait).toHaveAttribute("width", "800");
    expect(portrait).toHaveAttribute("height", "1000");

    await user.click(screen.getByRole("button", { name: "ES" }));
    expect(screen.getByRole("img", { name: content.es.about.photoAlt })).toBeInTheDocument();
  });

  it("shows a project's image with its alt text and reserved size", () => {
    projectLinks.vietri.image = { src: "/projects/vietri.webp", width: 1280, height: 720 };
    render(<App />);

    const image = screen.getByRole("img", { name: content.en.work.projects[0].imageAlt });
    expect(image).toHaveAttribute("src", "/projects/vietri.webp");
    expect(image).toHaveAttribute("width", "1280");
    expect(image).toHaveAttribute("height", "720");
  });

  it("shows the project image alt text in the chosen language", async () => {
    projectLinks.vietri.image = { src: "/projects/vietri.webp", width: 1280, height: 720 };
    const user = userEvent.setup();
    render(<App />);
    await user.click(screen.getByRole("button", { name: "ES" }));
    expect(
      screen.getByRole("img", { name: content.es.work.projects[0].imageAlt })
    ).toBeInTheDocument();
  });

  it("a project without an image shows a placeholder, not a broken image", () => {
    projectLinks.streaming.image = undefined;
    render(<App />);
    const heading = screen.getByRole("heading", {
      level: 3,
      name: content.en.work.projects[1].title,
    });
    const card = heading.closest(".MuiCard-root") as HTMLElement;
    expect(within(card).queryByRole("img")).not.toBeInTheDocument();
  });

  it("projects with a demo have a mouse-only link over the card, hidden from assistive technology", () => {
    const { container } = render(<App />);
    const overlays = container.querySelectorAll('a[aria-hidden="true"][tabindex="-1"]');
    // Vietri DS and the Observatory have a demo; the streaming app does not yet.
    expect(overlays).toHaveLength(2);
    expect(overlays[0]).toHaveAttribute("href", projectLinks.vietri.demo);
    expect(overlays[0]).toHaveAttribute("rel", "noopener noreferrer");
  });

  it("the visible buttons are the way to the demo for keyboard and screen readers", () => {
    render(<App />);
    expect(screen.getAllByRole("link", { name: /^View live/ })).toHaveLength(2);
  });

  it("a project without a demo has no link over its card", () => {
    const { container } = render(<App />);
    const heading = screen.getByRole("heading", {
      level: 3,
      name: content.en.work.projects[1].title,
    });
    const card = heading.closest(".MuiCard-root") as HTMLElement;
    expect(card.querySelector("a[aria-hidden]")).toBeNull();
    expect(container).toBeTruthy();
  });

  describe("contact form", () => {
    it("shows an error for every empty field and focuses the first one", async () => {
      const user = userEvent.setup();
      render(<App />);
      await user.click(screen.getByRole("button", { name: content.en.contact.form.send }));

      const errors = content.en.contact.form.errors;
      expect(screen.getByText(errors.nameRequired)).toBeInTheDocument();
      expect(screen.getByText(errors.emailRequired)).toBeInTheDocument();
      expect(screen.getByText(errors.messageRequired)).toBeInTheDocument();
      expect(screen.getByLabelText(/^Name/)).toHaveFocus();
      expect(screen.getByLabelText(/^Name/)).toBeInvalid();
    });

    it("rejects an invalid email address", async () => {
      const user = userEvent.setup();
      render(<App />);
      await user.type(screen.getByLabelText(/^Name/), "Ada");
      await user.type(screen.getByLabelText(/^Email/), "not-an-email");
      await user.type(screen.getByLabelText(/^Message/), "Hello");
      await user.click(screen.getByRole("button", { name: content.en.contact.form.send }));

      expect(screen.getByText(content.en.contact.form.errors.emailInvalid)).toBeInTheDocument();
      expect(screen.getByLabelText(/^Email/)).toHaveFocus();
    });

    it("shows the errors in the chosen language", async () => {
      const user = userEvent.setup();
      render(<App />);
      await user.click(screen.getByRole("button", { name: "ES" }));
      await user.click(screen.getByRole("button", { name: content.es.contact.form.send }));
      expect(screen.getByText(content.es.contact.form.errors.nameRequired)).toBeInTheDocument();
    });
  });

  describe("accessibility (axe, WCAG 2.2 A and AA)", () => {
    it("has no violations in English, with the photo", async () => {
      render(<App />);
      expect(await a11yViolations()).toEqual([]);
    });

    it("has no violations in Spanish", async () => {
      const user = userEvent.setup();
      render(<App />);
      await user.click(screen.getByRole("button", { name: "ES" }));
      expect(await a11yViolations()).toEqual([]);
    });
  });
});
