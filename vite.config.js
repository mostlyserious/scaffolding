import vitepack from '@mostlyserious/vitepack';

const args = {
    base: '/static/',
    outDir: 'public/static'
};

export default vitepack(args, config => {
    config.build.rollupOptions = {
        input: 'src/js/main.js'
    };

    return config;
});
