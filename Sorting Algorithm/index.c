#include <stdio.h>
#include <stdlib.h>

void merge(int arr[], int left, int middle, int right)
{
    int i, j, k;
    int n1 = middle - left + 1;
    int n2 = right - middle;
    int L[n1], R[n2];

    for (i = 0; i < n1; i++)
        L[i] = arr[left + i];
    for (j = 0; j < n2; j++)
        R[j] = arr[middle + 1 + j];
    i = 0;
    j = 0;
    k = left;
    while (i < n1 && j < n2)
    {
        if (L[i] <= R[j])
        {
            arr[k] = L[i];
            i++;
        }
        else
        {
            arr[k] = R[j];
            j++;
        }
        k++;
    }
    while (i < n1)
    {
        arr[k] = L[i];
        i++;
        k++;
    }
    while (j < n2)
    {
        arr[k] = R[j];
        j++;
        k++;
    }
}

void mergeSort(int arr[], int left, int right)
{
    if (left < right)
    {
        int middle = left + (right - left) / 2;
        mergeSort(arr, left, middle);
        mergeSort(arr, middle + 1, right);
        merge(arr, left, middle, right);
    }
}

int partition(int arr[], int low, int high)
{
    int pivot = arr[high];
    int i = (low - 1);
    for (int j = low; j <= high - 1; j++)
    {
        if (arr[j] < pivot)
        {
            i++;
            int temp = arr[i];
            arr[i] = arr[j];
            arr[j] = temp;
        }
    }
    int temp = arr[i + 1];
    arr[i + 1] = arr[high];
    arr[high] = temp;
    return (i + 1);
}

void quickSort(int arr[], int low, int high)
{
    if (low < high)
    {
        int pi = partition(arr, low, high);
        quickSort(arr, low, pi - 1);
        quickSort(arr, pi + 1, high);
    }
}

int quickSelect(int arr[], int left, int right, int k)
{
    if (left == right)
        return arr[left];

    int pivotIndex = partition(arr, left, right);

    if (k == pivotIndex)
        return arr[k];
    else if (k < pivotIndex)
        return quickSelect(arr, left, pivotIndex - 1, k);
    else
        return quickSelect(arr, pivotIndex + 1, right, k);
}

void generateArray(int arr1[], int arr2[], int arr3[], int n)
{
    for (int i = 0; i < n; i++)
    {
        arr1[i] = rand() % 10000000;
        arr2[i] = arr1[i];
        arr3[i] = arr1[i];
    }
}

int main()
{
    int n, k;

    // printf("Select Sorting Algorithm\n");
    // printf("1. Merge Sort\n");
    // printf("2. Quick Sort\n");
    // printf("3. Quick Select\n");
    // printf("Enter your choice: ");
    // scanf("%d", &select);

    printf("Enter the number of elements (n): ");
    scanf("%d", &n);

    int *arr1 = (int *)malloc(n * sizeof(int));
    int *arr2 = (int *)malloc(n * sizeof(int));
    int *arr3 = (int *)malloc(n * sizeof(int));
    generateArray(arr1, arr2, arr3, n);

    printf("Enter k: ");
    scanf("%d", &k);
    printf("\n");

    printf("Elements of the array before sorting: \n");

    for (int i = 0; i < n; i++)
    {
        printf("%d ", arr1[i]);
    }

    printf("\n");

    mergeSort(arr1, 0, n - 1);
    printf("\nMerge Sort\n");
    printf("%d smallest element\n", k);
    for (int i = 0; i < k; i++)
    {
        printf("%d ", arr1[i]);
    }
    printf("\n");

    quickSort(arr2, 0, n - 1);
    printf("\nQuick Sort\n");
    printf("%d smallest element\n", k);
    for (int i = 0; i < k; i++)
    {
        printf("%d ", arr2[i]);
    }
    printf("\n");

    int kSmallest = quickSelect(arr3, 0, n - 1, k - 1);
    printf("\nQuick Select\n");
    printf("The %d-th smallest element is %d\n", k, kSmallest);

    free(arr1);
    free(arr2);
    free(arr3);

    return 0;
}