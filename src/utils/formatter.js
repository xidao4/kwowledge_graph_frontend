export function formatText(text, length = 5, elipsis = '...'){
    if (!text) return '';
    if (text.length > length) {
        return `${text.substr(0, length)}${elipsis}`;
    }
    return text;
};
