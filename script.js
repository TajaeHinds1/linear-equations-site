// Utilities
function closeEnough(a, b, eps = 1e-9) {
  return Math.abs(a - b) <= eps;
}

function parseMaybeNumber(value) {
  if (value === null || value === undefined) return null;
  const trimmed = String(value).trim();
  if (trimmed === "") return null;
  const n = Number(trimmed);
  return Number.isFinite(n) ? n : null;
}

// NAV toggle (mobile)
(function navToggle() {
  const btn = document.getElementById("navToggle");
  const header = document.querySelector(".site-header");
  if (!btn || !header) return;

  btn.addEventListener("click", () => {
    const isOpen = header.classList.toggle("nav-open");
    btn.setAttribute("aria-expanded", String(isOpen));
  });

  // Close menu when clicking a nav link
  document.querySelectorAll(".nav a").forEach(a => {
    a.addEventListener("click", () => {
      header.classList.remove("nav-open");
      btn.setAttribute("aria-expanded", "false");
    });
  });
})();

// Example A: Solve 2x + 3 = 11 => x = 4
(function exampleA() {
  const input = document.getElementById("xSolveA");
  const feedback = document.getElementById("feedbackA");
  const checkBtn = document.getElementById("checkA");
  const resetBtn = document.getElementById("resetA");

  const correct = 4;

  if (!input || !feedback || !checkBtn || !resetBtn) return;

  function setFeedback(msg, kind) {
    feedback.textContent = msg;
    feedback.style.color = kind === "ok" ? "rgba(124,247,212,0.95)" : "rgba(234,240,255,0.75)";
    feedback.style.borderColor = kind === "ok" ? "rgba(124,247,212,0.45)" : "rgba(255,255,255,0.12)";
    feedback.style.background = kind === "ok" ? "rgba(124,247,212,0.10)" : "rgba(255,255,255,0.03)";
  }

  checkBtn.addEventListener("click", () => {
    const x = parseMaybeNumber(input.value);
    if (x === null) {
      setFeedback("Please enter a number for x.", "bad");
      return;
    }

    if (closeEnough(x, correct, 1e-6)) {
      setFeedback("✅ Correct! Since 2(4) + 3 = 11, x = 4 works.", "ok");
    } else {
      setFeedback("❌ Not quite. Try again—remember to undo +3 and then ÷2.", "bad");
    }
  });

  resetBtn.addEventListener("click", () => {
    input.value = "";
    feedback.textContent = "";
    feedback.style.borderColor = "rgba(255,255,255,0.12)";
    feedback.style.background = "rgba(255,255,255,0.03)";
  });
})();

// Example B: y = 3x - 2
(function exampleB() {
  const xInput = document.getElementById("xFuncB");
  const yOut = document.getElementById("yOutB");
  const proof = document.getElementById("proofB");
  const evalBtn = document.getElementById("evalB");
  const resetBtn = document.getElementById("resetB");

  if (!xInput || !yOut || !proof || !evalBtn || !resetBtn) return;

  evalBtn.addEventListener("click", () => {
    const x = parseMaybeNumber(xInput.value);
    if (x === null) {
      yOut.value = "";
      proof.textContent = "Enter a valid number for x.";
      return;
    }

    const y = 3 * x - 2;
    yOut.value = String(y);

    proof.textContent = `Proof: y = 3(${x}) − 2 = ${3 * x} − 2 = ${y}`;
  });

  resetBtn.addEventListener("click", () => {
    xInput.value = "";
    yOut.value = "";
    proof.textContent = "";
  });
})();

