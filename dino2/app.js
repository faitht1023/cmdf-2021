document.addEventListener("DOMContentLoaded", () => {
  const dino = document.querySelector(".dino");
  const mary = document.querySelector(".mary");
  const grid = document.querySelector(".grid");
  const body = document.querySelector("body");
  const alert = document.getElementById("alert");
  const modal = document.getElementById("modal");
  let isJumping = false;
  let gravity = 0.9;
  let isGameOver = false;

  //This is made
  function control(e) {
    if (e.keyCode === 32) {
      if (!isJumping) {
        isJumping = true;
        jump();
      }
    }
  }
  document.addEventListener("keyup", control);

  let position = 0;
  function jump() {
    let count = 0;
    let timerId = setInterval(function () {
      //move down
      if (count === 15) {
        clearInterval(timerId);
        let downTimerId = setInterval(function () {
          if (count === 0) {
            clearInterval(downTimerId);
            isJumping = false;
          }
          position -= 6;
          count--;
          position = position * gravity;
          console.log(position);
          if (dino) dino.style.bottom = position + "px";
          if (mary) mary.style.bottom = position + "px";
        }, 20);
      }
      //move up
      position += 40;
      count++;
      position = position * gravity;
      if (dino) dino.style.bottom = position + "px";
      if (mary) mary.style.bottom = position + "px";
    }, 20);
  }

  function generateObstacles() {
    // has to do with frequency
    let randomTime = Math.random() * 4000 + 100;
    let obstaclePosition = 1000;
    const obstacle = document.createElement("div");
    if (!isGameOver) if (dino) obstacle.classList.add("obstacle");
    if (mary) obstacle.classList.add("obstacle2");
    grid.appendChild(obstacle);
    obstacle.style.left = obstaclePosition + "px";

    let timerId = setInterval(function () {
      if (
        obstaclePosition > 0 &&
        obstaclePosition < 60 &&
        position < 60 &&
        !isGameOver
      ) {
        clearInterval(timerId);
        isGameOver = true;
        modal.style.display = "block";
        //remove all children
        body.removeChild(body.firstChild);
        while (grid.firstChild) {
          grid.removeChild(grid.lastChild);
        }
      }
      obstaclePosition -= 7;
      obstacle.style.left = obstaclePosition + "px";
    }, 20);

    if (!isGameOver) {
      setTimeout(generateObstacles, randomTime);
    }
  }
  generateObstacles();
});
