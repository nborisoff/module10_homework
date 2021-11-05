let btn = document.querySelector(".btn");

function getScreenInfo() {
    alert(`Ширина экрана: ${window.screen.width}\nВысота экрана: ${window.screen.height}`);
}

btn.addEventListener("click", getScreenInfo);