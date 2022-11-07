

/**
 *  Задача 19: Нахождение максимальной возрастающей (неубывающей) подпоследовательности
 * 
 *  Для решения задачи используется подход динамического программирования + бинарный поиск
 *  Сложность логаритма N * logN
 *  N - перебор входного масссива, logN - бинарный поиск во вспомогательном массиве
 *  
 *  Для нахождения длины наибольшей неубывающей последовательности ведем вспомогательный массив dynamic
 *  dynamic[i] - число на которое оканчивается неубываяющая последовательность длины i
 *  (если таких последовательностей несколько, то наименьшее число)
 *  При обработке массива arr мы бинарным поиском находим первое число в массиве dynamic,
 *  которое больше текущего arr[i] и обновляем его
 *  Перед перебором основного массива заполняем dynamic[0] -Infinity, а все остальные числа Infinity
 *  
 *  Для восстановления последовательности заполненяем два доп. массива: position и previous
 *  В position[i] храним индекс элемента, на который заканчивается последовательность длины i
 *  А в previous[i] индекс элемента последовательности a[i - 1] 
 *  
*/


/**
 * @param {number[]}
 * @return {number[]}
*/

const findLongestNonDecreasingSubsequence = arr => {
    const originalArrayLength = arr.length
    let dynamic = Array(originalArrayLength + 1)
    let position = Array(originalArrayLength + 1)
    let previous = Array(originalArrayLength)
    let LNDSlength = 0

    position[0] = -1
    dynamic[0] = -Infinity

    for (let i = 1; i < originalArrayLength + 1; i++){
        dynamic[i] = Infinity
    }

    for (let i = 0; i < originalArrayLength; i++){
        const j = binarySearchFirstGreater(dynamic, arr[i])
        dynamic[j] = arr[i]
        position[j] = i
        previous[i] = position[j - 1]
        LNDSlength = Math.max(LNDSlength, j)
    }

    let answer = []
    let p = position[LNDSlength]

    while (p !== -1){
        answer.unshift(arr[p])
        p = previous[p]
    }

    return answer
}

const binarySearchFirstGreater = (arr, target) => {
    let left = 0
    let right = arr.length
    let middle

    while (left <= right) {
        middle = Math.floor((left + right)/2)
        
        if (arr[middle] > target) {
            if (arr[middle - 1] <= target) return middle
            else right = middle - 1
        } else {
            left = middle + 1
        }
    }
    return -1
}
