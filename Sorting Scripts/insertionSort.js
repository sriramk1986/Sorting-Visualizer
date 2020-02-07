let insertionSort = () => {
  if (amountOrdered >= array.length) {
    running = false;
    return;
  }

  let rectColor = color(255, 0, 0);
  noStroke();
  fill(rectColor);
  rect(currIndex * rectWidth, 0, rectWidth, array[currIndex] * 10);
  rect((currIndex - 1) * rectWidth, 0, rectWidth, array[currIndex - 1] * 10);

  let temp = array[currIndex - 1];
  if (temp > array[currIndex]) {
    array[currIndex - 1] = array[currIndex];
    array[currIndex] = temp;
  }
};

export default insertionSort;
