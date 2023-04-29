const keyboardLayouts = {
  en: [
    [
      '`',
      '1',
      '2',
      '3',
      '4',
      '5',
      '6',
      '7',
      '8',
      '9',
      '0',
      '-',
      '=',
      'Backspace',
    ],
    [
      'Tab',
      'q',
      'w',
      'e',
      'r',
      't',
      'y',
      'u',
      'i',
      'o',
      'p',
      '[',
      ']',
      '\\',
      'Del',
    ],
    [
      'Caps lock',
      'a',
      's',
      'd',
      'f',
      'g',
      'h',
      'j',
      'k',
      'l',
      ';',
      "'",
      'Enter',
    ],
    ['Shift', 'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/', '▲', 'Shift'],
    ['Ctrl', 'Win', 'Alt', 'space', 'Alt', '◄', '▼', '►', 'Ctrl'],
  ],
  ru: [
    [
      'ё',
      '1',
      '2',
      '3',
      '4',
      '5',
      '6',
      '7',
      '8',
      '9',
      '0',
      '-',
      '=',
      'Backspace',
    ],
    [
      'Tab',
      'й',
      'ц',
      'у',
      'к',
      'е',
      'н',
      'г',
      'ш',
      'щ',
      'з',
      'х',
      'ъ',
      '\\',
      'Del',
    ],
    [
      'Caps lock',
      'ф',
      'ы',
      'в',
      'а',
      'п',
      'р',
      'о',
      'л',
      'д',
      'ж',
      'э',
      'Enter',
    ],
    ['Shift', 'я', 'ч', 'с', 'м', 'и', 'т', 'ь', 'б', 'ю', '.', '▲', 'Shift'],
    ['Ctrl', 'Win', 'Alt', 'space', 'Alt', '◄', '▼', '►', 'Ctrl'],
  ],
};

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
    textarea.value += '\n';
  } else if (key === 'Tab') {
    textarea.value += '    ';
  } else if (key === 'space') {
    textarea.value += ' ';
  } else if (key === 'Caps lock') {
    toggleCapsLock();
  } else {
    textarea.value += key;
  }
  textarea.focus();
}

const removeKeyboard = () => {
  const keyboardContainer = document.querySelector('.keyboard-wrapper');
  const textTitle = document.querySelectorAll('.title');
  if (keyboardContainer) {
    keyboardContainer.remove();
  }
  textTitle.forEach((el) => {
    el.remove();
  });
};

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
      keyElement.setAttribute('class', `Key${key.toUpperCase()}`);
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
          keyElement.setAttribute('class', 'CapsLock key');
          keyElement.classList.add('caps-lock');
          break;
        case 'Enter':
          keyElement.classList.add('enter');
          break;
        case 'Shift':
          keyElement.classList.add('shift');

          break;
        case 'Ctrl':
          keyElement.classList.add('ctrl');
          break;
        case 'Alt':
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

  const textLanguage = document.createElement('p');
  textLanguage.innerHTML = `В данный момент выбран: ${language} язык`;
  textLanguage.classList.add('title');
  document.body.appendChild(textLanguage);

  const textTitle = document.createElement('p');
  textTitle.innerHTML = 'Для переключения языка комбинация: левыe ctrl + alt';
  textTitle.classList.add('title');
  document.body.appendChild(textTitle);
}
renderKeyboard();

const toggleLanguage = () => {
  if (language === 'en') {
    language = 'ru';
  } else {
    language = 'en';
  }
  localStorage.setItem('language', language);
  renderKeyboard();
};

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

