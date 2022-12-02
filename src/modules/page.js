import { createElement, removeElement, updateNode, moveCaretToEnd, getCaretXYCoordinates } from "./helpers";
import { displaySelectMenu, menuIsOpen, closeMenu } from "./menu";
import { v4 as uuidv4 } from 'uuid';

const page = document.querySelector('#page');
let currentText = '';
let currentEditableNodeID = null;


const initialEditableNode = (newPage) => {
    const paragraph = createElement('p', {
        class: 'content',
        id: uuidv4(),
        contenteditable: true,
    }, "");
    newPage.appendChild(paragraph);
    paragraph.focus();
};

initialEditableNode(page);

const tags = [
    { tag: 'h1', text: 'Header 1' },
    { tag: 'h1', text: 'Expandable heading 1' },
];

page.addEventListener('keydown', (e) => {
    switch (e.key) {

        case 'Enter':
            e.preventDefault();
            if (!menuIsOpen) {
                const paragraph = createElement('p', {
                    class: 'content',
                    id: uuidv4(),
                    contenteditable: true,
                }, "");
                const activeElement = document.activeElement;
                activeElement.parentNode.insertBefore(paragraph, activeElement.nextSibling);
                paragraph.focus();
            }

            if (e.target.classList.contains('tag')) {
                const previousActiveNode = document.getSelection().anchorNode.parentNode;
                const newTag = createElement(e.target.id, {
                    id: currentEditableNodeID,
                    class: 'content',
                    contenteditable: true,
                }, currentText);
                updateNode(previousActiveNode, newTag);
                closeMenu();
                const newTagNode = document.getElementById(currentEditableNodeID);
                newTagNode.focus();
                moveCaretToEnd();
            }
            break;

        case 'Backspace':
            const activeElement = document.activeElement;
            const previousElement = activeElement.previousElementSibling;
            if (activeElement.previousElementSibling
                && activeElement.previousElementSibling.classList.contains('content')
                && activeElement.textContent === '') {
                removeElement(activeElement);
                if (previousElement) {
                    previousElement.focus();
                    if (previousElement.textContent !== '') {
                        moveCaretToEnd();
                    }

                }
            }
            closeMenu();
            break;

        case 'Delete':
            const nextElement = document.activeElement.nextElementSibling;
            if (document.activeElement.nextElementSibling
                && document.activeElement.nextElementSibling.classList.contains('content')
                && document.activeElement.textContent === '') {
                removeElement(document.activeElement);
                if (nextElement) {
                    nextElement.focus();
                }
            }
            break;

        case 'Escape':
            closeMenu();
            break;

        case '/':
            const { x, y } = getCaretXYCoordinates();
            currentText = document.getSelection().anchorNode.textContent;
            currentEditableNodeID = document.getSelection().anchorNode.id;
            displaySelectMenu(tags, x, y, page);
            break;

        case '1':
            if (menuIsOpen) {
                const menuDiv = document.querySelector('.select-menu');
                const button = menuDiv.querySelector('button');
                setTimeout(() => {
                    button.focus();
                }, 100);
            }
            break;
        case 'ArrowDown':
            if (menuIsOpen) {
                const menuDiv = document.querySelector('.select-menu');
                const buttons = menuDiv.querySelectorAll('button');
                const activeElement = document.activeElement;
                const activeElementIndex = Array.from(buttons).indexOf(activeElement);
                if (activeElementIndex < buttons.length - 1) {
                    buttons[activeElementIndex + 1].focus();
                } else {
                    buttons[0].focus();
                }
            }
            break;

        case 'ArrowUp':
            if (menuIsOpen) {
                const menuDiv = document.querySelector('.select-menu');
                const buttons = menuDiv.querySelectorAll('button');
                const activeElement = document.activeElement;
                const activeElementIndex = Array.from(buttons).indexOf(activeElement);
                if (activeElementIndex > 0) {
                    buttons[activeElementIndex - 1].focus();
                } else {
                    buttons[buttons.length - 1].focus();
                }
            }
            break;
        default:
            break;
    };
});

page.addEventListener('click', (e) => {
    if (e.target.classList.contains('tag')) {
        const previousActiveNode = document.getSelection().anchorNode.parentNode;
        const newTag = createElement(e.target.id, {
            class: 'content',
            contenteditable: true,
        }, currentText);
        updateNode(previousActiveNode, newTag);
        closeMenu();
    }
});

// write jest tests for this file

export { initialEditableNode };