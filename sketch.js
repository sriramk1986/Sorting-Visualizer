let values = [];
let isRunning = false;

// Bubble Sort
let i = 0;
let j = 0;

// Selection Sort
let startIdx = 0;

// Insertion Sort:
let ordered = 0;
let current = 0;

// Quick Sort:
let states = [];

function setup() {
  sel = createSelect();
  sel.option("Bubble Sort");
  sel.option("Selection Sort");
  sel.option("Insertion Sort");
  sel.option("Quick Sort");
  reset = createButton("Reset");
  reset.mousePressed(resetValues);
  start = createButton("Sort");
  start.class("sort-button");
  start.mousePressed(startSort);

  createCanvas(1000, 500);
  frameRate(30);
  for (let i = 0; i < width / 8; i++) {
    values[i] = floor(random(height));
    states[i] = -1;
  }
}

function startSort() {
  if (!isRunning) {
    isRunning = true;
    sortMethod = sel.value();
  }
}

function draw() {
  background(220);
  if (isRunning) {
    if (sortMethod === "Bubble Sort") {
      bubbleSort();
    } else if (sortMethod === "Selection Sort") {
      selectionSort();
    } else if (sortMethod === "Insertion Sort") {
      insertionSort();
    } else if (sortMethod === "Quick Sort") {
      isRunning = false;
      quickSort(values, 0, values.length - 1);
    }
  }
  simulateSorting();
}

// Bubble Sort
function bubbleSort() {
  for (let k = 0; k < 16; k++) {
    if (i < values.length) {
      let temp = values[j];
      if (values[j] > values[j + 1]) {
        values[j] = values[j + 1];
        values[j + 1] = temp;
      }
      j++;
      if (j >= values.length - i - 1) {
        j = 0;
        i++;
      }
    } else {
      isRunning = false;
    }
  }
}

// Selection Sort
function selectionSort() {
  if (startIdx >= values.length - 1) {
    isRunning = false;
    return;
  }
  let smallestIdx = startIdx;
  for (let i = startIdx + 1; i < values.length; i++) {
    if (values[smallestIdx] > values[i]) {
      smallestIdx = i;
    }
  }
  swap(startIdx, smallestIdx, values);
  startIdx++;
}

// Insertion Sort
function insertionSort() {
  if (ordered >= values.length) {
    isRunning = false;
    return;
  }
  current = ordered;
  while (current > 0 && values[current] < values[current - 1]) {
    swap(current, current - 1, values);
    current -= 1;
  }
  ordered++;
}

// Swap function common to insertion and selection sort
function swap(i, j, values) {
  const temp = values[i];
  values[i] = values[j];
  values[j] = temp;
}

// Draws the rectangles for the array values to simulate the sorting effect
function simulateSorting() {
  for (let i = 0; i < values.length; i++) {
    stroke(100, 143, 143);
    fill(50);
    rect(i * 8, height, 8, -values[i], 20);
  }
}

// Sets all variables to initial state and initializes new values for the array
function resetValues() {
  isRunning = false;
  for (let i = 0; i < width / 8; i++) {
    values[i] = floor(random(height));
  }

  i = 0;
  j = 0;
  startIdx = 0;
  ordered = 0;
  current = 0;
  states = [];
}

async function quickSort(arr, start, end) {
  if (start >= end) {
    return;
  }
  let index = await partition(arr, start, end);
  states[index] = -1;
  await Promise.all([
    quickSort(arr, start, index - 1),
    quickSort(arr, index + 1, end)
  ]);
}

async function partition(arr, start, end) {
  for (let i = start; i < end; i++) {
    states[i] = 1;
  }
  let pivotIndex = start;
  let pivotValue = arr[end];
  states[pivotIndex] = 0;
  for (let i = start; i < end; i++) {
    if (arr[i] < pivotValue) {
      await quickSwap(arr, i, pivotIndex);
      states[pivotIndex] = -1;
      pivotIndex++;
      states[pivotIndex] = 0;
    }
  }
  await quickSwap(arr, pivotIndex, end);
  for (let i = start; i < end; i++) {
    states[i] = -1;
  }

  return pivotIndex;
}

async function quickSwap(arr, a, b) {
  await sleep(25);
  let temp = arr[a];
  arr[a] = arr[b];
  arr[b] = temp;
}

async function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
