/**
 * @jest-environment jsdom
 */

import { createElement, removeElement, appendNode, updateNode } from "../src/modules/helpers";

describe("helpers", () => {

    beforeEach(() => {
        document.body.innerHTML = `
        <div id="page">
        </div>
        `;
    });

    describe("createElement", () => {
        test("creates an element", () => {
            const element = createElement("p", { class: "content" }, "Hello World");
            expect(element).toBeInstanceOf(HTMLElement);
            expect(element.tagName).toBe("P");
        });
    });

    describe("removeElement", () => {

        test("removes an element", () => {
            const element = createElement("p", { class: "content" }, "Hello World");
            appendNode(document.querySelector("#page"), element);
            removeElement(element);
            expect(document.querySelector("#page").contains(element)).toBe(false);
        });
    });

    describe("appendNode", () => {

        test("appends a node", () => {
            const element = createElement("p", { class: "content" }, "Hello World");
            appendNode(document.querySelector("#page"), element);
            expect(document.querySelector("#page").contains(element)).toBe(true);
        });
    });

    describe("updateNode", () => {

        test("updates a node", () => {
            const element = createElement("p", { class: "content" }, "Hello World");
            appendNode(document.querySelector("#page"), element);
            const newElement = createElement("p", { class: "content" }, "Hello World");
            updateNode(element, newElement);
            expect(document.querySelector("#page").contains(element)).toBe(false);
            expect(document.querySelector("#page").contains(newElement)).toBe(true);
        });
    });
});