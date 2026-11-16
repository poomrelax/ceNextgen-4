// 4-3 · Read what users type with input.value

const input = document.querySelector("#age");
const btn = document.querySelector("#btn");
const result = document.querySelector("#result");

btn.addEventListener("click", () => {
    if(input.value >= 18){
        result.textContent = "คุณมีอายุมากกว่าหรือเท่ากับ 18"
        result.style.color = "green"
    }else{
        result.textContent = "คุณมีอายุน้อยกว่า 18"
        result.style.color = "red"
    }
})