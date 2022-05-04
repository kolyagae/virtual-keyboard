/* eslint-disable linebreak-style */
const BUTTON_CODE = ["Backquote", "Digit1", "Digit2", "Digit3", "Digit4", "Digit5", "Digit6", "Digit7", "Digit8", "Digit9", "Digit0", "Minus", "Equal", "Backspace", "Tab", "KeyQ", "KeyW", "KeyE", "KeyR", "KeyT", "KeyY", "KeyU", "KeyI", "KeyO", "KeyP", "BracketLeft", "BracketRight", "Backslash", "Delete", "CapsLock", "KeyA", "KeyS", "KeyD", "KeyF", "KeyG", "KeyH", "KeyJ", "KeyK", "KeyL", "Semicolon", "Quote", "Enter", "ShiftLeft", "IntlBackslash", "KeyZ", "KeyX", "KeyC", "KeyV", "KeyB", "KeyN", "KeyM", "Comma", "Period", "Slash", "ArrowUp", "ShiftRight", "ControlLeft", "MetaLeft", "AltLeft", "Space", "AltRight", "ControlRight", "ArrowLeft", "ArrowDown", "ArrowRight"];
const BUTTON_KEY = ["`", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "=", "Backspace", "Tab", "q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "[", "]", "\\", "Delete", "CapsLock", "a", "s", "d", "f", "g", "h", "j", "k", "l", ";", "'", "Enter", "Shift", "\\", "z", "x", "c", "v", "b", "n", "m", ",", ".", "/", "&uarr;", "Shift", "Ctrl", "Win", "Alt", " ", "Alt", "Ctrl", "&larr;", "&darr;", "&rarr;"];

class VirtualKeyboard {
  constructor() {
    this.lang = "en";
  }

  // ------------------------create main container--------
  createMainContainer() {
    const BODY = document.querySelector("body");

    // ------------------add main container---------------
    this.mainContainer = document.createElement("DIV");
    this.mainContainer.classList.add("main__container");
    BODY.append(this.mainContainer);
    // -----------------add text area---------------------
    this.textArea = document.createElement("TEXTAREA");
    this.textArea.classList.add("text__area");
    this.mainContainer.append(this.textArea);
    // ------------------add keyboard------------------
    this.keyboard = document.createElement("DIV");
    this.keyboard.classList.add("keyboard");
    this.mainContainer.append(this.keyboard);
    // -----------------add buttons and element__class--------------------
    this.elementClass = BUTTON_CODE.map((el) => el.toLowerCase());
    this.button = "";
    for (let i = 0; i < BUTTON_KEY.length; i += 1) {
      this.button += `<div class="button button__${this.elementClass[i]}">${BUTTON_KEY[i]}</div>`;
    }
    this.keyboard.innerHTML = this.button;
  }
}
// -------------------------window onload------------------

window.onload = function windowOnload() {
  const VIRTUAL_KEYBOARD = new VirtualKeyboard();
  VIRTUAL_KEYBOARD.createMainContainer();
};
