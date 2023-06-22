<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <?php
        $name = $_POST["name"];
        $mail = $_POST["mail"];
        $password = $_POST["password"];

        $name = htmlspecialchars($name);
        $mail = htmlspecialchars($mail);
        $password = htmlspecialchars($password);

        $data = $name."/".$mail."/".$password."\n";
        file_put_contents("data/data.txt", $data, FILE_APPEND);


        print $name;
        print "<br>";
        print $mail;
        print "<br>";
        print $password;

    ?>


</body>
</html>