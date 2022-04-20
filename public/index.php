<?php define('PUBLIC_DIR', __DIR__); define('ROOT_DIR', dirname(PUBLIC_DIR)); if (is_file(ROOT_DIR . '/vendor/autoload.php')) require_once ROOT_DIR . '/vendor/autoload.php'; ?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Scaffolding</title>
    <?php echo entry('app', true); ?>
</head>
<body class="grid place-items-center h-vh-100">
    <h1 class="text-5xl">Hello, world.</h1>
</body>
</html>
