const song = document.getElementById("song");
const musicButton = document.getElementById("musicButton");
const musicStatus = document.getElementById("musicStatus");

const form = document.getElementById("giftForm");
const nameInput = document.getElementById("nameInput");

const result = document.getElementById("result");
const resultText = document.getElementById("resultText");

const shareLink = document.getElementById("shareLink");
const copyButton = document.getElementById("copyButton");

const shareButton = document.getElementById("shareButton");
const whatsappButton = document.getElementById("whatsappButton");


/* MUSIC */

musicButton.addEventListener("click", async function () {

  if (song.paused) {

    try {

      await song.play();

      musicButton.textContent = "❚❚";

      musicStatus.textContent =
        "भक्ति संगीत चल रहा है 🎵";

    } catch (error) {

      alert(
        "पहले song.mp3 file GitHub में upload करें।"
      );

    }

  } else {

    song.pause();

    musicButton.textContent = "▶";

    musicStatus.textContent =
      "संगीत रोक दिया गया";

  }

});


/* NAME CLEAN */

function cleanName(name) {

  return name
    .replace(/\s+/g, " ")
    .trim()
    .substring(0, 50);

}


/* CREATE LINK */

function createGiftLink(name) {

  const baseURL =
    window.location.origin +
    window.location.pathname;

  return baseURL +
    "?name=" +
    encodeURIComponent(name);

}


/* FORM */

form.addEventListener("submit", function(event) {

  event.preventDefault();

  const name =
    cleanName(nameInput.value);

  if (!name) {

    alert("कृपया अपना नाम लिखें।");

    return;

  }


  const link =
    createGiftLink(name);


  resultText.textContent =
    name +
    " ने आप के लिए Gift भेजा है 🎁";


  shareLink.value = link;


  whatsappButton.href =
    "https://wa.me/?text=" +
    encodeURIComponent(
      name +
      " ने आप के लिए Gift भेजा है 🎁\n\n" +
      link
    );


  result.style.display = "block";


  /*
    URL को बदल देते हैं ताकि
    यही personalized link बन जाए।
  */

  window.history.replaceState(
    {},
    "",
    "?name=" +
    encodeURIComponent(name)
  );


  result.scrollIntoView({
    behavior: "smooth",
    block: "center"
  });

});


/* COPY */

copyButton.addEventListener(
  "click",
  async function() {

    try {

      await navigator.clipboard.writeText(
        shareLink.value
      );

      copyButton.textContent =
        "Copied ✓";

      setTimeout(function() {

        copyButton.textContent =
          "Copy";

      }, 2000);

    } catch {

      shareLink.select();

      document.execCommand("copy");

      alert("Gift Link copy हो गया।");

    }

  }
);


/* SHARE */

shareButton.addEventListener(
  "click",
  async function() {

    const link =
      shareLink.value;

    if (navigator.share) {

      try {

        await navigator.share({

          title:
            "नवरात्रि Gift 🎁",

          text:
            resultText.textContent,

          url:
            link

        });

      } catch {

        // User cancelled share

      }

    } else {

      await navigator.clipboard.writeText(link);

      alert(
        "Link copy हो गया। अब इसे WhatsApp या किसी भी app में भेज सकते हैं।"
      );

    }

  }
);


/* READ NAME FROM URL */

function showSenderName() {

  const params =
    new URLSearchParams(
      window.location.search
    );

  const sender =
    cleanName(
      params.get("name") || ""
    );

  if (!sender) return;


  const heading =
    document.querySelector(".heading");


  heading.innerHTML = `

    <div class="small-title">
      🎁 आपके लिए एक खास Gift 🎁
    </div>

    <h1>

      <strong>${escapeHTML(sender)}</strong>

      <br>

      <span>ने आपके लिए</span>

      <br>

      <strong>
        नवरात्रि का Gift भेजा है
      </strong>

    </h1>

    <p>
      माता रानी की कृपा
      आप और आपके परिवार पर बनी रहे 🙏
    </p>

  `;


  document.title =
    sender +
    " ने आपके लिए नवरात्रि का Gift भेजा है 🎁";

}


/* SECURITY */

function escapeHTML(text) {

  return text.replace(
    /[&<>"']/g,
    function(character) {

      const entities = {

        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#039;"

      };

      return entities[character];

    }
  );

}


showSenderName();
