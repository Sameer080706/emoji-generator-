const emoji = document.getElementById("emoji");
const name = document.getElementById("name");
const btn = document.getElementById("btn");
let emojis = [];
const loader = document.getElementById("loader");
const maxRetries = 3;

const addLoad = () => {
    loader.classList.add("loader");
};
const removeLoad = () => {
    loader.classList.remove("loader");
};
// Load Emojis and store an object
const loadEmojis = async () => {
    addLoad();
    btn.disabled = true;
    for (let retries = 0; retries < maxRetries; retries++) {
        try {
            const data = await fetch(
                "https://emoji-api.com/emojis?access_key=6bb2b1dfefb3acf5e6bb8c518adb3d113cfd8d56"
            );

            const response = await data.json();
            emojis = response;
            btn.disabled = false;
            emoji.innerText = "👍";
            name.innerText = "Go... Get Emoji";
            removeLoad();
            return;
            // console.log(emojis)
        } catch (e) {
            name.innerText = "Please check your internet and Try Again";
            btn.innerText = "Try Again";
            btn.disabled = false;
            removeLoad();
        }
    }
};

// Print Emoji on the Screen

const printEmojis = async () => {
    addLoad();
    name.innerText = "Please Wait...";
    if (emojis.length === 0) {
        await loadEmojis();
    }
    const num = Math.floor(Math.random() * emojis.length);
    try {
        removeLoad();
        emoji.innerText = emojis[num].character;
        name.innerText = emojis[num].unicodeName.toUpperCase();
        btn.innerText = "Get another";
        btn.disabled = false;
    } 
    catch (e) {
        removeLoad();
        name.innerText = "Please check your internet and Try Again";
        btn.innerText = "Try again";
        console.log(e)
    }
};
loadEmojis();
btn.addEventListener("click", printEmojis);
