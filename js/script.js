
function loadData() {

    var $body = $('body');
    var $wikiElem = $('#wikipedia-links');
    var $nytHeaderElem = $('#nytimes-header');
    var $nytElem = $('#nytimes-articles');
    var $greeting = $('#greeting');

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


    var nytURL = 'http://api.nytimes.com/svc/search/v2/articlesearch.json?q='+$city+'&sort=newest&api-key=f91f0ed94a941cd1678ff66126dcbb75:4:74551472'; 


    $.getJSON(nytURL, function(data){
        console.log(data);
        console.log(nytURL);
        $nytHeaderElem.text('Article about ' +$city);

        var articles = data.response.docs;
        for (var i=0; i<articles.length; i++){
            var article = articles[i];
            $nytElem.append('<li class = "article">'+
                '<a href = "'+ article.web_url +'">'+ article.headline.main+'</a>'+
                '<p>'+article.snippet+'</p>'+'</li>')
        }
        // $.each(data, function(webURL,snippet){
        //     $nytElem.append('<li class = "article">'+'<a href = "'+ articles.web_url +'">'+ articles.headline.main+'</li>')
        // });

        // $('#nytimes-articles',{
        //     html: items.join("")
        // }).appendTo('body');

    });

    return false;
};

$('#form-container').submit(loadData);
