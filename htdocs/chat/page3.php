<!DOCTYPE html>

<?php
    ob_start();
    include_once '/var/www/html/request/chat/login.php';
    ob_end_clean();
?>

<html lang="en" >
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-KK94CHFLLe+nY2dmCWGMq91rCGa5gtU4mk92HdvYe+M/SXH301p5ILy+dN9+nJOZ" crossorigin="anonymous">
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ENjdO4Dr2bkBIFxQpeoTz1HIcje39Wm4jDKdf19U8gI4ddQ3GYNS7NTKfAdVQSZe" crossorigin="anonymous"></script>
        <script src="/script1.js"></script>
        <title>chat</title>
    </head>
    
    <body> 
        <nav class="navbar navbar-expand navbar-dark bg-black">
            <div class="container">
                <div class="dropdown">
                    <a class="navbar-brand dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">Chat</a>
                    <ul class="dropdown-menu dropdown-menu-start" aria-labelledby="navbarDropdown">
                        <li><a class="dropdown-item" href="/chat/chats.php">chat search</a></li>
                        <li><a class="dropdown-item" href="/chat/usersearch.php">user search</a></li>
                        <li><a class="dropdown-item" href="/chat/stats.php">stats</a></li>
                    </ul>
                </div>
                <div class="navbar-header">
                    <ul class="navbar-nav nav" id="__navbarlist"></ul> 
                    <script type="text/javascript" src="/request/navbar.js" data-insertListID="__navbarlist" data-exclude="/chat/page3.php"></script>
                </div>
            </div>
        </nav>

        <!-- note: https://htmldom.dev/create-resizable-split-views/ -->
        <header>
            <h2 style="text-align: center;">chat name</h2>
        </header>

        <div style="width: 100%; max-height: 40%;">
            <div class="contianer">
                <div class="border border-4 p-1">
                    <form>
                        <div style="margin-top: 2px; margin-bottom: 2;">
                            <button class="btn btn-primary">send</button>
                        </div>
                        <div class="input-group">
                            <textarea class="form-control" placeholder="message as ..." style="min-height: 1.5rem; max-height: 200px;"oninput='this.style.height = "";this.style.height = this.scrollHeight + "px"'></textarea>
                        </div>
                    </form>
                </div>
            </div>
        </div>                
        
        <div style="overflow-y: auto; height: 700px; background-color: #0f6c79">
            <div class="card text-left" style="flex-direction: row; margin: 5px;">
                <div style="max-width: 20%; min-width: 5%; max-height: 90%;">
                    <img class="card-img-left rounded-0" src="/icon/default/icon.png" style="width: 50px; height: 50px;" alt="Card image cap">
                </div>
                <div class="card-body">
                    username
                    <small class="card-text text-muted">time of posting</small>
                    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.Some quick example text to build on the card title and make up the bulk of the card's content.Some quick example text to build on the card title and make up the bulk of the card's content.Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                </div>
            </div>
        </div>
    </body>
</html>