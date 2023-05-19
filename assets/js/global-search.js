$(function() {
    globalSearch();
});

function globalSearch() {
    $('input[type=text]#search-news').focus();
    $("#search-news").on("keyup", function(event) {
        $('.search-news .news').removeClass('d-none');
        var search = '';
        $('.search-news').children('.news').each(function () {
            var title = $(this).children("._news").find('h5').children('a').text().toLowerCase();
            title += " " + $(this).children("._news").find('p').text().toLowerCase();
            search = event.currentTarget.value.toLowerCase();
            var searchFor = search.split(' ');
            for (var i = 0, ln = searchFor.length; i < ln; i++) {
                if (title.indexOf(searchFor[i]) !== -1) {
                    $(this).removeClass('d-none');
                }
                else {
                    $(this).addClass('d-none');
                }
            }
        });
        if (search === "") {
            $(".news.global-search-input .search-results-count").addClass('d-none');
        }
        else {
            var total = $('.search-news').children('.news').length;
            var hidden = $('.search-news').children('.news.d-none').length;
            var results = total - hidden;
            $(".news.global-search-input .search-results-count").removeClass('d-none');
            $(".news.global-search-input .search-results-count").html('<span>Found '+results+' results containing the words: <b>"'+search+'"</b></span>');
        }
    });
}
