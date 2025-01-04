const asyncMap = (array, callback, finalCallback) => {
    const results = [];
    const errors = [];
    let counter = 0;
    array.forEach((item, index) => {
        callback(item, (error, value) => {
            if (error)
                errors.push(`Error at index ${index}`)
            else
                results.push(value);
            counter++;
            if (counter === array.length)
                finalCallback(errors, results);
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
    asyncMap(numbers, asyncDouble, (errors, results) => {
        console.log(errors, results);
    });
}
demo();
