const button = document.querySelector("#exec");
const hor = document.querySelector("#hor");
const ver = document.querySelector("#ver");
const mine = document.querySelector("#mine");
const tbody = document.querySelector("#table tbody");

let dataSet = [];
let width = 0;
let height = 0;
let numberOfMines = parseInt(mine.value);

function getNumberForMine() {
  let shuffledNums = [];
  let candidateNums = Array(width * height)
    .fill()
    .map((value, index) => {
      return index;
    });
  while (candidateNums.length > 80) {
    let selectedNum = candidateNums.splice(
      Math.floor(Math.random() * candidateNums.length),
      1
    )[0];
    shuffledNums.push(selectedNum);
  }
  console.log(shuffledNums);
  insertMine(shuffledNums);
}

function insertMine(arr) {
  for (let i = 0; i < arr.length; i++) {
    let vertical = Math.floor(arr[i] / 10);
    let horizontal = arr[i] % 10;
    console.log(vertical, horizontal);
    tbody.children[vertical].children[horizontal].textContent = "X";
    dataSet[vertical][horizontal] = "X";
  }
}

function makeDifficultMark(e) {
  e.preventDefault();
  let parentTr = e.currentTarget.parentNode;
  let parentTbody = e.currentTarget.parentNode.parentNode;
  let selectedRoom = Array.prototype.indexOf.call(
    parentTr.children,
    e.currentTarget
  );
  let selectedLine = Array.prototype.indexOf.call(
    parentTbody.children,
    parentTr
  );
  console.log(
    parentTr,
    parentTbody,
    e.currentTarget,
    selectedRoom,
    selectedLine
  );

  if (
    e.currentTarget.textContent === "" ||
    e.currentTarget.textContent === "X"
  ) {
    e.currentTarget.textContent = "!";
  } else if (e.currentTarget.textContent === "!") {
    e.currentTarget.textContent = "?";
  } else if (e.currentTarget.textContent === "?") {
    if (dataSet[selectedLine][selectedRoom] === 1) {
      e.currentTarget.textContent = "";
    } else if (dataSet[selectedLine][selectedRoom] === "X") {
      e.currentTarget.textContent = "X";
    }
  }
}

function activateLeftClick(e) {
  // number of mines around the spot which was clicked
  e.currentTarget.classList.add("opened");
  let parentTr = e.currentTarget.parentNode;
  let parentTbody = e.currentTarget.parentNode.parentNode;
  let selectedRoom = Array.prototype.indexOf.call(
    parentTr.children,
    e.currentTarget
  );
  let selectedLine = Array.prototype.indexOf.call(
    parentTbody.children,
    parentTr
  );
  if (dataSet[selectedLine][selectedRoom] === "X") {
    e.currentTarget.textContent = "Ep";
  } else {
    dataSet[selectedLine][selectedRoom] = 1;
    var around = [
      dataSet[selectedLine][selectedRoom - 1],
      dataSet[selectedLine][selectedRoom + 1],
    ];
    if (dataSet[selectedLine - 1]) {
      around = around.concat([
        dataSet[selectedLine - 1][selectedRoom - 1],
        dataSet[selectedLine - 1][selectedRoom],
        dataSet[selectedLine - 1][selectedRoom + 1],
      ]);
    }
    if (dataSet[selectedLine + 1]) {
      around = around.concat([
        dataSet[selectedLine + 1][selectedRoom - 1],
        dataSet[selectedLine + 1][selectedRoom],
        dataSet[selectedLine + 1][selectedRoom + 1],
      ]);
    }
    let numberOfMines = around.filter((v) => {
      return v === "X";
    }).length;
    e.currentTarget.textContent = numberOfMines;
    // open the room around it
    if (numberOfMines === 0) {
      let roomsAround = [];
      if (tbody.children[selectedLine - 1]) {
        roomsAround = roomsAround.concat([
          tbody.children[selectedLine - 1].children[selectedRoom - 1],
          tbody.children[selectedLine - 1].children[selectedRoom],
          tbody.children[selectedLine - 1].children[selectedRoom + 1],
        ]);
      }
      roomsAround = roomsAround.concat([
        tbody.children[selectedLine].children[selectedRoom - 1],
        tbody.children[selectedLine].children[selectedRoom + 1],
      ]);

      if (tbody.children[selectedLine + 1]) {
        roomsAround = roomsAround.concat([
          tbody.children[selectedLine + 1].children[selectedRoom - 1],
          tbody.children[selectedLine + 1].children[selectedRoom],
          tbody.children[selectedLine + 1].children[selectedRoom + 1],
        ]);
      }

      roomsAround
        .filter((v) => !!v)
        .forEach((roomAround) => {
          let parentTr = roomAround.parentNode;
          let parentTbody = roomAround.parentNode.parentNode;
          let nextRoom = Array.prototype.indexOf.call(
            parentTr.children,
            roomAround.currentTarget
          );
          let nextLine = Array.prototype.indexOf.call(
            parentTbody.children,
            parentTr
          );
          if (dataSet[nextLine][nextRoom] !== 1) {
            roomAround.click();
          }
        });
    }
  }
}

function handleRightClick(element) {
  element.addEventListener("contextmenu", makeDifficultMark);
}

function handleLeftClick(element) {
  element.addEventListener("click", activateLeftClick);
}

function generateMinesweeper() {
  tbody.textContent = "";
  width = parseInt(ver.value);
  height = parseInt(hor.value);
  for (let i = 0; i < width; i++) {
    dataSet.push(new Array(i));
    let tr = document.createElement("tr");
    for (let j = 0; j < height; j++) {
      dataSet[i][j] = 1;
      let td = document.createElement("td");
      handleRightClick(td);
      handleLeftClick(td);
      tr.appendChild(td);
    }
    tbody.appendChild(tr);
  }
  console.log(dataSet);
  getNumberForMine();
}

function init() {
  button.addEventListener("click", generateMinesweeper);
}

init();
