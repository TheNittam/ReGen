const textarea = document.getElementById('log2regex');
const disButton = document.getElementById('disTextarea');
const regexOutputDiv = document.getElementById('regexOutput');
const regexContainer = document.getElementById('regexContainer');

let isTextareaDisabled = false;

function updateTextareaStatus() {
    if (isTextareaDisabled) {
        textarea.setAttribute('readonly', 'readonly');
        showRegexOutput();
    } else {
        textarea.removeAttribute('readonly');
        hideRegexOutput();
    }
}

function hideRegexOutput() {
    regexOutputDiv.textContent = 'Select and drag to see regex here!';
    regexContainer.classList.add('hidden');
}

function showRegexOutput() {
    regexContainer.classList.remove('hidden');
}

disButton.addEventListener('click', function () {
    isTextareaDisabled = !isTextareaDisabled;
    updateTextareaStatus();
});

function Regfilter(str) {
    const specialCharactersRegex = /[.*+?^${}()|\/[\]\\]/g;
    str = str.replace(specialCharactersRegex, char => "\\" + char);
    str = str.replace(/\r?\n/g, '[\\r\\n]');

    return str;
}

textarea.addEventListener("select", function () {
    if (isTextareaDisabled) {
        const text = this.value.substring(this.selectionStart, this.selectionEnd);
        const { selectionStart, selectionEnd } = this;
        const surroundingUpto = 5;

        const textLength = this.value.length;
        const startIdx = Math.max(selectionStart - surroundingUpto, 0);
        const endIdx = Math.min(selectionEnd + surroundingUpto, textLength);
        const surroundingText = this.value.substring(startIdx, endIdx);

        const b = Regfilter(text);
        const a = Regfilter(surroundingText);

        const result = a.replace(new RegExp(b.replace(/\./g, '\\.'), 'gs'), '(.*?)');
        regexOutputDiv.textContent = result;
    }
}, false);

updateTextareaStatus();