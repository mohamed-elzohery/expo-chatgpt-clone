const debounce = (fn: () => void, delay: number) => {
    let timeId: any;
    timeId = setTimeout(() => {
    fn();
    clearTimeout(timeId);
    }, delay);
}

export default debounce;