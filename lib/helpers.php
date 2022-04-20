<?php

function entry($entry = null, $markup = false, $manifest = 'public/static/entries.json')
{
    static $all;

    $results = [];
    $manifest_path = join_path(ROOT_DIR, $manifest);

    if (!is_file($manifest_path)) {
        return $markup ? '' : [];
    }

    $all = $all ?: json_decode(file_get_contents($manifest_path), true);

    if (!$entry) {
        return $all;
    }

    if (!isset($all[$entry])) {
        return [];
    }

    foreach ($all[$entry] as $i => $value) {
        $ext = pathinfo($value, PATHINFO_EXTENSION);

        switch ($ext) {
            case 'js' :
                $result = $markup ? sprintf(
                    '<script src="%s" %s async defer></script>',
                    $value,
                    is_array($markup) ? attr($markup, ['media']) : ''
                ) : $value;
                break;

            case 'css' :
                $result = $markup ? sprintf(
                    '<link href="%s" rel="stylesheet" %s>',
                    $value,
                    is_array($markup) ? attr($markup) : ''
                ) : $value;
                break;
            default :
                $result = '';
                break;
        }

        $results[] = $result;
    }

    return $markup ? implode(PHP_EOL, $results) : $results;
}

function asset($entry = null, $markup = false, $manifest = 'public/static/assets.json')
{
    static $all;

    $manifest_path = join_path(ROOT_DIR, $manifest);

    if (!is_file($manifest_path)) {
        return $markup ? '' : [];
    }

    $all = $all ?: json_decode(file_get_contents($manifest_path), true);

    if (!$entry) {
        return $all;
    }

    if (isset($all[$entry])) {
        return $all[$entry];
    }

    return null;
}

function attr($attributes = [], $except = [])
{
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

function join_path(...$paths)
{
    return preg_replace_callback('/([^:])\/+/', function ($matches) {
        return $matches[1] . '/';
    }, implode('/', (array) $paths));
}
