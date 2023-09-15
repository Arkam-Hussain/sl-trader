<!DOCTYPE html>
<html lang="en">
  <head>
  <!-- Basic -->
  <meta charset="utf-8" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <!-- Mobile Metas -->
  <meta name="Viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
  <!-- Site Metas -->
  <meta name="keywords" content="" />
  <meta name="description" content="" />
  <meta name="author" content="" />
  <link rel="shortcut icon" href="images/favicon.jpg" type="image/x-icon">

  <title>
    SL Trader
  </title>

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

        <div class="collapse navbar-collapse innerpage_navbar" id="navbarSupportedContent">
          <ul class="navbar-nav  ">
            <li class="nav-item ">
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
            <li class="nav-item active">
              <a class="nav-link" href="sell.php">
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
            <a href="sign up.php">
              <i class="" aria-hidden="true"></i>
              <span>
                Sign Up
              </span>
            </a>
            <form class="form-inline ">
              <button class="btn nav_search-btn" type="submit">
                <i class="fa fa-search" aria-hidden="true"></i>
              </button>
            </form>
          </div>
        </div>
      </nav>
    </header>
    <section class="sell_section layout_padding">
       <!-- end header section -->




    <style>
        body {
          background-image: url('images/sellbg.png');
        }
        </style>
  <meta charset="UTF-8">
  <meta name="Viewport" content="width=device-width, initial-scale=1.0">
  <link rel="shortcut icon" href="images/favicon.jpg" type="image/x-icon">
  <title>SL Trader</title>
  <link rel="stylesheet" href="css/sell.css">
  <link rel="stylesheet" href="css/responsive.css">
  <link rel="stylesheet" href="css/style.css">
</head>
  <div class="container">
    <h1>Trade Your Item</h1>
    <form id="sellItemForm">
      <label for="itemName">Item Name:</label>
      <input type="text" id="itemName" required>

      <label for="itemDescription">Item Description:</label>
      <textarea id="itemDescription" rows="4" required></textarea>

      <label for="itemImage">Item Image:</label>
      <input type="file" id="itemImage" accept="image/*" required>

      <label for="Seller Name">Seller's Name<label>
      <input type="text" id="seller name" required><br>

      <lable for="sellerpn">Seller's Phone Number<lable>
      <input type="text" id="seller phone number" required>
<br>
      
    <center><button type="submit">Submit</button></center>
    </form>
  </div>

  <script src="js/sell.js"></script>
</body>
</html>
