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

function handleRightClick(element) {
  element.addEventListener("contextmenu", makeDifficultMark);
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

var cbExample = function (number, cb) {
  setTimeout(() => {
    var sum = 0;
    for (var i = number; i > 0; i--) {
      sum += 1;
    }
    cb(sum);
  }, 0);
};

cbExample(10, function (result) {
  console.log(result);
});
