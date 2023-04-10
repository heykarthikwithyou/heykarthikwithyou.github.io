$(function() {
    globalSearch();
});

function globalSearch() {
    $('input[type=text]#search-news').focus();
    $("#search-news").on("keyup", function(event) {
        $('.search-news .news').removeClass('d-none');
        $('.search-news').children('.news').each(function () {
            var title = $(this).children("._news").find('h5').children('a').text().toLowerCase();
            title += " " + $(this).children("._news").find('p').text().toLowerCase();
            var search = event.currentTarget.value.toLowerCase();
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
    });
}
