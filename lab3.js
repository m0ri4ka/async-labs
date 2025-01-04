const asyncMap = async (array, fn, signal) => {
    const results = [];
    const errors = [];
    for (const item of array) {
        try {
            const value = await fn(item);
            results.push(value);
        } catch (error) {
            errors.push(error);
        } finally {
            if (signal.aborted) {
                throw new Error('aborted');
            }
        }
    }
    if (errors.length) throw { errors };
    return results;
};
const asyncSquare = (num) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (num > 3) {
                controller.abort();
            }
            resolve(num ** 2);
        }, 1000);
    });
};
const numbers = [1, 2, 3, 4, 5];
const controller = new AbortController();
const { signal } = controller;
asyncMap(numbers, asyncSquare, signal)
    .then(console.log)
    .catch((error) => {
        if (error.message === 'aborted') {
            console.error('Execution was aborted');
        } else {
            console.error(error);
        }
    });
