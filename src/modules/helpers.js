const createElement = (tag, attributes = {}, textContent = '') => {
    const element = document.createElement(tag);
    const keys = Object.keys(attributes);
    keys.forEach((key) => {
        element.setAttribute(key, attributes[key]);
    });
    element.textContent = textContent;
    return element;
};

const removeElement = (node) => {
    node.remove();
};

const appendNode = (parent, child) => {
    parent.appendChild(child);
};


const updateNode = (node, newNode) => {
    node.replaceWith(newNode);
};

const moveCaretToEnd = () => {
    const range = document.createRange();
    const selection = window.getSelection();
    range.selectNodeContents(document.activeElement);
    range.collapse(false);
    selection.removeAllRanges();
    selection.addRange(range);
};

function getCaretXYCoordinates() {
    var selection = document.selection, range, rect;
    var x = 0, y = 0;
    if (selection) {
        if (selection.type != "Control") {
            range = selection.createRange();
            range.collapse(true);
            x = range.boundingLeft;
            y = range.boundingTop;
        }
    } else if (window.getSelection) {
        selection = window.getSelection();
        if (selection.rangeCount) {
            range = selection.getRangeAt(0).cloneRange();
            if (range.getClientRects) {
                range.collapse(true);
                if (range.getClientRects().length > 0) {
                    rect = range.getClientRects()[0];
                    x = rect.left;
                    y = rect.top;
                }
            }
            // Fall back to inserting a temporary element
            if (x == 0 && y == 0) {
                var span = document.createElement("span");
                if (span.getClientRects) {
                    // Ensure span has dimensions and position by
                    // adding a zero-width space character
                    span.appendChild(document.createTextNode("\u200b"));
                    range.insertNode(span);
                    rect = span.getClientRects()[0];
                    x = rect.left;
                    y = rect.top;
                    var spanParent = span.parentNode;
                    spanParent.removeChild(span);
                    // Glue any broken text nodes back together
                    spanParent.normalize();
                }
            }
        }
    }
    return { x: x, y: y };
}


export { createElement, removeElement, appendNode, updateNode, moveCaretToEnd, getCaretXYCoordinates };
