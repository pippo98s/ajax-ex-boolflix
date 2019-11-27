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
            poster: "w185/" + item.poster_path,
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
            poster: "w185/" + item.poster_path,
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
  var array = ["en", "it", "us", "ja", "fr"]
  var i = 0;
  while (i < array.length) {
    if (lang == array[i]) {
      return "assets/img/" + array[i] + ".png"
    }
    i++;
  }
}