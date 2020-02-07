let selectionSort = () => {
  if (selectionSorted >= array.length - 1) {
    running = false;
    return;
  }

  if (array[selectionIndex] < smallestNumber) {
    smallestNumber = array[selectionIndex];
    smallestIndex = selectionIndex;
  }

  let rectColor = color(255, 0, 0);
  noStroke();
  fill(rectColor);
  rect(selectionIndex * rectWidth, 0, rectWidth, array[selectionIndex] * 10);
  rect(smallestIndex * rectWidth, 0, rectWidth, array[smallestIndex] * 10);
};

export default selectionSort;
