export default els => {
    const store = () => import('./store' /* webpackChunkName: 'store' */);
    const components = {
        'example': () => import('./components/Example' /* webpackChunkName: 'example' */)
    };

    els.forEach(target => {
        const component = target.getAttribute('component');
        const request = components[component];

        if (request) {
            Promise.all([
                request(),
                store()
            ]).then(([ { default: Component }, { default: store } ]) => {
                const slot = target.innerHTML.replace(/<\/?template[^>]*>/, '').trim();

                target.innerHTML = '';
                new Component({
                    target,
                    store,
                    intro: true,
                    props: { slot, ...target.dataset }
                });
            });
        }
    });
};
