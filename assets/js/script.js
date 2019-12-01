$(document).ready( function (){
  
  popular();

  $("button").click( function(){
    search()
  })

});


// blocco funzioni
function popular() {
  var urlTopMovie = "https://api.themoviedb.org/3/movie/popular";
  var urlTopTv = "https://api.themoviedb.org/3/tv/popular";
  getData(urlTopMovie, "", 'movieTop');
  getData(urlTopTv, "", 'tvTop');
}

function search() {
  var urlMovie = 'https://api.themoviedb.org/3/search/movie';
  var urlTv = 'https://api.themoviedb.org/3/search/tv';
  var q = $("input").val();
  getData(urlMovie, q, 'movie');
  getData(urlTv, q, 'tv');
}

function getData(url, input, type) {
  var apiKey = "ceb354f968c94e697decd423b41de216";
  var deleteQuery;
  var dataUrl = {
    api_key: apiKey,
    query: (type == "movie" || type == "tv" ? input : deleteQuery),
    language: "it-IT"
  }
  deleteQuery = delete dataUrl["deleteQuery"];
  $.ajax({
    url: url,
    method: "GET",
    data: dataUrl,
    success: function (data) {
      var elements = data.results;
      print(type, elements);
    },
    error: function (err) {
      console.log(err);
    }
  });
}

function print(type, elems) {
  var target = (type == "movie" || type == 'movieTop' ? $(".film-container") : $(".tv-container"));
  target.html(" ");
  var source = $("#entry-template").html();
  var template = Handlebars.compile(source);

  for (var key in elems) {
    var item = elems[key];
    var title = (type == "movie" || type == 'movieTop' ? item.title : item.name);
    var originalTitle = (type == "movie" || type == 'movieTop' ? item.original_title : item.original_name);
    var mediaVoto = Math.floor(Math.round(item.vote_average) / 2);

    var context = {
      poster: poster(item.poster_path, "w185"),
      titolo: title,
      originale: originalTitle,
      lingua: item.original_language,
      flag: selectFlag(item.original_language),
      voto: mediaVoto,
      stelle: generatorStars(mediaVoto)
    };

    var html = template(context);
    target.append(html);
  };

  
  // test
  $ShowHideMore = target;
  $ShowHideMore.each(function () {
    var $times = $(this).children('.elem');
    if ($times.length > 7) {
      target.append(" <p class='message'></p>");
      $ShowHideMore.children(':nth-of-type(n+8)').addClass('moreShown').hide();
      $(this).find('p.message').addClass('more-times').html('+ Show more');
    }
  });
  
  var cont = (type == "movie" || type == 'movieTop' ? ".film-container" : ".tv-container");
  console.log(cont);
  $(document).on('click', cont + ' > .message', function () {
    var that = $(this);
    console.log(that);
    var thisParent = that.closest(cont);
    if (that.hasClass('more-times')) {
      thisParent.find('.moreShown').show();
      that.toggleClass('more-times', 'less-times').html('- Show less');
    } else {
      thisParent.find('.moreShown').hide();
      that.toggleClass('more-times', 'less-times').html('+ Show more');
    } 
  });
}

// funzione per creare le stelle
function generatorStars(num){
  var array = [];
  for (var i = 0; i < num; i++){
    array.push("<i class='fas fa-star'></i>")
  };
  while(array.length < 5){
    array.push("<i class='far fa-star'></i>")
  };
  return array.join("")
}

// funzione per le bandiere
function selectFlag(lang){
  var array = ["en", "it", "us", "ja", "fr"]
  var i = 0;
  var genericFlag = "assets/img/worldwide.png"
  while (i < array.length) {
    if (lang == array[i]) {
      return "assets/img/" + array[i] + ".png"
    }
    i++;
  }
  return genericFlag
}

// funzione per mostare la copertina
function poster(img , dimensione){
  if (img !== null){
    return "https://image.tmdb.org/t/p/" + dimensione + "/" + img
  } else{
    return "assets/img/noimg.png"
  }
}



