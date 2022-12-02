/**
 * @jest-environment jsdom
 */

let menuIsOpen = false;

describe('Menu', () => {
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

        const mockDisplaySelectMenu = jest.fn().mockImplementation((tags, positionX, positionY, parentNode) => {
            if (menuIsOpen) return;
            const menu = document.createElement('div');
            menu.setAttribute('class', 'select-menu');
            menu.setAttribute('style', `top: ${positionY}px; left: ${positionX}px;`);
            tags.forEach((tag) => {
                const button = document.createElement('button');
                button.setAttribute('class', 'tag');
                button.textContent = tag.text;
                menu.appendChild(button);
            });
            parentNode.appendChild(menu);
            menuIsOpen = true;
        });

        const mockCloseMenu = jest.fn().mockImplementation(() => {
            const menu = document.querySelector('.select-menu');
            if (menu) {
                menu.remove();
                menuIsOpen = false;
            }
        });

        page.addEventListener('keydown', (e) => {
            switch (e.key) {
                case '/':
                    e.preventDefault();
                    mockDisplaySelectMenu(
                        [
                            { tag: 'h1', text: 'Header 1' },
                            { tag: 'h1', text: 'Expandable heading 1' },
                        ],
                        0,
                        0,
                        page,
                    );
                    break;
                case '1':
                    e.preventDefault();
                    const firstMenuItem = document.querySelector('.tag');
                    firstMenuItem.focus();
                    break;
                case 'Enter':
                    e.preventDefault();
                    const currentNode = document.querySelector('p');
                    console.log(currentNode.textContent);
                    const newTag = document.createElement('h1');
                    newTag.setAttribute('class', 'content');
                    newTag.setAttribute('contenteditable', 'true');
                    newTag.textContent = '';
                    currentNode.replaceWith(newTag);
                    mockCloseMenu();

                case 'Escape':
                    mockCloseMenu();
            }

        });
    });

    afterEach(() => {
        const closeMenuEvent = new KeyboardEvent('keydown', { key: 'Escape' });
        page.dispatchEvent(closeMenuEvent);
    });

    describe('Opening the menu', () => {
        test('should display the menu when the "/" key is pressed', () => {
            const event = new KeyboardEvent('keydown', {
                key: '/',
            });
            page.dispatchEvent(event);
            expect(document.querySelector('.select-menu')).not.toBeNull();
        });
    });

    describe('Selecting the first menu item', () => {
        test('should focus the first menu item when the "1" key is pressed', () => {
            const event = new KeyboardEvent('keydown', {
                key: '/',
            });
            page.dispatchEvent(event);
            const event2 = new KeyboardEvent('keydown', {
                key: '1',
            });
            page.dispatchEvent(event2);
            expect(document.querySelector('.tag').matches(':focus')).toBe(true);
        });

        test('should replace the current node with the selected tag when the "Enter" key is pressed', () => {
            const event = new KeyboardEvent('keydown', {
                key: '/',
            });
            page.dispatchEvent(event);
            const event2 = new KeyboardEvent('keydown', {
                key: '1',
            });
            page.dispatchEvent(event2);
            const event3 = new KeyboardEvent('keydown', {
                key: 'Enter',
            });
            page.dispatchEvent(event3);
            expect(document.querySelector('h1')).not.toBeNull();
        });
    });
});

