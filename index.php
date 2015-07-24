<!DOCTYPE html>
<html>
<head lang="en">
    <meta charset="UTF-8">
    <title>Сапер</title>
    <link rel="stylesheet" href="./style.css"/>
    <script src="http://code.jquery.com/jquery-1.8.3.js"></script>
</head>
<body>
<table>
    <?php
        $size = 15;

        for ($i = 0; $i <= $size; $i++) {
            echo '<tr class="sapper-cell">';
               for ($j = 0; $j <= $size; $j++) {
                   echo '<td></td>';
               }
            echo '</tr>';
        }
    ?>
</table>
</body>
</html>