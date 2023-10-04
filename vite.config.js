import vitepack from '@mostlyserious/vitepack';

export default vitepack({
    base: '/static/',
    outDir: 'public/static'
}, config => {
    config.build.rollupOptions = {
        input: 'src/js/main.js'
    };

    return config;
});
