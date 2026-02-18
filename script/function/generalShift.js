// ===== GENERAL SHIFT CIPHER =====

// elements
const shiftInput = document.getElementById("shift-input");
const shiftKey = document.getElementById("shift-key");
const shiftEncryptBtn = document.getElementById("shift-encrypt-btn");
const shiftDecryptBtn = document.getElementById("shift-decrypt-btn");
const shiftBruteBtn = document.getElementById("shift-brute-force-btn");
const shiftResult = document.getElementById("shift-result");

// helper: shift one character
function shiftChar(char, key) {
  const A = 65;
  const Z = 90;
  const a = 97;
  const z = 122;

  let code = char.charCodeAt(0);

  // uppercase
  if (code >= A && code <= Z) {
    return String.fromCharCode(((code - A + key + 26) % 26) + A);
  }

  // lowercase
  if (code >= a && code <= z) {
    return String.fromCharCode(((code - a + key + 26) % 26) + a);
  }

  return char;
}

// encrypt
shiftEncryptBtn.addEventListener("click", () => {
  const text = shiftInput.value;
  const key = parseInt(shiftKey.value);

  if (!text || isNaN(key)) {
    shiftResult.textContent = "Enter text and key";
    return;
  }

  let result = "";
  for (let i = 0; i < text.length; i++) {
    result += shiftChar(text[i], key);
  }

  shiftResult.textContent = result.toUpperCase();
});

// decrypt
shiftDecryptBtn.addEventListener("click", () => {
  const text = shiftInput.value;
  const key = parseInt(shiftKey.value);

  if (!text || isNaN(key)) {
    shiftResult.textContent = "Enter text and key";
    return;
  }

  let result = "";
  for (let i = 0; i < text.length; i++) {
    result += shiftChar(text[i], -key);
  }

  shiftResult.textContent = result.toUpperCase();
});

shiftBruteBtn.addEventListener("click", () => {
  const text = shiftInput.value;

  if (!text) {
    shiftResult.textContent = "Enter text first";
    return;
  }

  let output = "";

  for (let k = 1; k < 26; k++) {
    let attempt = "";
    for (let i = 0; i < text.length; i++) {
      attempt += shiftChar(text[i], -k);
    }

    output += "Key " + k + ": " + attempt.toUpperCase() + "<br>";
  }

  shiftResult.innerHTML = output;
});
