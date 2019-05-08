<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
        <meta name='description' content='Development Portfolio'>
        <meta name='author' content='Michael'>
        <title>Game of Thrones Episode Catalogue</title>
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
        <link rel='stylesheet' href='css/filterbarstyle.css' type="text/css">
        <link rel="stylesheet" href="css/lightpick.css" />
        <link rel="stylesheet" href="css/animate.css">    
        <link href="https://use.fontawesome.com/releases/v5.0.4/css/all.css" rel="stylesheet" type="text/css">
        <link href="//fonts.googleapis.com/css?family=Cinzel&subset=latin" rel="stylesheet" type="text/css">
        <link href="//fonts.googleapis.com/css?family=Ovo&subset=latin" rel="stylesheet" type="text/css">
    </head>

    <body id="body">
        
        <div class="wrapper">
            <!-- Sidebar -->
            <nav id="sidebar">
                <div class="sidebar-header">
                    <i class="fas fa-times-circle" id="crossClose"></i>
                    <h4>Game of Thrones</h4>
                    <hr/>
                    <h5>Episode Catalog</h5>
                </div>

                <form name="filterForm" id="filterForm" novalidate="novalidate" class="mx-3 my-3">
                    <div class="control-group">
                        <label>Search</label><br>
                        <div class="form-group floating-label-form-group controls mb-0 pb-2 d-flex align-content-center">
                            <input class="form-control" id="searchField" type="text" placeholder="Search Title/Summary">&nbsp&nbsp
                            <button class="btn btn-danger btn-xl mb-4" id="searchButton"><i class="fas fa-search"></i></button>
                            <p class="help-block text-danger"></p>
                        </div>                      
                    </div>
                    <div class="control-group">
                        <div class="form-group floating-label-form-group controls mb-0 pb-2" id="seasons">
                            <label>Season</label><br>
                            <div class="checkboxes d-inline-block">
                                <input class="seasonCheckbox" type="checkbox" name="season" value="1" checked>Season 1<br>
                                <input class="seasonCheckbox" type="checkbox" name="season" value="2" checked>Season 2<br>
                                <input class="seasonCheckbox" type="checkbox" name="season" value="3" checked>Season 3<br>
                                <input class="seasonCheckbox" type="checkbox" name="season" value="4" checked>Season 4<br>
                            </div>
                            <div class="checkboxes ml-4 d-inline-block">
                                <input class="seasonCheckbox" type="checkbox" name="season" value="5" checked>Season 5<br>
                                <input class="seasonCheckbox" type="checkbox" name="season" value="6" checked>Season 6<br>
                                <input class="seasonCheckbox" type="checkbox" name="season" value="7" checked>Season 7<br>
                                <input class="seasonCheckbox" type="checkbox" name="season" value="8" checked>Season 8<br>
                            </div>
                            <br>
                            <p class="help-block text-danger"></p>
                        </div>
                    </div>
                    <div class="control-group">
                        <div class="form-group floating-label-form-group controls mb-0 pb-2">
                            <label for="airdate">Airdate</label><br>
                            <div id="airdate" class="form-group floating-label-form-group controls mb-0 pb-2 d-flex align-content-center">
                                <input type="text" id="airdate-start" name="airdate" class="form-control mr-1">
                                <input type="text" id="airdate-end" name="airdate" class="form-control">
                            </div>
                            <p id="airdate-result">All Dates</p>
                            <p class="help-block text-danger"></p>                    
                        </div>
                    </div>
                    <br>
                        <button class="d-block btn btn-danger btn-xl mx-auto" id="applyButton">Apply Filters & Close</button>
                    <div class="btn-group mt-3">
                        <button class="btn btn-secondary btn-xl" id="resetButton">Clear Filters</button>
                        <button class="btn btn-danger btn-xl" id="showAllButton">Show ALL Episodes</button>
                    </div>
                </form>
            </nav>

            <div class="container-fluid" id="content">
                <nav class="navbar navbar-expand-lg navbar-light">
                    <div class="container-fluid">

                        <button type="button" id="sidebarCollapse" class="btn btn-info fixed-top">
                            <i class="fas fa-chevron-left"></i>&nbsp
                            <i class="fas fa-search"></i>
                            <span>&nbsp Filters / Search</span>
                        </button>

                    </div>
                </nav>   
                
                <h1 class="text-center" id="randomiseHeader">A random selection...</h1>
                <div class="container-fluid" id="display">   

                </div>

                <!-- Modal -->
                <div class="modal fade" id="episodeModal" tabindex="-1" role="dialog" aria-labelledby="episodeModalLabel" aria-hidden="true">
                    <div class="modal-dialog modal-dialog-centered" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="modal-ep-title">Title unknown</h5>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body">
                                <p class="modal-p">Season: <span class="modal-span" id="modal-season-text">Unknown</span></p>
                                <p class="modal-p">Episode Number: <span class="modal-span" id="modal-number-text">Unknown</span></p>
                                <p class="modal-p">Airdate: <span class="modal-span" id="modal-airdate-text">Unknown</span></p>
                                <img class='img-fluid mt-3 mb-4 mx-auto d-block' id="modal-ep-image" src='img/filterbar/noimage.jpg'/>
                                <h5>Summary:</h5>
                                <p id="modal-summary">Summary not available for this episode.</p>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-danger mx-auto" id="close-modal-button" data-dismiss="modal">Close</button>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

        </div>     
        
        <script src="https://code.jquery.com/jquery-3.3.1.min.js" integrity="sha256-FgpCb/KJQlLNfOu91ta32o/NMZxltwRo8QtmkMRdAu8=" crossorigin="anonymous"></script>
        <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.0/js/bootstrap.min.js" integrity="sha384-uefMccjFJAIv6A+rW+L4AHf99KvxDjWSu1z9VI8SKNVmz4sk7buKt/6v9KI65qnm" crossorigin="anonymous"></script>
        <script type="text/javascript" src="js/plugins/jquery.typewatch.js"></script>
        <script type="text/javascript" src="js/searchLike.js"></script>
        <script type="text/javascript" src="https://cdn.jsdelivr.net/momentjs/latest/moment.min.js"></script>
        <script type="text/javascript" src="js/plugins/lightpick.js"></script> 
        <script type="text/javascript" src="js/filterbarscript.js"></script>       
    </body>
</html>
