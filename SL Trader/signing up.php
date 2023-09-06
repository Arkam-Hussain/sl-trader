<?php 

 include('Config/Connection_code.php')


  $Username = $Email = $Password = '';
  $errors = array('username' => '', 'email' => '', 'password' => '');


  if(isset($_POST['submit'])){

  if(empty($_POST['username'])){
    $errors['Username'] = 'a Username is requiered <br />';
  } else {
    $Username = $_POST['username'];
    if(!preg_match('/^[a-za-Z\s]+$/', $Username)){
      $errors['username'] = 'Username must be letters and spaces only';
    }
  }

  if(empty($_POST['email'])){
    $errors['email'] = 'an Email is requiered <br />';
  } else {
    $Email = $_POST['email'];
    if(!filter_var($Email, FILTER_VALIDATE_EMAIL)){
      $errors['email'] = 'Please enter a valid Email';
    }
  }

    if(empty($_POST['password'])){
    $errors['password'] = 'a Password is requiered <br />';
  } else {
    $Password = $_POST['username'];

    }
  }

  if(array_filter($errors)){
//echo 'errors in form';
    } else {
      // escape sql chars
      $Username = mysqli_real_escape_string($conn, $_POST['username']);
      $Email = mysqli_real_escape_string($conn, $_POST['email']);
      $Password = mysqli_real_escape_string($conn, $_POST['password']);

      // create sql
      $sql = "INSERT INTO sign_up_details(Username,Email,Password) VALUES('$Username','$Email','$Password')";

      // save to db and check
      if(mysqli_query($conn, $sql)){
        // success
        header('Location: index.php');
      } else {
        echo 'query error: '. mysqli_error($conn);
      }

    }

 ?>






 <!DOCTYPE html>
<html lang="en">
<head>
      <!-- Basic -->
  <meta charset="utf-8" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <!-- Mobile Metas -->
  <meta name="Viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
  <!-- Site Metas -->
  
  <meta name="description" content="" />
  <meta name="author" content="" />
  <link rel="shortcut icon" href="images/favicon.jpg" type="image/x-icon">
  <meta name="keywords" content="" />
  <title style="color:#fff;"> SL Trader </title>

  <!-- slider stylesheet -->
  <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/OwlCarousel2/2.3.4/assets/owl.carousel.min.css" />

  <!-- bootstrap core css -->
  <link rel="stylesheet" type="text/css" href="css/bootstrap.css" />

  <!-- Custom styles for this template -->
  <link href="css/style.css" rel="stylesheet" />
  <!-- responsive style -->
  <link href="css/responsive.css" rel="stylesheet" />
</head>

<body>
  <div class="hero_area">
         <!-- header section strats -->
    <header class="header_section">
      <nav class="navbar navbar-expand-lg custom_nav-container ">
        <a class="navbar-brand" href="index.html">
          <span>
            SL Trader
          </span>
        </a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class=""></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav  ">
            <li class="nav-item">
              <a class="nav-link" href="index.html">Home <span class="sr-only">(current)</span></a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="shop.html">
                Shop
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="why.html">
                Why Us
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="sell.html">
                Start Trading
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="contact.html">Contact Us</a>
            </li>
          </ul>
          <div class="user_option">
            <a href="login.html">
              <i class="fa fa-user" aria-hidden="true"></i>
              <span>
                Login
              </span>
            </a>
            <a href="signing up.php">
              <i class="" aria-hidden="true"></i>
              <span>
                Sign Up
              </span>
            </a>
            <form class="form-inline ">
              <button class="btn nav_search-btn" 
              type="submit">
                <i class="fa fa-search" aria-hidden="true"></i>
              </button>
            </form>
          </div>
        </div>
      </nav>
    </header>
     <section class="sign up_section layout_padding">

    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="css/signup.css">
    <link rel="stylesheet" href="css/responsive.css">
   <link rel="stylesheet" href="css/style.css">
    <link rel="shortcut icon" href="images/favicon.jpg" type="image/x-icon">
    <title>SL Trader</title>
    
</head>
<body style="background-color: lightgreen;">
    <div class="container">
        <h2>Sign Up</h2>
        <form id="signup-form" action="sign up.php" method="POST">
            <label for="username">Username:</label>
            <input type="username" name="username" required>
            
            <label for="email">Email:</label>
            <input type="text" name="email" required>
            
            <label for="password">Password:</label>
            <input type="password" name="password" required>

            <div class="input-group">
              <button type="submit" value="submit" class="center">Sign up</button>
            </div>
            
        </form>
        <p id="message"></p>
      
    </div>
    
</body>
</html>