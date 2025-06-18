const emoji = document.getElementById("emoji");
const name = document.getElementById("name");
const btn = document.getElementById("btn");
let emojis = [];
const maxRetries = 3;

// Load Emojis and store an object
const loadEmojis = async () => {
    btn.disabled = true;
    for (let retries = 0; retries < maxRetries; retries++) {
        try {
            const data = await fetch(
                "https://emoji-api.com/emojis?access_key=6bb2b1dfefb3acf5e6bb8c518adb3d113cfd8d56"
            );

            const response = await data.json();
            emojis = response;
            btn.disabled = false;
            name.innerText = "Go... Get Emoji";

            return;
            // console.log(emojis)
        } catch (e) {
            name.innerText = "Please check your internet and Try Again";
            btn.innerText = "Try Again";
        }
    }
};

// Print Emoji on the Screen

const printEmojis = async () => {
    name.innerText = "Please Wait...";
    if (emojis.length === 0) {
        await loadEmojis();
    }
    const num = Math.floor(Math.random() * emojis.length);
    try {
        emoji.innerText = emojis[num].character;
        name.innerText = emojis[num].unicodeName.toUpperCase();
    } catch (error) {
        name.innerText = "Please check your internet and Try Again";
        btn.innerText = "Try again";
    }
    btn.innerText = "Get another";
    btn.disabled = false;
};
loadEmojis();
btn.addEventListener("click", printEmojis);
