(() => {
  // ===== AFFINE CIPHER =====

  const affineInput = document.getElementById("affine-input");
  const keyAInput = document.getElementById("affine-key-a");
  const keyBInput = document.getElementById("affine-key-b");

  const affineEncryptBtn = document.getElementById("affine-encrypt-btn");
  const affineDecryptBtn = document.getElementById("affine-decrypt-btn");
  const affineBruteBtn = document.getElementById("affine-brute-force-btn");

  const affineResultBox = document.getElementById("affine-result");

  // valid values for a (must be coprime with 26)
  const validA = [1, 3, 5, 7, 9, 11, 15, 17, 19, 21, 23, 25];

  // helper: mod inverse of a (for decrypt)
  function modInverse(a, m) {
    a = ((a % m) + m) % m;
    for (let x = 1; x < m; x++) {
      if ((a * x) % m === 1) return x;
    }
    return null;
  }

  // encrypt char
  function encryptChar(c, a, b) {
    const code = c.charCodeAt(0);

    if (code >= 65 && code <= 90) {
      let x = code - 65;
      return String.fromCharCode(((a * x + b) % 26) + 65);
    }

    if (code >= 97 && code <= 122) {
      let x = code - 97;
      return String.fromCharCode(((a * x + b) % 26) + 97);
    }

    return c;
  }

  // decrypt char
  function decryptChar(c, a, b) {
    const invA = modInverse(a, 26);
    if (invA === null) return c;

    const code = c.charCodeAt(0);

    if (code >= 65 && code <= 90) {
      let y = code - 65;
      return String.fromCharCode(((invA * (y - b + 26)) % 26) + 65);
    }

    if (code >= 97 && code <= 122) {
      let y = code - 97;
      return String.fromCharCode(((invA * (y - b + 26)) % 26) + 97);
    }

    return c;
  }

  // ENCRYPT
  affineEncryptBtn.addEventListener("click", () => {
    const text = affineInput.value;
    const a = parseInt(keyAInput.value);
    const b = parseInt(keyBInput.value);

    if (!text || isNaN(a) || isNaN(b)) {
      affineResultBox.textContent = "Enter text + keys";
      return;
    }

    if (!validA.includes(a)) {
      affineResultBox.textContent = "Key a must be coprime with 26";
      return;
    }

    let result = "";
    for (let i = 0; i < text.length; i++) {
      result += encryptChar(text[i], a, b);
    }

    affineResultBox.textContent = result.toUpperCase();
  });

  // DECRYPT
  affineDecryptBtn.addEventListener("click", () => {
    const text = affineInput.value;
    const a = parseInt(keyAInput.value);
    const b = parseInt(keyBInput.value);

    if (!text || isNaN(a) || isNaN(b)) {
      affineResultBox.textContent = "Enter text + keys";
      return;
    }

    let result = "";
    for (let i = 0; i < text.length; i++) {
      result += decryptChar(text[i], a, b);
    }

    affineResultBox.textContent = result.toUpperCase();
  });

  // BRUTE FORCE
  affineBruteBtn.addEventListener("click", () => {
    const text = affineInput.value;
    if (!text) {
      affineResultBox.textContent = "Enter text first";
      return;
    }

    let output = "";

    for (let a of validA) {
      for (let b = 0; b < 26; b++) {
        let attempt = "";
        for (let i = 0; i < text.length; i++) {
          attempt += decryptChar(text[i], a, b);
        }
        output += `a=${a}, b=${b}: ${attempt}<br>`;
      }
    }

    affineResultBox.innerHTML = output.toUpperCase();
  });
})();
