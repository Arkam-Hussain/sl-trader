<?php

  $conn = mysqli_connect('localhost', 'Arkam', 'GNAT4021', 'sl_trader');

  if(!$conn){
    echo 'connection error: ' . mysqli_connect_error();

  }


?>