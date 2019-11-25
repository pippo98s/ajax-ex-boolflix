$(document).ready( function (){
  
  
  

  $("button").click( function(){
    $.ajax({
      url: "https://api.themoviedb.org/3/search/movie?api_key=ceb354f968c94e697decd423b41de216&query=" + $("input").val(),
      method : "GET",
      success : function (data){
        // ripulisco l'output ad ogni click
        $(".film-container").html(" ");
        console.log(data.results);
        console.log($("input").val());
        
        for (var key in data.results) {
          var item = data.results[key];
          console.log(item.title);
          var source = $("#entry-template").html();
          var template = Handlebars.compile(source);
          var context = { titolo: item.title, originale: item.original_title, lingua: item.original_language, voto: item.vote_average};
          var html = template(context);
          $(".film-container").append(html);
        }
      },
      
      error : function() {
        alert("404")
      }
    })
  })

});