// Example C: slope m from two points
(function exampleC() {
  const x1 = document.getElementById("x1C");
  const y1 = document.getElementById("y1C");
  const x2 = document.getElementById("x2C");
  const y2 = document.getElementById("y2C");
  const out = document.getElementById("mOutC");
  const feedback = document.getElementById("feedbackC");
  const btn = document.getElementById("slopeC");
  const resetBtn = document.getElementById("resetC");

  if (!x1 || !y1 || !x2 || !y2 || !out || !feedback || !btn || !resetBtn) return;

  btn.addEventListener("click", () => {
    const X1 = parseMaybeNumber(x1.value);
    const Y1 = parseMaybeNumber(y1.value);
    const X2 = parseMaybeNumber(x2.value);
    const Y2 = parseMaybeNumber(y2.value);

    if (X1 === null || Y1 === null || X2 === null || Y2 === null) {
      feedback.textContent = "Please fill in all four values (x₁, y₁, x₂, y₂).";
      feedback.style.color = "rgba(234,240,255,0.75)";
      feedback.style.borderColor = "rgba(255,255,255,0.12)";
      feedback.style.background = "rgba(255,255,255,0.03)";
      return;
    }

    const denom = (X2 - X1);
    if (closeEnough(denom, 0, 1e-12)) {
      out.value = "";
      feedback.textContent = "Slope is undefined when x₂ − x₁ = 0 (vertical line).";
      feedback.style.color = "rgba(234,240,255,0.75)";
      feedback.style.borderColor = "rgba(255,255,255,0.12)";
      feedback.style.background = "rgba(255,255,255,0.03)";
      return;
    }

    const m = (Y2 - Y1) / denom;
    out.value = String(m);

    feedback.textContent = `m = (y₂ − y₁)/(x₂ − x₁) = (${Y2} − ${Y1})/(${X2} − ${X1}) = ${m}`;
    feedback.style.color = "rgba(124,247,212,0.95)";
    feedback.style.borderColor = "rgba(124,247,212,0.45)";
    feedback.style.background = "rgba(124,247,212,0.10)";
  });

  resetBtn.addEventListener("click", () => {
    x1.value = ""; y1.value = ""; x2.value = ""; y2.value = "";
    out.value = "";
    feedback.textContent = "";
    feedback.style.borderColor = "rgba(255,255,255,0.12)";
    feedback.style.background = "rgba(255,255,255,0.03)";
  });
})();

// Practice: show answers + check
(function practice() {
  const showBtn = document.getElementById("showAnswersBtn");
  const clearBtn = document.getElementById("clearPracticeBtn");
  const checkBtn = document.getElementById("checkPracticeBtn");
  const problems = Array.from(document.querySelectorAll(".problem"));

  if (!showBtn || !clearBtn || !checkBtn || problems.length === 0) return;

  function setProblemFeedback(problemEl, msg, ok) {
    const fb = problemEl.querySelector(".probFeedback");
    if (!fb) return;
    fb.textContent = msg;
    fb.style.color = ok ? "rgba(124,247,212,0.95)" : "rgba(234,240,255,0.75)";
    fb.style.borderColor = ok ? "rgba(124,247,212,0.45)" : "rgba(255,255,255,0.12)";
    fb.style.background = ok ? "rgba(124,247,212,0.10)" : "rgba(255,255,255,0.03)";
    fb.style.padding = "10px";
    fb.style.borderRadius = "12px";
    fb.style.marginTop = "10px";
    fb.style.border = `1px solid ${ok ? "rgba(124,247,212,0.35)" : "rgba(255,255,255,0.10)"}`;
  }

  // "Show answers" expands all details.answerBox
  showBtn.addEventListener("click", () => {
    problems.forEach(p => {
      const details = p.querySelector(".answerBox");
      if (details) details.open = true;
    });
  });

  clearBtn.addEventListener("click", () => {
    problems.forEach(p => {
      const input = p.querySelector(".probInput");
      if (input) input.value = "";
      const fb = p.querySelector(".probFeedback");
      if (fb) fb.textContent = "";
    });
  });

  // Checking answers
  checkBtn.addEventListener("click", () => {
    let correctCount = 0;

    problems.forEach(p => {
      const input = p.querySelector(".probInput");
      const answerEl = input;
      if (!input || !answerEl) return;

      const expected = (answerEl.getAttribute("data-answer") || "").trim();
      const enteredRaw = input.value;

      // Numeric vs text
      const expectedNum = parseMaybeNumber(expected);
      const enteredNum = parseMaybeNumber(enteredRaw);

      if (expectedNum !== null && enteredNum !== null) {
        const ok = closeEnough(enteredNum, expectedNum, 1e-6);
        setProblemFeedback(p, ok ? "✅ Correct!" : "❌ Try again—check your steps.", ok);
        if (ok) correctCount += 1;
      } else {
        // Text comparison (normalize)
        const normalize = s => String(s).toLowerCase().replace(/\s+/g, " ").trim();
        const ok = normalize(enteredRaw) === normalize(expected);
        if (!String(enteredRaw).trim()) {
          setProblemFeedback(p, "Enter an answer first.", false);
        } else {
          setProblemFeedback(p, ok ? "✅ Correct equation!" : "❌ Not quite. Try matching the format exactly.", ok);
          if (ok) correctCount += 1;
        }
      }
    });

    // Optional: small end message in console or could be added in UI.
    // console.log(`Correct: ${correctCount}/${problems.length}`);
  });
})();