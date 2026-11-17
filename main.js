const menu = document.querySelectorAll(".menu p")
const content = document.querySelector(".content")
const contentBtn = document.getElementById('btnHome')
const container = document.querySelector(".container")
const contact = document.querySelector(".contact")
const profileImage = document.querySelector("#profileImage")
const mousce = document.querySelector(".mousce")
const fullname = document.getElementById("fullname")
const nickname = document.getElementById("nickname")
const age = document.getElementById("age")

const viw = new Audio("./audio/magic-fairy.mp3")

const path = location.href.split('/').at(-1) || "index.html"
let page = ""

function playsoundBoom(){
    const boomSound = new Audio("./audio/vine-boom.mp3")
    boomSound.play()
}

viw.play()


function setPageLocal(){
    switch(path){
        case 'profile.html':
            page = "profile"
            break
        case 'index.html':
            page = "home"
            break
        case 'performance.html':
            page = "performance"
            break
        default:
            break
        
    }
}

setPageLocal()


container.insertAdjacentHTML("afterbegin", `
        <nav>
            <div class="headerText" onclick="window.location.href = '/'" style="cursor: pointer">
                <img src="./images/poomrelaxIconPNG.png" alt="logo">
                <p class="">Portfolio Website Relax</p>
            </div>
            <div class="menu">
                <p class="${page == 'home' ? 'active' : ''}" onclick="window.location.href = 'index.html'">Home</p>
                <p class="${page == 'profile' ? 'active' : ''}" onclick="window.location.href = 'profile.html'">Profile</p>
                <p class="${page == 'performance' ? 'active' : ''}" onclick="window.location.href = 'performance.html'">Performance</p>
            </div>
        </nav>
`)


const profileData = fetch("./data/profile.json").then(r => r.json()).then(res => {
    profileImage.src = res.profile
    fullname.textContent = res.fullName
    nickname.textContent = res.nickname
    age.textContent = res.age

    // array
    const contactIcon = ['https://thumb.wikimedia.org/wikipedia/commons/thumb/a/a6/Tiktok_icon.svg/3840px-Tiktok_icon.svg.png?utm_source=commons.wikimedia.org&utm_campaign=index&utm_content=thumbnail', res.tik, 'https://thumb.wikimedia.org/wikipedia/commons/thumb/0/05/Facebook_Logo_%282019%29.png/1280px-Facebook_Logo_%282019%29.png?utm_source=th.wikipedia.org&utm_campaign=index&utm_content=thumbnail', res.facebook, 'https://static.vecteezy.com/system/resources/thumbnails/023/741/066/small/discord-logo-icon-social-media-icon-free-png.png', res.discord]

    for(let i = 0; i < contactIcon.length; i=i+2){
        // console.log(i)
        const a = document.createElement("a")
        const image = document.createElement("img")
        image.src = contactIcon[i]

        // image strle chang 1
        image.style.width = "30px"
        // image strle chang 2
        image.style.cursor = 'pointer'
        
        a.append(image)
        a.href = contactIcon[i+1]
        a.target = '_blank'

        contact.append(a)
    }
    // even 1
    profileImage.addEventListener('mouseover', () => {
        profileImage.src = './images/joke.png'
        profileImage.height = ''
        playsoundBoom()
    })
    profileImage.addEventListener('mouseleave', () => {
        profileImage.src = './images/profile.webp'
    })
})



// even 2
contentBtn.addEventListener('click', () => {
    window.location.href = 'profile.html'
})

// even3
document.addEventListener('mousemove', (e) => {
    mousce.style.top = (e.screenY - 125) + 'px'
    mousce.style.left = (e.screenX - 6) + 'px'
})
