$( document ).ready(function(){
    $('#submit').click(function(){
        var film_name = $('#name').val();
        film_name = film_name.replace(/\ /g, '+');
        var url = ["http://www.omdbapi.com/?",
                   "t=", film_name,
                   "&y=",
                   "&plot=short",
                   "&r=json"].join('');
        var res = jQuery.getJSON(url, function( data ){
            console.log(data);
            if (data.Response === 'False'){
                $('#message').text(data.Error);
                $('#message').attr('text-color', 'red');
            } else {
                console.log(data.Rating);
                var score = .5-((data.imdbRating*10)-data.Metascore)/200
                $('#meter').attr('value', score);
                switch(true){
                    case (score > 0.5):
                        $('#message').text('Films probably quite pretencious. (' + score + ')');
                        break;
                    case( score <= 0.5):
                        $('#message').text('Films probably quite dumb. (' + score + ')');
                        break;
                };
            };
        });
    });
});
