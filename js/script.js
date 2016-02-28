
function loadData() {

    var $body = $('body');
    var $wikiElem = $('#wikipedia-links');
    var $nytHeaderElem = $('#nytimes-header');
    var $nytElem = $('#nytimes-articles');
    var $greeting = $('#greeting');
    var $wikiHeaderElem = $('#wikipedia-header');

    // clear out old data before new request
    $wikiElem.text("");
    $nytElem.text("");

    // load streetview

    var $street = $('#street').val();
    var $city = $('#city').val();
    var $address = $street + ', ' + $city;

    $greeting.text('So you want to live in '+ $address+ ' ?');

    var streetviewURL = 'http://maps.googleapis.com/maps/api/streetview?size=600x400&location=' + $address + '';
    $body.append('<img class= "bgimg" src="' +streetviewURL+ '">');


    var nytURL = 'http://api.nytimes.com/svc/search/v2/articlesearch.json?q='+$city+'&sort=newest&api-key=613c56c61ea295770d632f12e872a13e:2:74568256'; 
    var wikiURL = 'https://en.wikipedia.org/w/api.php?action=opensearch&format=json&search='+$city+'&callback=wikiCallback';


// NYT API

    $.getJSON(nytURL, function(data){
        $nytHeaderElem.text('New York Times Article about ' +$city);
        var articles = data.response.docs;
        for (var i=0; i<articles.length; i++){
            var article = articles[i];
            $nytElem.append('<li class = "article">'+
                '<a href = "'+ article.web_url +'"+ target = "_blank">'+ article.headline.main+'</a>'+
                '<p>'+article.snippet+'</p>'+'</li>');
        }
    }).fail(function(){
        $nytHeaderElem.text('Sorry, New York Times Cannot Load Articles');
    });
    
    //fail method for jsonp, a nice fallback

    var wikiRequestTimeout = setTimeout(function(){
        $wikiHeaderElem.text('Sorry, Wikipedia cannot load articles' );
    },8000);

// Wikipedia API

    $.ajax({
        url: wikiURL,
        dataType: "jsonp"})
        .done(function(data){
        $wikiHeaderElem.text('Wikipedia Articles about '+$city );
        var wikiArticles = data[1];
        for (var i = 0; i < wikiArticles.length; i++) {
            var wikiArticle = wikiArticles[i];
            var web_url = 'https://en.wikipedia.org/wiki/' + wikiArticle;
            $wikiElem.append('<li>' + '<a href = "'+ web_url+'" + target = "_blank">'+wikiArticle+'</a>'+ 
                '</li>' )};
        //stop timer
        clearTimeout(wikiRequestTimeout);
    });
    return false;
};

$('#form-container').submit(loadData);
