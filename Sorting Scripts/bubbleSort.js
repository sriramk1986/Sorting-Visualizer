function bubbleSort() {
  if (amountSorted + 1 >= array.length) {
    running = false;
    return;
  }

  let rectColor = color(255, 0, 0);
  noStroke();
  fill(rectColor);
  rect(index * rectWidth, 0, rectWidth, array[index] * 10);
  rect((index + 1) * rectWidth, 0, rectWidth, array[index + 1] * 10);

  let temp = array[index + 1];
  if (temp < array[index]) {
    array[index + 1] = array[index];
    array[index] = temp;
  }
}

module.exports = bubbleSort;
