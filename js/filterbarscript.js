// Set an object to store filter values
let currentEps = {};
let filters = {};
let filterReset = false;
let randomDone = false;

// Async Fetch function to get episode data
async function getData() {
    const res = await fetch('got.json');
    const data = await res.json();
    return data._embedded.episodes;
}

// Randomizer for starting screen
function randomBetween(min,max) {
    return Math.floor(Math.random()*(max-min+1)+min);
}

function getRandomEps(amount) {
    fadeDisplay();
    getData().then( (eps) => {   
        let randomEps = [];        
        for (i = 0; i < amount; i++) { 
            let randNum = randomBetween(0, eps.length - 1);
            randomEps.push(eps[randNum]);
            eps.splice(randNum, 1);
        }
        getDisplayHTML(randomEps); 
    }).catch( (error) => {
        console.log(error);
    });          
    showDisplay();
    randomDone = true;
}

getRandomEps(4);

// Getting HTML code to display episodes
function getDisplayHTML (eps) {
    currentEps = eps;
    console.log(currentEps);
    $("#display").empty();
    $("#display").append("<div class='row' id='rowOne'></div>");
    let output = '';  
    let count = 0;
    eps.forEach( (ep) => {
        console.log(ep);
        output += `<div class='col-6 col-md-4 col-lg-3 displayBox'>
            <figure class="mx-auto" data-toggle="modal" data-target="#episodeModal" data-key='${count}'>
                <img class='displayImg figure-img img-fluid' id='img-${ep.id}' src='${ep.image ? ep.image.medium : 'img/filterbar/noimage.jpg'}'/>
                <figcaption class="captionNumbers figure-caption text-right">S${ep.season}:E${ep.number}</figcaption>
                <figcaption class="captionTitle figure-caption text-right">"${ep.name}"</figcaption>
            </figure>
        </div>`;   
        count += 1;   
    });
    $("#rowOne").append(output);     
}

// Button to open sidebar
$('#sidebarCollapse').on('click', function () {
    $('#sidebar').toggleClass('active').fadeTo(100, 1);
    $('#sidebarCollapse').css('visibility', 'hidden');  
});

// Button to close sidebar
$('#crossClose').on('click', function () {
    $('#sidebar').toggleClass('active').fadeTo(400, 0);
    $('#sidebarCollapse').css('visibility', 'visible'); 
    $('#sidebarCollapse').fadeTo(400, 1);   
});

// Functions to fade and show display
function fadeDisplay() {
    if (!filterReset) {
        $("#display").fadeTo(200, 0);
    } else {
        filterReset = false;
    }
}

function showDisplay() {
    if (randomDone === true) {
        $("#randomiseHeader").css("display", "none");
    }
    $("#display").fadeTo(200, 1);
}

// Applying Filters function (using searchLike function to search in SQL fashion for patterns with wildcards) 

function applyFilters() { 
    if (!filterReset){
        getData().then( (eps) => {    
            filters = getFilters();
            let filtered = [];
            if (filters.search !== '') {
                eps.forEach( (ep) => {
                    if ( searchLike(ep.name, filters.search) || searchLike(ep.summary, filters.search) ) {
                        filtered.push(ep);
                    }            
                })
            } else {      
                filtered = eps;
            }
            if (filters.seasons.length) {
                let newFiltered = [];
                filtered.forEach( (ep) => {
                    if ( filters.seasons.includes(ep.season) ) {
                        newFiltered.push(ep);
                    }            
                })
                filtered = newFiltered;
            }
            if (filters.airdateStart && filters.airdateEnd) {
                let newFiltered = [];
                filtered.forEach( (ep) => {
                    if ( (filters.airdateStart <= ep.airdate) && (filters.airdateEnd >= ep.airdate) )  {
                        newFiltered.push(ep);
                    }            
                })
                filtered = newFiltered;
            }       
            getDisplayHTML(filtered);      
        }).catch( (error) => {
            console.log(error);
        });          
    } else {
        filterReset = false;
    }
    showDisplay();
}

