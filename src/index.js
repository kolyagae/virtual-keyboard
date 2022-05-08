/* eslint-disable linebreak-style */
const BUTTON_CODE = ["Backquote", "Digit1", "Digit2", "Digit3", "Digit4", "Digit5", "Digit6", "Digit7", "Digit8", "Digit9", "Digit0", "Minus", "Equal", "Backspace", "Tab", "KeyQ", "KeyW", "KeyE", "KeyR", "KeyT", "KeyY", "KeyU", "KeyI", "KeyO", "KeyP", "BracketLeft", "BracketRight", "Backslash", "CapsLock", "KeyA", "KeyS", "KeyD", "KeyF", "KeyG", "KeyH", "KeyJ", "KeyK", "KeyL", "Semicolon", "Quote", "Enter", "ShiftLeft", "IntlBackslash", "KeyZ", "KeyX", "KeyC", "KeyV", "KeyB", "KeyN", "KeyM", "Comma", "Period", "Slash", "ArrowUp", "ShiftRight", "ControlLeft", "MetaLeft", "AltLeft", "Space", "AltRight", "ControlRight", "ArrowLeft", "ArrowDown", "ArrowRight"];
const BUTTON_KEY = ["`", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "=", "Backspace", "Tab", "q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "[", "]", "\\", "CapsLock", "a", "s", "d", "f", "g", "h", "j", "k", "l", ";", "'", "Enter", "Shift", "\\", "z", "x", "c", "v", "b", "n", "m", ",", ".", "/", "&uarr;", "Shift", "Ctrl", "Win", "Alt", " ", "Alt", "Ctrl", "&larr;", "&darr;", "&rarr;"];
const SHIFT_BUTTON_KEY = ["~", "!", "@", "#", "$", "%", "^", "&", "*", "(", ")", "_", "+", "Backspace", "Tab", "q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "{", "}", "|", "CapsLock", "a", "s", "d", "f", "g", "h", "j", "k", "l", ":", "\"", "Enter", "Shift", "|", "z", "x", "c", "v", "b", "n", "m", "<", ">", "?", "&uarr;", "Shift", "Ctrl", "Win", "Alt", " ", "Alt", "Ctrl", "&larr;", "&darr;", "&rarr;"];

class VirtualKeyboard {
  constructor() {
    this.lang = "en";
    this.caps = false;
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
      this.button += `<div class="button button__${this.elementClass[i]}" data-code="${BUTTON_CODE[i]}">${BUTTON_KEY[i]}</div>`;
    }
    this.keyboard.innerHTML = this.button;
  }

  addEventToButtons() {
    const CAPS_BUTTON_KEY = BUTTON_KEY.map(
      (el) => ((el.length === 1) ? el.toUpperCase() : el),
    );

    // ----------------add event to button------------------------
    document.onkeydown = (event) => {
      // if (this.textArea.blur()) {
      //   this.textArea.focus();
      // }
      if (event.code === "Backspace") {
        this.textArea.innerHTML = this.textArea.innerHTML.slice(0, -1);
      } else if (event.code === "Enter") {
        this.textArea.innerHTML += "\n";
      } else if (event.code === "Tab") {
        event.preventDefault();
        this.textArea.innerHTML += "\t";
      } else if (event.code === "ArrowUp") {
        this.textArea.innerHTML += "&uarr;";
      } else if (event.code === "ArrowDown") {
        this.textArea.innerHTML += "&darr;";
      } else if (event.code === "ArrowLeft") {
        this.textArea.innerHTML += "&larr;";
        this.textArea.selectionStart = 10;
      } else if (event.code === "ArrowRight") {
        this.textArea.innerHTML += "&rarr;";
      } else if (event.code === "CapsLock" && this.caps === false) {
        this.button = "";
        for (let i = 0; i < BUTTON_KEY.length; i += 1) {
          this.button += `<div class="button button__${this.elementClass[i]}" data-code="${BUTTON_CODE[i]}">${CAPS_BUTTON_KEY[i]}</div>`;
        }
        this.keyboard.innerHTML = this.button;
        this.caps = true;
      } else if (event.code === "CapsLock" && this.caps === true) {
        this.button = "";
        for (let i = 0; i < BUTTON_KEY.length; i += 1) {
          this.button += `<div class="button button__${this.elementClass[i]}" data-code="${BUTTON_CODE[i]}">${BUTTON_KEY[i]}</div>`;
        }
        this.keyboard.innerHTML = this.button;
        this.caps = false;
      } else if (event.code.includes("Shift") && this.caps === true) {
        this.button = "";
        for (let i = 0; i < BUTTON_KEY.length; i += 1) {
          this.button += `<div class="button button__${this.elementClass[i]}" data-code="${BUTTON_CODE[i]}">${SHIFT_BUTTON_KEY[i]}</div>`;
        }
        this.keyboard.innerHTML = this.button;
      } else if (event.code.includes("Shift") && this.caps === false) {
        this.button = "";
        for (let i = 0; i < BUTTON_KEY.length; i += 1) {
          if (SHIFT_BUTTON_KEY[i].length === 1) {
            this.button += `<div class="button button__${this.elementClass[i]}" data-code="${BUTTON_CODE[i]}">${SHIFT_BUTTON_KEY[i].toUpperCase()}</div>`;
          } else if (SHIFT_BUTTON_KEY[i].length > 1) {
            this.button += `<div class="button button__${this.elementClass[i]}" data-code="${BUTTON_CODE[i]}">${SHIFT_BUTTON_KEY[i]}</div>`;
          }
        }
        this.keyboard.innerHTML = this.button;
      } else if (event.key.length <= 2) {
        this.textArea.innerHTML += `${event.key}`;
      }
      document.querySelector(`.button[data-code="${event.code}"]`).classList.add("active");
    };
    // ----------------remove active class to button------------------------
    document.onkeyup = (event) => {
      document.querySelector(`.button[data-code="${event.code}"]`).classList.remove("active");
      if (event.code.includes("Shift") && this.caps === true) {
        this.button = "";
        for (let i = 0; i < BUTTON_KEY.length; i += 1) {
          this.button += `<div class="button button__${this.elementClass[i]}" data-code="${BUTTON_CODE[i]}">${CAPS_BUTTON_KEY[i]}</div>`;
        }
        this.keyboard.innerHTML = this.button;
      } else if (event.code.includes("Shift") && this.caps === false) {
        this.button = "";
        for (let i = 0; i < BUTTON_KEY.length; i += 1) {
          this.button += `<div class="button button__${this.elementClass[i]}" data-code="${BUTTON_CODE[i]}">${BUTTON_KEY[i]}</div>`;
        }
        this.keyboard.innerHTML = this.button;
      }
    };

    // ----------------add event to click------------------------
    document.addEventListener("mousedown", (event) => {
      const CHAR_BUTTONS = document.querySelectorAll(".button");
      if (event.target.classList.contains("button")) {
        event.target.classList.add("active");
        if (event.target.innerHTML === "Backspace") {
          this.textArea.innerHTML = this.textArea.innerHTML.slice(0, -1);
        } else if (event.target.innerHTML === "Enter") {
          this.textArea.innerHTML += "\n";
        } else if (event.target.innerHTML === "Tab") {
          event.preventDefault();
          this.textArea.innerHTML += "\t";
        } else if (event.target.innerHTML === "CapsLock" && this.caps === false) {
          for (let i = 0; i < CHAR_BUTTONS.length; i += 1) {
            if (CHAR_BUTTONS[i].dataset.code.includes("Key")) {
              CHAR_BUTTONS[i].innerHTML = CHAR_BUTTONS[i].innerHTML.toUpperCase();
            }
          }
          this.caps = true;
        } else if (event.target.innerHTML === "CapsLock" && this.caps === true) {
          for (let i = 0; i < CHAR_BUTTONS.length; i += 1) {
            if (CHAR_BUTTONS[i].dataset.code.includes("Key")) {
              CHAR_BUTTONS[i].innerHTML = CHAR_BUTTONS[i].innerHTML.toLowerCase();
            }
          }
          this.caps = false;
        } else if (event.target.innerHTML === "Shift") {
          this.button = "";
          for (let i = 0; i < BUTTON_KEY.length; i += 1) {
            if (SHIFT_BUTTON_KEY[i].length === 1) {
              this.button += `<div class="button button__${this.elementClass[i]}" data-code="${BUTTON_CODE[i]}">${SHIFT_BUTTON_KEY[i].toUpperCase()}</div>`;
            } else if (SHIFT_BUTTON_KEY[i].length > 1) {
              this.button += `<div class="button button__${this.elementClass[i]}" data-code="${BUTTON_CODE[i]}">${SHIFT_BUTTON_KEY[i]}</div>`;
            }
          }
          this.keyboard.innerHTML = this.button;
        } else if (event.target.innerHTML.length <= 2) {
          this.textArea.innerHTML += (event.target.innerHTML);
        }
      }
    });
    document.addEventListener("mouseup", (event) => {
      if (event.target.classList.contains("button")) {
        event.target.classList.remove("active");
      }
      if (event.target.innerHTML === "Shift") {
        this.button = "";
        for (let i = 0; i < BUTTON_KEY.length; i += 1) {
          this.button += `<div class="button button__${this.elementClass[i]}" data-code="${BUTTON_CODE[i]}">${BUTTON_KEY[i]}</div>`;
        }
        this.keyboard.innerHTML = this.button;
      }
    });
  }
}
// -------------------------window onload------------------

window.onload = function windowOnload() {
  const VIRTUAL_KEYBOARD = new VirtualKeyboard();
  VIRTUAL_KEYBOARD.createMainContainer();
  VIRTUAL_KEYBOARD.addEventToButtons();
};
