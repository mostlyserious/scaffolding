<?php

function vite($manifest_dir = 'public/static') {
    static $all;

    $results = [];
    $manifest_path = join_path(ROOT_DIR, $manifest_dir, 'manifest.dev.json');

    if (!is_file($manifest_path)) {
        $manifest_path = join_path(ROOT_DIR, $manifest_dir, 'manifest.json');
    }

    if (!is_file($manifest_path)) {
        return '';
    }

    $all = $all ?: json_decode(file_get_contents($manifest_path), true);

    if (isset($all['url'])) {
        foreach ($all['inputs'] as $input) {
            input_markup($input, $all['url'], $results);
        }
    }

    $entries = array_filter($all, function ($entry) {
        if (!isset($entry['src'])) {
            return;
        }

        $ext = pathinfo($entry['src'], PATHINFO_EXTENSION);

        return in_array($ext, ['css', 'js'])
            && isset($entry['isEntry'])
            && $entry['isEntry'];
    });

    foreach ($entries as $entry) {
        $input = $entry['file'];

        if (isset($entry['imports']) && count($entry['imports'])) {
            foreach ($entry['imports'] as $import) {
                input_markup(str_ireplace('_', 'assets/', $import), '/static', $results);
            }
        }

        if (isset($entry['css']) && count($entry['css'])) {
            foreach ($entry['css'] as $import) {
                input_markup($import, '/static', $results);
            }
        }

        input_markup($input, '/static', $results);
    }

    return implode(PHP_EOL, $results);
}

function asset($input, $manifest_dir = 'public/static') {
    static $all;

    $manifest_path = join_path(ROOT_DIR, $manifest_dir, 'manifest.dev.json');

    if (!is_file($manifest_path)) {
        $manifest_path = join_path(ROOT_DIR, $manifest_dir, 'manifest.json');
    }

    if (!is_file($manifest_path)) {
        return '';
    }

    $all = $all ?: json_decode(file_get_contents($manifest_path), true);

    $input = join_path('src', $input);

    if (isset($all['url'], $all['inputs'][$input])) {
        return $all['inputs'][$input];
    }

    if (isset($all[$input], $all[$input]['assets']) && count($all[$input]['assets'])) {
        return join_path('/static', $all[$input]['assets'][0]);
    }

    return '';
}

function input_markup($input, $base, &$results)
{
    static $loaded = [];

    if (isset($loaded[$input]) and $loaded[$input]) {
        return;
    }

    $legacy = strpos($input, 'legacy') !== false;
    $ext = pathinfo($input, PATHINFO_EXTENSION);

    switch ($ext) {
        case 'js':
            $results[] = $legacy ? sprintf(
                '<script nomodule crossorigin src="%s" async defer></script>',
                join_path($base, $input)
            ) : sprintf(
                '<script type="module" crossorigin src="%s" async defer></script>',
                join_path($base, $input)
            );
            break;
        case 'css':
            $results[] = sprintf(
                '<link href="%s" rel="stylesheet">',
                join_path($base, $input)
            );
            break;
    }

    $loaded[$input] = true;
}

function attr($attributes = [], $except = []) {
    $html = [];

    foreach ((array) $attributes as $key => $value) {
        if (!is_null($value)) {
            if (is_numeric($key)) {
                if (!in_array($value, (array) $except)) {
                    $pair = $value;
                }
            } else {
                if (!in_array($key, (array) $except)) {
                    $pair = $key .'="'. $value .'"';
                }
            }
        }

        if (!is_null($pair)) {
            $html[] = $pair;
        }
    }

    return count($html) > 0 ? ' '.implode(' ', $html) : '';
}

function join_path(...$paths) {
    return preg_replace_callback('/([^:])\/+/', function ($matches) {
        return $matches[1] . '/';
    }, implode('/', (array) $paths));
}
