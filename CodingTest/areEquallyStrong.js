function areEquallyStrong(yourLeft, yourRight, friendsLeft, friendsRight) {
  let myPower = yourLeft + yourRight;
  let friendsPower = friendsLeft + friendsRight;

  if (
    (yourLeft,
    yourRight,
    friendsLeft,
    friendsRight >= 0 && yourLeft,
    yourRight,
    friendsLeft,
    friendsRight <= 20)
  ) {
    if (myPower === friendsPower) {
      if (
        yourLeft === friendsLeft ||
        (yourLeft === friendsRight && yourRight === friendsLeft) ||
        yourRight === friendsLeft
      ) {
        return true;
      }
    }
  }
  return false;
}

function arrayMaximalAdjacentDifference(arr) {
  let i = 0;
  let differenceArr = [];
  while (i < arr.length - 1) {
    let difference = Math.abs(arr[i] - arr[i + 1]);
    differenceArr.push(difference);
    i++;
  }
  return Math.max.apply(null, differenceArr);
}

arrayMaximalAdjacentDifference([1, 2, 3, 4]);

function arrayMaximalAdjacentDifference2(arr) {
  return Math.max(...arr.slice(1).map((x, i) => Math.abs(x - arr[i])));
}
