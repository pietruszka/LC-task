module.exports.processArray = async (arr, promise) => {
    const promises = arr.map(request => promise(request));
    return await Promise.all(promises);
};
