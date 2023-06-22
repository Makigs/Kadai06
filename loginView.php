<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <?php
    // ファイル読み込む
    $read = file_get_contents("data/data.txt");

    // 読み込んだものを表示する
    echo nl2br($read);

    ?>
</body>
</html>