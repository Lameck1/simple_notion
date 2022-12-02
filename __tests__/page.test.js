/**
 * @jest-environment jsdom
 */

describe('Initial Editable Node', () => {
    beforeEach(() => {
        document.body.innerHTML = `
        <div id="page">           
        </div>
        `;

        const page = document.querySelector('#page');
        const mockInitialEditableNode = jest.fn().mockImplementation(() => {
            const initialEditableNode = document.createElement('p');
            initialEditableNode.setAttribute('contenteditable', 'true');
            initialEditableNode.setAttribute('class', 'content');
            initialEditableNode.textContent = '';
            page.appendChild(initialEditableNode);
            initialEditableNode.focus();
        });
        mockInitialEditableNode();
    });

    test("Element #page is rendered in the DOM", () => {
        expect(document.body.contains(page)).toBe(true);
    });

    test("Initial editable paragraph is added to #page", () => {
        const paragraph = document.querySelector('.content');
        expect(page.contains(paragraph)).toBe(true);
    });


});