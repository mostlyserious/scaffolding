export default function buildQuery(input, join = '&', parent = false) {
    const output = [];

    Object.keys(input).forEach(val => {
        let key = val;

        key = encodeURIComponent(key.replace(/[!'()*]/g, escape)).replace(/(%2B|%20)+/g, '+');

        if (typeof input[val] === 'object') {
            output.push(buildQuery(input[val], join, key));
        } else if (typeof input[val] !== 'undefined') {
            const value = encodeURIComponent(input[val].toString().trim().replace(/[!'()*]/g, escape)).replace(/(%2B|%20)+/g, '+');

            if (parent) {
                output.push(`${parent}[${key}]=${value}`);
            } else {
                output.push(`${key}=${value}`);
            }
        }
    });

    return output.join(join);
}
