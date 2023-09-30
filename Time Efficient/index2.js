function merge(arr, left, middle, right) {
  let i, j, k
  let n1 = middle - left + 1
  let n2 = right - middle
  let L = new Array(n1)
  let R = new Array(n2)

  for (i = 0; i < n1; i++) L[i] = arr[left + i]
  for (j = 0; j < n2; j++) R[j] = arr[middle + 1 + j]
  i = 0
  j = 0
  k = left
  while (i < n1 && j < n2) {
    if (L[i] <= R[j]) {
      arr[k] = L[i]
      i++
    } else {
      arr[k] = R[j]
      j++
    }
    k++
  }
  while (i < n1) {
    arr[k] = L[i]
    i++
    k++
  }
  while (j < n2) {
    arr[k] = R[j]
    j++
    k++
  }
}

function mergeSort(arr, left, right) {
  if (left < right) {
    let middle = Math.floor(left + (right - left) / 2)
    mergeSort(arr, left, middle)
    mergeSort(arr, middle + 1, right)
    merge(arr, left, middle, right)
  }
}

function partition(arr, low, high) {
  let pivot = arr[high]
  let i = low - 1
  for (let j = low; j <= high - 1; j++) {
    if (arr[j] < pivot) {
      i++
      let temp = arr[i]
      arr[i] = arr[j]
      arr[j] = temp
    }
  }
  let temp = arr[i + 1]
  arr[i + 1] = arr[high]
  arr[high] = temp
  return i + 1
}

function quickSort(arr, low, high) {
  if (low < high) {
    let pi = partition(arr, low, high)
    quickSort(arr, low, pi - 1)
    quickSort(arr, pi + 1, high)
  }
}

function quickSelect(arr, left, right, k) {
  if (left === right) return arr[left]

  let pivotIndex = partition(arr, left, right)

  if (k === pivotIndex) return arr[k]
  else if (k < pivotIndex) return quickSelect(arr, left, pivotIndex - 1, k)
  else return quickSelect(arr, pivotIndex + 1, right, k)
}

function generateArray(n) {
  let arr = new Array(n)
  for (let i = 0; i < n; i++) {
    arr[i] = Math.floor(Math.random() * 10000000)
  }
  return arr
}

function main() {
  let n = [
    50, 100, 500, 1000, 5000, 10000, 50000, 100000, 500000, 1000000, 5000000,
    10000000, 20000000, 50000000,
  ]
  let k = [5, 10, 50, 100, 1000]
  let nSize = n.length
  let kSize = k.length

  for (let i = 0; i < nSize; i++) {
    let arr1 = generateArray(n[i])
    let arr2 = [...arr1]
    let arr3 = [...arr1]

    for (let j = 0; j < kSize; j++) {
      let arrtemp1 = [...arr1]
      let arrtemp2 = [...arr2]
      let arrtemp3 = [...arr3]

      let start, end

      start = performance.now()
      mergeSort(arrtemp1, 0, n[i] - 1)
      end = performance.now()
      console.log(
        `Merge Sort (n = ${n[i]}, k = ${k[j]}) Time = ${
          (end - start) / 1000
        } seconds`
      )

      start = performance.now()
      quickSort(arrtemp2, 0, n[i] - 1)
      end = performance.now()
      console.log(
        `Quick Sort (n = ${n[i]}, k = ${k[j]}) Time = ${
          (end - start) / 1000
        } seconds`
      )

      start = performance.now()
      quickSelect(arrtemp3, 0, n[i] - 1, k[j] - 1)
      end = performance.now()
      console.log(
        `Quick Select (n = ${n[i]}, k = ${k[j]}) Time = ${
          (end - start) / 1000
        } seconds`
      )
    }
  }
}

main()
