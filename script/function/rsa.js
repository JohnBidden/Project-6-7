// =====================================
// RSA DEMO (Clean & Professional)
// Controls: keygen + encrypt + decrypt
// =====================================

(() => {
  // ---------- ELEMENTS ----------
  const pInput = document.getElementById("rsa-keygen-p");
  const qInput = document.getElementById("rsa-keygen-q");
  const keygenBtn = document.getElementById("rsa-keygen-btn");
  const keygenResult = document.getElementById("rsa-keygen-result");

  const encInput = document.getElementById("rsa-encrypt-input");
  const encE = document.getElementById("rsa-encrypt-key-e");
  const encN = document.getElementById("rsa-encrypt-key-n");
  const encBtn = document.getElementById("rsa-encrypt-btn");
  const encResult = document.getElementById("rsa-encrypt-result");

  const decInput = document.getElementById("rsa-decrypt-input");
  const decD = document.getElementById("rsa-decrypt-key-d");
  const decN = document.getElementById("rsa-decrypt-key-n");
  const decBtn = document.getElementById("rsa-decrypt-btn");
  const decResult = document.getElementById("rsa-decrypt-result");

  // ---------- HELPERS ----------

  function gcd(a, b) {
    while (b !== 0) {
      [a, b] = [b, a % b];
    }
    return a;
  }

  function modInverse(e, phi) {
    for (let d = 1; d < phi; d++) {
      if ((e * d) % phi === 1) return d;
    }
    return null;
  }

  function isPrime(n) {
    if (n < 2) return false;
    for (let i = 2; i <= Math.sqrt(n); i++) {
      if (n % i === 0) return false;
    }
    return true;
  }

  function charToNum(c) {
    return c.charCodeAt(0) - 65;
  }

  function numToChar(n) {
    return String.fromCharCode((n % 26) + 65);
  }

  function cleanText(t) {
    return t.toUpperCase().replace(/[^A-Z]/g, "");
  }

  // ---------- KEY GENERATION ----------
  keygenBtn.addEventListener("click", () => {
    const p = parseInt(pInput.value);
    const q = parseInt(qInput.value);

    if (isNaN(p) || isNaN(q)) {
      keygenResult.textContent = "PLEASE INPUT p AND q";
      return;
    }

    if (!isPrime(p) || !isPrime(q)) {
      keygenResult.textContent = "p AND q MUST BE PRIME";
      return;
    }

    const n = p * q;
    const phi = (p - 1) * (q - 1);

    let e = 3;
    while (e < phi && gcd(e, phi) !== 1) {
      e += 2;
    }

    const d = modInverse(e, phi);

    keygenResult.innerHTML =
      `n = ${n}<br>` +
      `phi = ${phi}<br>` +
      `Public key (e,n): (${e}, ${n})<br>` +
      `Private key (d,n): (${d}, ${n})`;
  });

  // ---------- ENCRYPT ----------
  encBtn.addEventListener("click", () => {
    const raw = encInput.value;
    const e = parseInt(encE.value);
    const n = parseInt(encN.value);

    if (!raw.trim()) {
      encResult.textContent = "PLEASE INPUT TEXT";
      return;
    }

    if (isNaN(e) || isNaN(n)) {
      encResult.textContent = "ENTER e AND n";
      return;
    }

    const text = cleanText(raw);

    let output = [];

    for (let char of text) {
      const m = charToNum(char);
      const c = Math.pow(m, e) % n;
      output.push(c);
    }

    encResult.textContent = output.join(" ");
  });

  // ---------- DECRYPT ----------
  decBtn.addEventListener("click", () => {
    const raw = decInput.value;
    const d = parseInt(decD.value);
    const n = parseInt(decN.value);

    if (!raw.trim()) {
      decResult.textContent = "PLEASE INPUT TEXT";
      return;
    }

    if (isNaN(d) || isNaN(n)) {
      decResult.textContent = "ENTER d AND n";
      return;
    }

    const nums = raw.split(" ");
    let result = "";

    for (let num of nums) {
      const c = parseInt(num);
      const m = Math.pow(c, d) % n;
      result += numToChar(m);
    }

    decResult.textContent = result.toUpperCase();
  });
})();
