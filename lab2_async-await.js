const asyncMap = async (array, fn) => {
    const results = [];
    const errors = [];
    for (const item of array) {
        try {
            const value = await fn(item);
            results.push(value);
        } catch (error) {
            errors.push(error);
        }
    }
    if (errors.length) throw { errors };
    return results;
};
const asyncSquare = (num) => {
    return new Promise((resolve, reject) => {
        setTimeout(reject, 1000, num ** 2);
    });
};
const numbers = [1, 2, 3, 4, 5];
(async () => {
    try {
        const response = await asyncMap(numbers, asyncSquare);
        console.log(response);
    } catch (error) {
        console.error(error);
    }
})();
