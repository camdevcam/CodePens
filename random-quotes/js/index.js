//create quote arrays
var quotes = [];
quotes[0] = "I had another Liam Neeson nightmare. I kidnapped his daughter and he just wasn't having it.";
quotes[1] = "Don't make the same mistakes I did. Got it? Or else the whole world tastes like Mama June after hot yoga.";
quotes[2] = "Okay, let's pro/con this superhero thing, pro - They pull down a gaggle of ass, local dry cleaning discounts, lucrative film deals both origin stories and larger ensemble team movies, con - they're lame-ass teacher's pets!";

$("p").text(quotes[0]);

function getQuote(){
	var randomQuote = Math.floor(Math.random() * (quotes.length));
    var showQuote = $("p").text(quotes[randomQuote]);
}

$("#next").on("click", getQuote);

$("#tweet").on("click", function(){
    var heading = $("h4").text();
    var quote = $("p").text();
    var url = "http://www.website.com";
    if (heading.length + quote.length + url.length >= 140){
    quote = quote.slice(0, 120 - url.length) + '...';
  }
    var tweet = 'https://twitter.com/intent/tweet?text=' + heading + quote + url;
    $('button a').attr('href', tweet);
});