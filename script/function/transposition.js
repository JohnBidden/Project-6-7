// ===============================
// TRANSPOSITION CIPHER (CLEAN)
// Always outputs UPPERCASE
// ===============================

(() => {
  const input = document.getElementById("transposition-input");
  const keyInput = document.getElementById("transposition-key");

  const encryptBtn = document.getElementById("transposition-encrypt-btn");
  const decryptBtn = document.getElementById("transposition-decrypt-btn");

  const resultBox = document.getElementById("transposition-result");

  // ---------- HELPERS ----------

  function cleanText(text) {
    return text.toUpperCase().replace(/[^A-Z]/g, "");
  }

  function chunkText(text, size) {
    const rows = [];
    for (let i = 0; i < text.length; i += size) {
      rows.push(text.slice(i, i + size));
    }
    return rows;
  }

  // ---------- ENCRYPT ----------
  encryptBtn.addEventListener("click", () => {
    const raw = input.value;
    const key = parseInt(keyInput.value);

    if (!raw || isNaN(key) || key <= 0) {
      resultBox.textContent = "Enter text and Valid Key";
      return;
    }

    const text = cleanText(raw);

    const rows = chunkText(text, key);

    let result = "";

    for (let col = 0; col < key; col++) {
      for (let row = 0; row < rows.length; row++) {
        if (rows[row][col]) {
          result += rows[row][col];
        }
      }
    }

    resultBox.textContent = result.toUpperCase();
  });

  // ---------- DECRYPT ----------
  decryptBtn.addEventListener("click", () => {
    const raw = input.value;
    const key = parseInt(keyInput.value);

    if (!raw || isNaN(key) || key <= 0) {
      resultBox.textContent = "Enter text and Valid Key";
      return;
    }

    const text = cleanText(raw);

    const numRows = Math.ceil(text.length / key);
    const numFullCols = text.length % key;

    const grid = Array.from({ length: numRows }, () => Array(key).fill(""));

    let index = 0;

    for (let col = 0; col < key; col++) {
      for (let row = 0; row < numRows; row++) {
        if (col >= numFullCols && row === numRows - 1 && numFullCols !== 0) {
          continue;
        }
        if (index < text.length) {
          grid[row][col] = text[index++];
        }
      }
    }

    let result = "";

    for (let row = 0; row < numRows; row++) {
      for (let col = 0; col < key; col++) {
        result += grid[row][col];
      }
    }

    resultBox.textContent = result.toUpperCase();
  });
})();
