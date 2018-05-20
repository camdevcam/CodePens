$(document).ready(function() {
  var userSearch = "";
  var searchPrefix = "?action=query&list=search&format=json&srsearch=";
  var urlBase = "https://en.wikipedia.org/w/api.php"
  var urlSuffix = "&callback=?"
  var requestLinkPrefix = "?action=query&prop=info&format=json&inprop=url&titles=";
  var randomLinkPrefix = "?action=query&list=random&format=json&rnlimit=10";
  var randomLinkMoreInfoPrefix = "?action=query&prop=extracts&format=json&exsentences=2&explaintext=&exsectionformat=plain&titles="
  var suggestPrefix = "?action=opensearch&limit=5&namespace=0&format=json&search="
  var remoteUrl;
  var searchResults = [];
  var WikiEntry = function() {
    this.title;
    this.fullUrl;
    this.snippet;
  }

  suggest();
  function suggest() {
    $(".input-box").autocomplete({
      source: function (request, response) {
         $.ajax({
             url: urlBase+suggestPrefix+urlSuffix,
             data: { search: request.term },
             dataType: "jsonp",
             success: function(data) {
               
               response(data[1]);
               console.log(data);
             },
             error: function () {
               response([])
             }
         });
        
      },
      minLength: 3,
      delay: 100
    })
  }

  $(".find-button").click(function() {
    $("#search-results").css("display", "block");
    $("#search-results .inner-box").html(""); 
    userSearch = $(".input-box").val();
    remoteUrl = urlBase + searchPrefix + userSearch + urlSuffix;
    callWiki(remoteUrl);
  })
  $(".surprise-me-button").click(function() {
    $("#search-results").css("display", "block");
    $("#search-results .inner-box").html(""); 
    remoteUrl = urlBase + randomLinkPrefix + urlSuffix;
    console.log(remoteUrl);
    randomLinks(remoteUrl);
  })

  function callWiki(url) {
      $.ajax({
        url: url,
        dataType: 'json',
        type: 'POST',
        headers: {
          'Api-User-Agent': 'Wiki Search'
        },
        success: function(data) {
          $.each(data.query.search, function(i, item) {
            searchResults[i] = new WikiEntry();
            searchResults[i].title = item.title;
            searchResults[i].snippet = item.snippet;
            getWikiLink(i, item.title); 
          })
        }
      });
    } 
  function getWikiLink(i, itemTitle) {
      $.ajax({
        url: urlBase + requestLinkPrefix + itemTitle + urlSuffix,
        dataType: 'json',
        type: 'POST',
        headers: {
          'Api-User-Agent': 'Wikipedia Search Tool for FreeCodeCamp challenge/0.1; contact progmacattack at GitHub'
        },
        success: function(data) {
          $.each(data.query.pages, function(j, item) {
            searchResults[i].fullUrl = item.fullurl;
            displayResult(searchResults[i]);
          })
        }
      })
    } 

  function randomLinks(url) {
    $.ajax({
      url: url,
      dataType: 'json',
      type: 'POST',
      headers: {
        'Api-User-Agent': 'Wikipedia Search'
      },
      success: function(data) {
        console.log(url);

        $.each(data.query.random, function(i, item) {
          searchResults[i] = new WikiEntry();
          searchResults[i].title = item.title;
          $.ajax({
              url: urlBase + randomLinkMoreInfoPrefix + item.title + urlSuffix,
              dataType: 'json',
              type: 'POST',
              headers: {
                'Api-User-Agent': 'Wiki Search Bar; go'
              },
              success: function(data) {
                var pageId = Object.keys(data.query.pages);

                searchResults[i].snippet = (data["query"]["pages"][pageId]["extract"]);
                getWikiLink(i, item.title); 
              }
            })

        })
      }
    })
  }

  function displayResult(obj) {
    console.log(obj)
    $('<article class = "search-result"><h1><a href="' + obj.fullUrl + '" target="_blank">' + obj.title + '</h1></a><p>' + obj.snippet + '</p></article>').appendTo("#search-results .inner-box");
  }
})