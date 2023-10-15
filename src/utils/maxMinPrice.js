export const maxMinPrice = (arr) => {
    arr.sort((item) => item.price);
    return [arr[0].price, arr[arr.length - 1].price];
};
