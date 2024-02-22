module.exports = `<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="utf-8" />
    <link rel="apple-touch-icon" sizes="57x57" href="https://utop.vn/utop-favicon.ico/apple-icon-57x57.png">
    <link rel="apple-touch-icon" sizes="60x60" href="https://utop.vn/utop-favicon.ico/apple-icon-60x60.png">
    <link rel="apple-touch-icon" sizes="72x72" href="https://utop.vn/utop-favicon.ico/apple-icon-72x72.png">
    <link rel="apple-touch-icon" sizes="76x76" href="https://utop.vn/utop-favicon.ico/apple-icon-76x76.png">
    <link rel="apple-touch-icon" sizes="114x114" href="https://utop.vn/utop-favicon.ico/apple-icon-114x114.png">
    <link rel="apple-touch-icon" sizes="120x120" href="https://utop.vn/utop-favicon.ico/apple-icon-120x120.png">
    <link rel="apple-touch-icon" sizes="144x144" href="https://utop.vn/utop-favicon.ico/apple-icon-144x144.png">
    <link rel="apple-touch-icon" sizes="152x152" href="https://utop.vn/utop-favicon.ico/apple-icon-152x152.png">
    <link rel="apple-touch-icon" sizes="180x180" href="https://utop.vn/utop-favicon.ico/apple-icon-180x180.png">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link rel="shortcut icon" href="%PUBLIC_URL%/favicon.ico" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="theme-color" content="#000000" />
    <link rel="manifest" href="%PUBLIC_URL%/manifest.json" />
    <!-- <link rel='stylesheet' href='./css/loading.css' /> -->
    <link rel='stylesheet' href='./css/main.css' />
    <link rel='stylesheet' href='./css/loading.css' />
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link
        href="https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap"
        rel="stylesheet">
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.7.1/css/all.css" />
    <link rel="preconnect" href="https://fonts.gstatic.com">
    <link rel="preconnect" href="https://fonts.gstatic.com">
    <link
        href="https://fonts.googleapis.com/css2?family=Source+Sans+Pro:ital,wght@0,200;0,300;0,400;0,600;0,700;0,900;1,200;1,300;1,400;1,600;1,700;1,900&display=swap"
        rel="stylesheet">
    <title>Utop
    </title>
    <style>
       @import url('https://fonts.googleapis.com/css?family=Montserrat:400,600,700');
@import url('https://fonts.googleapis.com/css?family=Catamaran:400,800');
.error-container {
  text-align: center;
  font-size: 106px;
  font-family: 'Catamaran', sans-serif;
  font-weight: 800;
  margin: 70px 15px;
}
.error-container > span {
  display: inline-block;
  position: relative;
}
.error-container > span.four {
  width: 136px;
  height: 43px;
  border-radius: 999px;
  background:
    linear-gradient(140deg, rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0.07) 43%, transparent 44%, transparent 100%),
    linear-gradient(105deg, transparent 0%, transparent 40%, rgba(0, 0, 0, 0.06) 41%, rgba(0, 0, 0, 0.07) 76%, transparent 77%, transparent 100%),
    linear-gradient(to right, #d89ca4, #e27b7e);
}
.error-container > span.four:before,
.error-container > span.four:after {
  content: '';
  display: block;
  position: absolute;
  border-radius: 999px;
}
.error-container > span.four:before {
  width: 43px;
  height: 156px;
  left: 60px;
  bottom: -43px;
  background:
    linear-gradient(128deg, rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0.07) 40%, transparent 41%, transparent 100%),
    linear-gradient(116deg, rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0.07) 50%, transparent 51%, transparent 100%),
    linear-gradient(to top, #99749D, #B895AB, #CC9AA6, #D7969E, #E0787F);
}
.error-container > span.four:after {
  width: 137px;
  height: 43px;
  transform: rotate(-49.5deg);
  left: -18px;
  bottom: 36px;
  background: linear-gradient(to right, #99749D, #B895AB, #CC9AA6, #D7969E, #E0787F);
}

.error-container > span.zero {
  vertical-align: text-top;
  width: 156px;
  height: 156px;
  border-radius: 999px;
  background: linear-gradient(-45deg, transparent 0%, rgba(0, 0, 0, 0.06) 50%,  transparent 51%, transparent 100%),
    linear-gradient(to top right, #99749D, #99749D, #B895AB, #CC9AA6, #D7969E, #ED8687, #ED8687);
  overflow: hidden;
  animation: bgshadow 5s infinite;
}
.error-container > span.zero:before {
  content: '';
  display: block;
  position: absolute;
  transform: rotate(45deg);
  width: 90px;
  height: 90px;
  background-color: transparent;
  left: 0px;
  bottom: 0px;
  background:
    linear-gradient(95deg, transparent 0%, transparent 8%, rgba(0, 0, 0, 0.07) 9%, transparent 50%, transparent 100%),
    linear-gradient(85deg, transparent 0%, transparent 19%, rgba(0, 0, 0, 0.05) 20%, rgba(0, 0, 0, 0.07) 91%, transparent 92%, transparent 100%);
}
.error-container > span.zero:after {
  content: '';
  display: block;
  position: absolute;
  border-radius: 999px;
  width: 70px;
  height: 70px;
  left: 43px;
  bottom: 43px;
  background: #FDFAF5;
  box-shadow: -2px 2px 2px 0px rgba(0, 0, 0, 0.1);
}

.screen-reader-text {
    position: absolute;
    top: -9999em;
    left: -9999em;
}
    
@keyframes bgshadow {
  0% {
    box-shadow: inset -160px 160px 0px 5px rgba(0, 0, 0, 0.4);
  }
  45% {
    box-shadow: inset 0px 0px 0px 0px rgba(0, 0, 0, 0.1);
  }
  55% {
    box-shadow: inset 0px 0px 0px 0px rgba(0, 0, 0, 0.1);
  }
  100% {
    box-shadow: inset 160px -160px 0px 5px rgba(0, 0, 0, 0.4);
  }
}

/* demo stuff */
* {
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
}
body {
  background-color: #FDFAF5;
  margin-bottom: 50px;
}
html, button, input, select, textarea {
    font-family: 'Montserrat', Helvetica, sans-serif;
    color: #bbb;
}
h1 {
  text-align: center;
  margin: 30px 15px;
}
.zoom-area { 
  max-width: 490px;
  margin: 30px auto 30px;
  font-size: 19px;
  text-align: center;
}
.link-container {
  text-align: center;
}
a.more-link {
  text-transform: uppercase;
  font-size: 13px;
    background-color: #de7e85;
    padding: 10px 15px;
    border-radius: 0;
    color: #fff;
    display: inline-block;
    margin-right: 5px;
    margin-bottom: 5px;
    line-height: 1.5;
    text-decoration: none;
  margin-top: 50px;
  letter-spacing: 1px;
}



@media only screen and (max-width: 600px) {
  body {
    background-color: lightblue;
  }
 
.error-container {
  text-align: center;
  font-size: 53px;
  font-family: 'Catamaran', sans-serif;
  font-weight: 800;
  margin: 35px 8px;
}
.error-container > span {
  display: inline-block;
  position: relative;
}
.error-container > span.four {
  width: 68px;
  height: 22px;
  border-radius: 999px;
  background:
    linear-gradient(140deg, rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0.07) 43%, transparent 44%, transparent 100%),
    linear-gradient(105deg, transparent 0%, transparent 40%, rgba(0, 0, 0, 0.06) 41%, rgba(0, 0, 0, 0.07) 76%, transparent 77%, transparent 100%),
    linear-gradient(to right, #d89ca4, #e27b7e);
}
.error-container > span.four:before,
.error-container > span.four:after {
  content: '';
  display: block;
  position: absolute;
  border-radius: 999px;
}
.error-container > span.four:before {
  width: 22px;
  height: 78px;
  left: 30px;
  bottom: -22px;
  background:
    linear-gradient(128deg, rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0.07) 40%, transparent 41%, transparent 100%),
    linear-gradient(116deg, rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0.07) 50%, transparent 51%, transparent 100%),
    linear-gradient(to top, #99749D, #B895AB, #CC9AA6, #D7969E, #E0787F);
}
.error-container > span.four:after {
  width: 67px;
  height: 22px;
  transform: rotate(-49.5deg);
  left: -9px;
  bottom: 18px;
  background: linear-gradient(to right, #99749D, #B895AB, #CC9AA6, #D7969E, #E0787F);
}

.error-container > span.zero {
  vertical-align: text-top;
  width: 78px;
  height: 78px;
  border-radius: 999px;
  background: linear-gradient(-45deg, transparent 0%, rgba(0, 0, 0, 0.06) 50%,  transparent 51%, transparent 100%),
    linear-gradient(to top right, #99749D, #99749D, #B895AB, #CC9AA6, #D7969E, #ED8687, #ED8687);
  overflow: hidden;
  animation: bgshadow 5s infinite;
}
.error-container > span.zero:before {
  content: '';
  display: block;
  position: absolute;
  transform: rotate(45deg);
  width: 45px;
  height: 45px;
  background-color: transparent;
  left: 0px;
  bottom: 0px;
  background:
    linear-gradient(95deg, transparent 0%, transparent 8%, rgba(0, 0, 0, 0.07) 9%, transparent 50%, transparent 100%),
    linear-gradient(85deg, transparent 0%, transparent 19%, rgba(0, 0, 0, 0.05) 20%, rgba(0, 0, 0, 0.07) 91%, transparent 92%, transparent 100%);
}
.error-container > span.zero:after {
  content: '';
  display: block;
  position: absolute;
  border-radius: 999px;
  width: 34px;
  height: 35px;
  left: 22px;
  bottom: 22px;
  background: #FDFAF5;
  box-shadow: -2px 2px 2px 0px rgba(0, 0, 0, 0.1);
}

.screen-reader-text {
    position: absolute;
    top: -9999em;
    left: -9999em;
}
    
@keyframes bgshadow {
  0% {
    box-shadow: inset -80px 80px 0px 5px rgba(0, 0, 0, 0.4);
  }
  45% {
    box-shadow: inset 0px 0px 0px 0px rgba(0, 0, 0, 0.1);
  }
  55% {
    box-shadow: inset 0px 0px 0px 0px rgba(0, 0, 0, 0.1);
  }
  100% {
    box-shadow: inset 80px -80px 0px 5px rgba(0, 0, 0, 0.4);
  }
}

/* demo stuff */
* {
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
}
body {
  background-color: #FDFAF5;
  margin-bottom: 50px;
}
html, button, input, select, textarea {
    font-family: 'Montserrat', Helvetica, sans-serif;
    color: #bbb;
}
h1 {
  text-align: center;
  margin: 30px 15px;
}
.zoom-area { 
  max-width: 490px;
  margin: 30px auto 30px;
  font-size: 19px;
  text-align: center;
}
.link-container {
  text-align: center;
}
a.more-link {
  text-transform: uppercase;
  font-size: 13px;
    background-color: #de7e85;
    padding: 10px 15px;
    border-radius: 0;
    color: #fff;
    display: inline-block;
    margin-right: 5px;
    margin-bottom: 5px;
    line-height: 1.5;
    text-decoration: none;
  margin-top: 50px;
  letter-spacing: 1px;
}

}


    </style>
</head>
<script src="https://apps.elfsight.com/p/platform.js" defer></script>

<body>
<div class="home"  style='display: flex;justify-content: center;align-items: center;flex-direction: column;height: 100vh;'>
  <h1>404 Website is blocked</h1>
  <!-- <p class="zoom-area"><b>CSS</b> animations to make a cool 404 page. </p> -->
  <section class="error-container">
    <span class="four"><span class="screen-reader-text">4</span></span>
    <span class="zero"><span class="screen-reader-text">0</span></span>
    <span class="four"><span class="screen-reader-text">4</span></span>
  </section>
  </div>
</div>
</body>

</html>`
