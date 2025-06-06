const emoji = document.getElementById("emoji");
const name = document.getElementById("name");
const btn = document.getElementById("btn")
let emojis = []


// Load Emojis and store an object 
const loadEmojis = async() => {
  
  let retries = 0;
  let maxRetries = 3
  
  try {
  const data =
  await
  fetch("https://emoji-api.com/emojis?access_key=6bb2b1dfefb3acf5e6bb8c518adb3d113cfd8d56");
  
  const response = await data.json();
  emojis = response;
  
 // console.log(emojis)
  }
  catch(error){
    
    setTimeout(() =>{
      loadEmojis();
    },1000)
    
    retries += 1;
    if(retries > maxRetries){
      return;
    }
  }
}

// Print Emoji on the Screen

const printEmojis = async () => {
  if(emojis.length === 0){
    await loadEmojis();
  }
  const num = Math.floor(Math.random() * emojis.length);
  emoji.innerText = emojis[num].character;
  name.innerText = emojis[num].unicodeName;
  console.log(emojis[num])
}

btn.addEventListener("click", printEmojis)