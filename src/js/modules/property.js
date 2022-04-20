export default els => {
    const customProperties = () => {
        const styles = document.documentElement.style;

        styles.setProperty('--viewport-height', `${innerHeight}px`);

        Array.prototype.forEach.call(els, el => {
            const [ property, key ] = JSON.parse(el.dataset.property);
            const scope = el.dataset.propertyScope !== 'parent'
                ? (el.dataset.propertyScope
                    ? document.querySelector(el.dataset.propertyScope)
                    : null)
                : el.parentNode;

            if (scope) {
                scope.style.setProperty(property, `${el[key]}px`);
            } else {
                styles.setProperty(property, `${el[key]}px`);
            }
        });
    };

    addEventListener('resize', customProperties);
    addEventListener('load', customProperties);
    setInterval(customProperties, 1000);
};
