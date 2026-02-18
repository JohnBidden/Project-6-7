// ===== CAESAR CIPHER (shift = 3) =====

// get elements
const caesarInput = document.getElementById("caesar-input");
const encryptBtn = document.getElementById("caesar-encrypt-btn");
const decryptBtn = document.getElementById("caesar-decrypt-btn");
const resultBox = document.getElementById("caesar-result");

// helper: shift character
function shiftChar(char, shift) {
  const A = "A".charCodeAt(0);
  const Z = "Z".charCodeAt(0);
  const a = "a".charCodeAt(0);
  const z = "z".charCodeAt(0);

  let code = char.charCodeAt(0);

  // uppercase
  if (code >= A && code <= Z) {
    return String.fromCharCode(((code - A + shift + 26) % 26) + A);
  }

  // lowercase
  if (code >= a && code <= z) {
    return String.fromCharCode(((code - a + shift + 26) % 26) + a);
  }

  // non-letter (space, number, symbol)
  return char;
}

// encrypt
encryptBtn.addEventListener("click", () => {
  const text = caesarInput.value;
  if (text.trim() === "") {
    resultBox.textContent = "Please Enter Text First";
    return;
  }

  let result = "";
  for (let i = 0; i < text.length; i++) {
    result += shiftChar(text[i], 3); // shift +3
  }

  resultBox.textContent = result.toUpperCase();
});

// decrypt
decryptBtn.addEventListener("click", () => {
  const text = caesarInput.value;
  if (text.trim() === "") {
    resultBox.textContent = "Please Enter Text First";
    return;
  }

  let result = "";
  for (let i = 0; i < text.length; i++) {
    result += shiftChar(text[i], -3); // shift -3
  }

  resultBox.textContent = result.toUpperCase();
});
