import { createElement, appendNode, removeElement } from "./helpers";

let menuIsOpen = false;

const displaySelectMenu = (tags, positionX, positionY, parentNode) => {
    if (menuIsOpen) return;

    const menuDiv = createElement('div', {
        class: 'select-menu',
        style: `left: ${positionX}px; top: ${positionY + 30}px;`,
    });

    const menuHeader = createElement('h4', {
        class: 'select-menu-header',
    }, 'Add blocks');

    const instructions = createElement('p', {
        class: 'instructions',
    }, 'Keep typing to filter, or escape to exit');

    const filterKeyWord = createElement('P', {
        class: 'filter-keyword',
    }, 'Filtering keyword');

    const keyWordSpan = createElement('span', {
        class: 'keyword-span',
    }, '1');

    appendNode(filterKeyWord, keyWordSpan);
    menuDiv.append(menuHeader, instructions, filterKeyWord);

    tags.forEach((tag) => {
        const iconSpan = createElement('span', {
            class: 'icon',

        }, '');
        iconSpan.innerHTML = '&#84';
        const button = createElement('button', {
            class: 'tag',
            id: tag.tag,
            tabindex: 0,
        }, tag.text);

        button.prepend(iconSpan);
        appendNode(menuDiv, button);
    });

    appendNode(parentNode, menuDiv);
    menuIsOpen = true;
};

const closeMenu = () => {
    const menuDiv = document.querySelector('.select-menu');
    if (menuDiv) {
        removeElement(menuDiv);
        menuIsOpen = false;
    }
};

export { displaySelectMenu, menuIsOpen, closeMenu };