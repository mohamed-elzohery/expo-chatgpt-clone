const debounce = (fn: () => void, delay: number) => {
    let timeId: any;
    timeId = setTimeout(() => {
    fn();
    console.log(timeId)
    clearTimeout(timeId);
    }, delay);
}

export default debounce;