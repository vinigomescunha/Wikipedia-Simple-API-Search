w = {/*wiki object*/
    term: "Love", /*search term*/
    u: 'http://en.wikipedia.org/w/api.php?action=query&titles=',/*url to query api wikipedia*/
    ap:'&prop=extracts&exintro&explaintext&exsentences=100&redirects&converttitles&callback=?&format=json',/*additional params*/
    iap: "&prop=pageimages&redirects&callback=?&format=json",/*image additional params*/
    rd: function(data) { /*result data*/
        if (data.query && data.query.pages) 
		$.each(data.query.pages, function(i, json) {
		    json = typeof json.extract !== 'undefined' ? json.extract.toString() : '';
		    $('#result').html('<div id="search-term-' + w.term + '"><span id="image-' + i + '"></span> ' + w.term + ' &rarr; ' + json + '</div>');
		    $.getJSON(w.u + w.term + w.iap, function(d) { 
			w.td(d); 
		    });
		});
    },
    td: function(data) { /*image thumb data*/
	if (data.query && data.query.pages) 
		$.each(data.query.pages, function(j, js) {
		    if (js.thumbnail) { jt = js.thumbnail;
		        $("#image-" + j).html("<img width=" + jt.width + " height=" + jt.height + " src=" + jt.source + " />");
		    }
		});
    },
    sd: function() {/*search data*/
        $.getJSON(w.u + w.term + w.ap, function(d) {
            w.rd(d);
        });
    }
};
$("#search").on("keyup", function() {
    w.term = $(this).val();
    w.sd();
});
w.sd();
