const typingText = document.querySelector(".typing-text p"),
  mistakeTag = document.querySelector(".mistake span"),
  timeTag = document.querySelector(".time span b"),
  wpmTag = document.querySelector(".wpm span"),
  cpmTag = document.querySelector(".cpm span"),
  tryAgainButton = document.querySelector("button"),
  inputField = document.querySelector(".input-field");

let timer,
  maxTime = 60,
  timeLeft = maxTime,
  charIndex = mistakes = isTyping = 0;

function randomParagraph() {
  let randIndex = Math.floor(Math.random() * paragraphs.length);
  typingText.innerHTML = "";
  paragraphs[randIndex].split("").forEach(span => {
    let spanTag = `<span>${span}</span>`;
    typingText.innerHTML += spanTag;
  });
  typingText.querySelectorAll("span")[0].classList.add("active");
  document.addEventListener("keydown", () => inputField.focus());
  typingText.addEventListener("click", () => inputField.focus());
}

randomParagraph();

function initTyping() {
  const charachters = typingText.querySelectorAll("span");
  let typedChar = inputField.value.split("")[charIndex];
  if (charIndex < charachters.length - 1 && timeLeft > 0) {
    if (!isTyping) {
      timer = setInterval(initTimer, 1000);
      isTyping = true;
    }

    if (typedChar == null) {
      charIndex--;
      if (charachters[charIndex].classList.contains("incorrect")) {
        mistakes--;
      }
      charachters[charIndex].classList.remove("correct", "incorrect");
    } else {
      if (charachters[charIndex].innerText === typedChar) {
        charachters[charIndex].classList.add("correct");
      } else {
        charachters[charIndex].classList.add("incorrect");
        mistakes++;
      }
      charIndex++;
    }
    charachters.forEach(span => span.classList.remove("active"));
    charachters[charIndex].classList.add("active");

    let wpm = Math.round(((charIndex - mistakes) / 5) / ((maxTime - timeLeft) / 60));
    wpmTag.innerText = wpm < 0 || !wpm || wpm == Infinity ? 0 : wpm;
    mistakeTag.innerText = mistakes;
    cpmTag.innerText = charIndex - mistakes;
  } else {
    inputField.value = "";
    clearInterval(timer);
  }
}

function initTimer() {
  if (timeLeft > 0) {
    timeLeft--;
    timeTag.innerText = timeLeft;
  } else {
    clearInterval(timer);
  }
}

function resetgame() {
  randomParagraph();
  timeLeft = maxTime,
    charIndex = mistakes = isTyping = 0;

  inputField.value = "";
  clearInterval(timer);

  timeTag.innerText = timeLeft;
  wpmTag.innerText = 0;
  mistakeTag.innerText = 0;
  cpmTag.innerText = charIndex - mistakes;
}

inputField.addEventListener("input", () => initTyping());
tryAgainButton.addEventListener("click", () => resetgame());