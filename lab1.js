const asyncMap = (array, callback, finalCallback) => {
    const result = [];
    let counter = 0;
    array.forEach((item, index) => {
        callback(item, (error, value) => {
            if (error) {
                result.push(null);
                console.error(`Error at index ${index}`);
            }
            else {
                result.push(value);
            }
            counter++;
            if (counter === array.length)
                finalCallback(result);
        })
    })
}
const demo = () => {
    const numbers = [1, 2, 3, 4, 5, 6];
    const asyncDouble = (number, callback) => {
        setTimeout(() => {
            if (Math.random() > 0.6)
                callback(true);
            else
                callback(null, number * 2);
        }, 1500);
    }
    asyncMap(numbers, asyncDouble, result => {
        console.log(result);
    });
}
demo();
