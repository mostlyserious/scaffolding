import hash from './hash';

export default els => {
    if (els && els.length === undefined) {
        els = [ els ];
    }

    document.body.addEventListener('click', event => {
        closeAll(els);
        document.body.style.overflow = 'auto';
    });

    addEventListener('keydown', event => {
        if (event.code === 'Escape') {
            closeAll(els);
            document.body.style.overflow = 'auto';
        }
    });

    Array.prototype.forEach.call(els, el => {
        const target = getTarget(el);
        const id = target.id
            ? target.id
            : `active-${hash(target)}`;
        const className = el.dataset.toggleClass
            ? el.dataset.toggleClass
            : 'is-active';

        target.setAttribute('id', id);
        el.setAttribute('aria-controls', id);

        target.addEventListener('click', event => event.stopPropagation());
        el.setAttribute('aria-expanded', 'false');

        handleUserTabbing(target, el, true);

        el.addEventListener('click', event => {
            const toggles = document.querySelectorAll(`[data-toggle="${el.dataset.toggle}"]`);
            const lockScroll = el.dataset.toggleLockScroll !== undefined;

            let delay = parseInt(el.dataset.toggleDuration);

            if (!delay) {
                delay = parseFloat(window.getComputedStyle(target).transitionDuration) * 1000;
            }

            event.stopPropagation();

            if (target.classList.contains(className)) {
                Array.prototype.forEach.call(toggles, t => t.setAttribute('aria-expanded', 'false'));
                document.body.style.overflow = 'auto';
                setTimeout(() => {
                    handleUserTabbing(target, el, true);
                }, delay);
            } else {
                handleUserTabbing(target, el, false);
                lockScroll && (document.body.style.overflow = 'hidden');
                Array.prototype.forEach.call(toggles, t => t.setAttribute('aria-expanded', 'true'));
            }

            setTimeout(() => {
                closeAll(els, target);
                target.classList.toggle(className);
            }, 50);
        });
    });
};

function getTarget(el) {
    return el.dataset.toggle
        ? document.querySelector(el.dataset.toggle)
        : el.parentNode;
}

function closeAll(els, except = null) {
    Array.prototype.forEach.call(els, el => {
        const target = getTarget(el);
        const className = el.dataset.toggleClass
            ? el.dataset.toggleClass
            : 'is-active';

        let delay = parseInt(el.dataset.toggleDuration);

        if (!delay) {
            delay = parseFloat(window.getComputedStyle(target).transitionDuration) * 1000;
        }

        if (!except || except !== target) {
            target.classList.remove(className);
            el.setAttribute('aria-expanded', 'false');

            setTimeout(() => {
                handleUserTabbing(target, el, true);
            }, delay);
        }
    });
}

function handleUserTabbing(target, el, hide) {
    const className = el.dataset.toggleClass
        ? el.dataset.toggleClass
        : 'is-active';

    if ((target.classList.contains('opacity-0') && target.classList.contains(`${className}:opacity-100`))
        || target.classList.contains(className.replace('is-', 'has-'))) {
        if (hide) {
            target.classList.add('invisible');
        } else {
            target.classList.remove('invisible');
        }
    }

    Array.prototype.forEach.call(el.querySelectorAll(`.opacity-0.${className}\\:opacity-100, ${className.replace('is-', 'has-')}`), child => {
        if (hide) {
            child.classList.add('invisible');
        } else {
            child.classList.remove('invisible');
        }
    });
}
