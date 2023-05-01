import keyboardLayouts from './keys.js';
import className from './className.js';

const body = document.querySelector('body');
body.classList.add('body');

let language = localStorage.getItem('language');

if (!language) {
  language = 'en';
  localStorage.setItem('language', 'en');
}

function toggleCapsLock() {
  const keyboard = document.querySelector('.caps-lock');
  keyboard.classList.toggle('activeCaps');
}

const textAreaEl = document.createElement('textarea');
textAreaEl.setAttribute('class', 'text-area');
textAreaEl.setAttribute('rows', '15');
textAreaEl.setAttribute('cols', '180');
document.body.appendChild(textAreaEl);

function handleButtonClick(event) {
  const keyElement = event.target;
  const key = keyElement.textContent;
  const textarea = document.querySelector('.text-area');
  const divCaps = document.querySelector('.CapsLock');

  if (key === 'Backspace') {
    const cursorPosition = textarea.selectionStart;
    const startPos = cursorPosition - 1;
    const endPos = cursorPosition;
    textarea.value = textarea.value.substring(0, startPos) + textarea.value.substring(endPos);
    textarea.selectionStart = startPos;
    textarea.selectionEnd = startPos;
  } else if (key === 'Del') {
    const cursorPosition = textarea.selectionStart;
    textarea.value = textarea.value.substring(0, cursorPosition)
    + textarea.value.substring(cursorPosition + 1);
    textarea.selectionStart = cursorPosition;
    textarea.selectionEnd = cursorPosition;
  } else if (key === 'Enter') {
    const cursorPosition = textarea.selectionStart;
    const startText = textarea.value.substring(0, cursorPosition);
    const endText = textarea.value.substring(cursorPosition);
    textarea.value = `${startText}\n${endText}`;
    textarea.selectionStart = cursorPosition + 1;
    textarea.selectionEnd = cursorPosition + 1;
  } else if (key === 'Shift' || key === 'ShiftR' || key === 'Alt' || key === 'Win' || key === 'AltG' || key === 'Ctrl' || key === 'Ctrlr') {
    textarea.value += '';
  } else if (key === 'Tab') {
    textarea.value += '    ';
  } else if (key === 'space') {
    textarea.value += ' ';
  } else if (key === 'Caps lock') {
    toggleCapsLock();
  } else if (divCaps.classList.contains('activeCaps')) {
    textarea.value += key.toUpperCase();
  } else {
    textarea.value += key;
  }
  textarea.focus();
}

function removeKeyboard() {
  const keyboardContainer = document.querySelector('.keyboard-wrapper');
  const textTitle = document.querySelectorAll('.title');
  if (keyboardContainer) {
    keyboardContainer.remove();
  }
  textTitle.forEach((el) => {
    el.remove();
  });
}

function renderKeyboard() {
  const keyboardContainer = document.createElement('div');
  keyboardContainer.classList.add('keyboard-wrapper');
  document.body.appendChild(keyboardContainer);
  const keyboardLayout = keyboardLayouts[language];
  for (let i = 0; i < keyboardLayout.length; i += 1) {
    const row = keyboardLayout[i];
    const rowElement = document.createElement('div');
    rowElement.classList.add('keyboard-row');
    for (let j = 0; j < row.length; j += 1) {
      const key = row[j];
      const keyElement = document.createElement('div');
      keyElement.setAttribute('class', `Key${key.toUpperCase()} ${className[key]}`);
      keyElement.classList.add('key');
      keyElement.textContent = key;
      switch (key) {
        case 'Backspace':
          keyElement.classList.add('backspace');
          break;
        case 'Tab':
          keyElement.classList.add('tab');
          break;
        case 'Del':
          keyElement.classList.add('del');
          break;
        case 'Caps lock':
          keyElement.classList.add('caps-lock');
          break;
        case 'Enter':
          keyElement.classList.add('enter');
          break;
        case 'Shift':
          keyElement.classList.add('shift');
          break;
        case 'ShiftR':
          keyElement.classList.add('shift');
          break;
        case 'Ctrl':
          keyElement.classList.add('ctrl');
          break;
        case 'Ctrlr':
          keyElement.classList.add('ctrl');
          break;
        case 'Alt':
          keyElement.classList.add('alt');
          break;
        case 'AltG':
          keyElement.classList.add('alt');
          break;
        case 'Win':
          keyElement.classList.add('alt');
          break;
        case '◄':
          keyElement.classList.add('alt');
          break;
        case '▼':
          keyElement.classList.add('alt');
          break;
        case '►':
          keyElement.classList.add('alt');
          break;
        case '▲':
          keyElement.classList.add('alt');
          break;
        case 'space':
          keyElement.classList.add('space');
          break;
        default:
          break;
      }
      rowElement.appendChild(keyElement);
    }
    keyboardContainer.appendChild(rowElement);
  }
  const textForWindows = document.createElement('p');
  textForWindows.innerHTML = 'Клавиатура создана в операционной системе Windows';
  textForWindows.classList.add('title');
  document.body.appendChild(textForWindows);

  const textLanguage = document.createElement('p');
  textLanguage.innerHTML = `В данный момент выбран: ${language.toUpperCase()} язык`;
  textLanguage.classList.add('title');
  document.body.appendChild(textLanguage);

  const textTitle = document.createElement('p');
  textTitle.innerHTML = 'Для переключения языка комбинация: левыe ctrl + alt';
  textTitle.classList.add('title');
  document.body.appendChild(textTitle);
}
renderKeyboard();

function toggleLanguage() {
  if (language === 'en') {
    language = 'ru';
  } else {
    language = 'en';
  }
  localStorage.setItem('language', language);
  window.location.reload();
  renderKeyboard();
}

document.addEventListener('keydown', (event) => {
  if (event.ctrlKey && event.altKey) {
    removeKeyboard();
    toggleLanguage();
  }
});

const keys = document.querySelectorAll('.key');
keys.forEach((key) => {
  key.addEventListener('click', handleButtonClick);
});

function handleKeyPressK(event) {
  const keyElement = document.querySelector(`.${event.code}`);
  if (!keyElement) return;
  keyElement.classList.add('active');
}

function handleKeyRelease(event) {
  const keyElement = document.querySelector(`.${event.code}`);
  if (!keyElement) return;
  keyElement.classList.remove('active');
}

document.addEventListener('keydown', handleKeyPressK);
document.addEventListener('keyup', handleKeyRelease);

const textareaTab = document.querySelector('.text-area');

textareaTab.addEventListener('keydown', (event) => {
  if (event.key === 'Tab') {
    event.preventDefault();

    const cursorPosition = textareaTab.selectionStart;
    const startText = textareaTab.value.substring(0, cursorPosition);
    const endText = textareaTab.value.substring(cursorPosition);

    textareaTab.value = `${startText}    ${endText}`;
    textareaTab.selectionStart = cursorPosition + 4;
    textareaTab.selectionEnd = cursorPosition + 4;
  }
});

window.onload = function addFocusInTextarea() {
  const textareaFocus = document.querySelector('.text-area');
  textareaFocus.focus();
};