// Function to show all eps (when showAllButton is pressed)
function showAll() {
    getData().then( (eps) => {                
        getDisplayHTML(eps);         
    });
    clearAll();
    showDisplay();     
}

// ---------------------------------- (Read and clear) Filter functions -------------------------------------
function getFilters() {  
    let searchValue = document.getElementById('searchField').value;    
    let checkboxes = document.querySelectorAll(".seasonCheckbox");    
    let checkedArray = [];
    checkboxes.forEach( (checkbox) => {
        if (checkbox.checked) {
            checkedArray.push(parseInt(checkbox.value));
        }
    });
    filters.search = searchValue;
    filters.seasons = checkedArray;
    return filters;
}

function setAirdateFilter(start, end) {
    filters.airdateStart = start;
    filters.airdateEnd = end;
}

function clearAll() {
    let checkboxes = document.querySelectorAll(".seasonCheckbox");
    checkboxes.forEach( (checkbox) => {
        checkbox.checked = true;
    });  
    document.getElementById('searchField').value = '';
    picker.setDateRange('17-04-2011', moment().endOf('month'));
    document.getElementById('airdate-result').innerHTML = 'All Dates'; 
    filters = {};  
}

function resetFilters() {
    filterReset = true;
    clearAll();
}

// ---------------------------------- Event listeners -------------------------------------

$("#showAllButton, #searchButton, #resetButton").on('click', function(e) { 
    e.preventDefault();
    switch (e.target.id) {
        case 'searchButton': 
            fadeDisplay();
            setTimeout(applyFilters, 200);
            break;
        case 'resetButton': 
            resetFilters();
            break;
        default:     
            fadeDisplay();        
            setTimeout(showAll, 200);
    }  
});

    // (using jQuery Typewatch plugin to prevent the function firing immediately on every user keystroke)
$("#searchField").typeWatch( {
    callback: applyFilters,
    wait: 500,
    highlight: true,
    allowSubmit: false,
    captureLength: 2
});

$("#searchField").typeWatch( {
    callback: fadeDisplay,
    wait: 200,
    highlight: true,
    allowSubmit: false,
    captureLength: 2
});

$("#seasons").on('change', function() { 
    if (!filterReset) {
        fadeDisplay();  
        setTimeout(applyFilters, 200);
    } else {
        filterReset = false;
    }
});

$('#episodeModal').on('show.bs.modal', function (event) {
    let trigger = $(event.relatedTarget); 
    let key = trigger.data('key');
    let modal = $(this);
    modal.find('#modal-season-text').text(currentEps[key].season ? currentEps[key].season : 'Unknown');
    modal.find('#modal-number-text').text(currentEps[key].number ? currentEps[key].number : 'Unknown');
    modal.find('#modal-airdate-text').text(currentEps[key].airdate ? currentEps[key].airdate : 'Unknown');
    modal.find('#modal-ep-title').text(currentEps[key].name ? currentEps[key].name : 'Unknown');
    modal.find('#modal-ep-image').attr('src', currentEps[key].image ? currentEps[key].image.original : 'img/filterbar/noimage.jpg');
    modal.find('#modal-summary').text(currentEps[key].summary ? currentEps[key].summary.replace(/(<([^>]+)>)/ig,"") : 'Summary not available for this episode.');    
})

// Date Range picker code (Lightpick plugin)

let picker = new Lightpick({
    field: document.getElementById('airdate-start'),
    secondField: document.getElementById('airdate-end'),
    repick: true,
    startDate: '17-04-2011',
    endDate: moment().endOf('month'),
    onSelect: function(start, end){
        if (!filterReset) {
            if (start && end){
                setAirdateFilter(start.format('YYYY-MM-DD'), end.format('YYYY-MM-DD'));
                fadeDisplay();  
                setTimeout(applyFilters, 200);
            }
            var str = '';
            str += start ? start.format('Do MMMM YYYY') + ' to ' : '';
            str += end ? end.format('Do MMMM YYYY') : '...';
            document.getElementById('airdate-result').innerHTML = str;
        } else {
            filterReset = false;
        }
    }
});



