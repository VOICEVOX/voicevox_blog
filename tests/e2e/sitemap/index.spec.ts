import { test, expect } from "@playwright/test";
import xmlFormat from "xml-formatter";

test("sitemap-index.xml ", async ({ baseURL }) => {
  const content = await fetch(baseURL + "/sitemap-index.xml")
    .then((res) => res.text())
    .then((text) => xmlFormat(text));
  expect(content).toMatchSnapshot("sitemap-index.xml");
});

test("sitemap-0.xml ", async ({ baseURL }) => {
  const content = await fetch(baseURL + "/sitemap-0.xml")
    .then((res) => res.text())
    .then((text) => xmlFormat(text));
  expect(content).toMatchSnapshot("sitemap-0.xml");
});
