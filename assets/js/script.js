$(document).ready( function (){
  
  $("button").click( function(){
    // chiamata per i film
    $.ajax({
      url: "https://api.themoviedb.org/3/search/movie",
      method : "GET",
      data : {
        api_key: "ceb354f968c94e697decd423b41de216",
        query: $("input").val(),
        language : "it-IT",
      },
      success : function (data){
        // ripulisco l'output ad ogni click
        $(".film-container").html(" ");
        console.log(data.results);
        
        var source = $("#entry-template").html();
        var template = Handlebars.compile(source);

        for (var key in data.results) {
          var item = data.results[key];
          var mediaVoto = Math.floor(Math.round(item.vote_average) / 2);

          var context = { 
            titolo: item.title,
            originale: item.original_title,
            lingua: item.original_language,
            flag: selectFlag(item.original_language),
            voto: mediaVoto,
            stelle: generatorStars(mediaVoto)
          };
          
          var html = template(context);
          $(".film-container").append(html);
        };
        
      },
      error : function() {
        alert("404")
      }
    });


    // chiamata per le serie tv
    $.ajax({
      url: "https://api.themoviedb.org/3/search/tv",
      method: "GET",
      data: {
        api_key: "ceb354f968c94e697decd423b41de216",
        query: $("input").val(),
        language: "it-IT",
      },
      success: function (data) {
        // ripulisco l'output ad ogni click
        $(".tv-container").html(" ");
        console.log(data.results);

        var source = $("#entry-template").html();
        var template = Handlebars.compile(source);

        for (var key in data.results) {
          var item = data.results[key];
          var mediaVoto = Math.floor(Math.round(item.vote_average) / 2);

          var context = {
            titolo: item.name,
            originale: item.original_name,
            lingua: item.original_language,
            flag: selectFlag(item.original_language),
            voto: mediaVoto,
            stelle: generatorStars(mediaVoto)
          };

          var html = template(context);
          $(".tv-container").append(html);
        };

      },
      error: function () {
        alert("404")
      }
    });
  })

});

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
  if (lang == "en"){
    return "assets/img/uk.png"
  } else if ( lang == "it"){
    return "assets/img/it.png"
  } else if (lang == "us") {
    return "assets/img/us.png"
  } else if (lang == "ja") {
    return "assets/img/jp.png"
  } else if (lang == "cn") {
    return "assets/img/cn.png"
  } else if (lang == "fr") {
    return "assets/img/fr.png"
  }
}