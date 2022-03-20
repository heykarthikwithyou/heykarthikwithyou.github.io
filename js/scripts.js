window.addEventListener('load', function() {
    /* Add social share icons on content detail page */
	writeSocialShareLinks('content');
    /* Add search results to the search page */
    addSearchResultstoSearchPage();
    /* Add cursor on search input on the search page */
    addCursoronInputtoSearchPage();
});

function writeSocialShareLinks(section) {
    const content_data_title = document.querySelector('.content-data-title');
    var title = '';
    if (content_data_title !== null) {
        title = document.querySelector('.content-data-title').innerHTML;    
    }	
	var url = window.location.href;
    var hashtags = 'SexualHealth'
    var facebook = 'http://www.facebook.com/sharer.php?u='+url;
	var twitter = 'https://twitter.com/share?url='+url+'&amp;text='+title+'&amp;hashtags='+hashtags;
	var linkedin = 'http://www.linkedin.com/shareArticle?mini=true&amp;url=' + url;
    var telegram = 'https://t.me/share/url?url='+url+'&text='+title;
    var whatsapp = 'https://web.whatsapp.com/send?text='+url;
    var whatsapp_phone = 'https://api.whatsapp.com/send?text='+url;
    if (section == 'content') {
		var output = '<ul>'+
						'<li><a rel="noreferrer" href="'+facebook+'" target="_blank" data-toggle="tooltip" data-placement="bottom" title="Share now on Facebook">'+
							'<img src="/images/sexualhealth-facebook.png" />'+
						'</a></li>'+
                        '<li><a rel="noreferrer" href="'+twitter+'" target="_blank" data-toggle="tooltip" data-placement="bottom" title="Share now on Twitter">'+
                            '<img src="/images/sexualhealth-twitter.png" />'+
                        '</a></li>'+
                        '<li><a rel="noreferrer" href="'+linkedin+'" target="_blank" data-toggle="tooltip" data-placement="bottom" title="Share now on Linkedin">'+
                            '<img src="/images/sexualhealth-linkedin.png" />'+
                        '</a></li>'+
                        '<li><a rel="noreferrer" href="'+telegram+'" target="_blank" data-toggle="tooltip" data-placement="bottom" title="Share now on Telegram">'+
                            '<img src="/images/sexualhealth-telegram.png" />'+
                        '</a></li>'+
                        '<li class="whatsapp_desktop"><a rel="noreferrer" href="'+whatsapp+'" target="_blank" data-toggle="tooltip" data-placement="bottom" title="Share now on Telegram">'+
                            '<img src="/images/sexualhealth-whatsapp.png" />'+
                        '</a></li>'+
                        '<li class="whatsapp_mobile"><a rel="noreferrer" href="'+whatsapp_phone+'" target="_blank" data-toggle="tooltip" data-placement="bottom" title="Share now on Telegram">'+
                            '<img src="/images/sexualhealth-whatsapp.png" />'+
                        '</a></li>'+
                    '</ul>';
        const content_data_social_share = document.querySelector('.content-data-social-share');
        if (content_data_social_share !== null) {
            content_data_social_share.innerHTML = output;
        }
	}
}

function readFile(file, callback) {
    var rawFile = new XMLHttpRequest();
    rawFile.overrideMimeType("application/json");
    rawFile.open("GET", file, true);
    rawFile.onreadystatechange = function() {
        if (rawFile.readyState === 4 && rawFile.status == "200") {
            callback(rawFile.responseText);
        }
    }
    rawFile.send(null);
}
function storeValue(key, value) {
    if (localStorage) {
        localStorage.setItem(key, value);
    } else {
        $.cookies.set(key, value);
    }
}
function getStoredValue(key) {
    if (localStorage) {
        return localStorage.getItem(key);
    } else {
        return $.cookies.get(key);
    }
}
function currentPage() {
    var _url = document.createElement('a');
    _url.href = window.location.href;
    return _url.pathname;
}

function addSearchResultstoSearchPage() {
    var page = currentPage();
    if (page == '/content/search.html') {
        setTimeout(function() {
            var input = document.querySelector('.global-search-action input');
            input.addEventListener("keyup", function(event) {
                if (event.keyCode === 13) {
                    event.preventDefault();
                    triggerSearch(this.value);
                }
            });
            const action = document.querySelector('.global-search-action .global-search-submit');
            action.addEventListener("click", function(event) {
                var search = document.querySelector('.global-search-action input');
                if (search.value != '') {
                    storeValue('sh-search', search.value);
                    triggerSearch(search.value);
                }
            });
        }, 10);        
    }   
}

function triggerSearch(search) {
    setTimeout(function() {
        readFile("/../data/content.json", function(text) {
            if (search == "") {
                search = getStoredValue('sh-search');
                storeValue('sh-search', '');
            }
            var data = JSON.parse(text);
            const global_search_results = document.querySelector('.global-search-results');
            global_search_results.innerHTML = writeSearchBlogs(data, search);
        });
    }, 20);
}

function writeSearchBlogs(data, search) {
    var output = '';
    output += '<div class="header">'+
                '    <span>Found results containing the words: </span><strong>'+search+'</strong>'+
                '</div>';
    var itr = 0;
    for (var i = data.length - 1; i >= 0; i--) {
        var _search = data[i]['title'].toLowerCase()+" "+data[i]['content'].toLowerCase()
        +" "+data[i]['types'].toLowerCase()+" "+data[i]['summary'].toLowerCase();
        search = search.toLowerCase();
        var status = _search.indexOf(search) !== -1;
        var hide = '';
        if (status == false) {
            hide = 'hidden';
        }
        var title = data[i]['title'];
        var image = data[i]['banner788x443'];
        var url = '/content' + data[i]['url'];
        var summary = data[i]['summary'];
        var types = data[i]['types'].split(",");
        output += '<div class="global-search-result '+hide+'">'+
                        '<img loading="lazy" src="'+image+'" class="img-fluid" />'+
                        '<div class="global-search-result-content">'+
                            '<div class="global-search-result-type">';
            for (var j = types.length - 1; j >= 0; j--) {
                var typeUrl = '/content/'+types[j].replace(" ", "-")+'.html';
                output += '<div><i class="fa fa-heart"></i><a href="'+typeUrl+'" alt="'+types[j]+'" title="'+types[j]+'"><span>'+types[j]+'</span></a></div>';
            }
        output += ''+
                            '</div>'+
                            '<h2><a href="'+url+'" alt="'+title+'" title="'+title+'">'+title+'</a></h2>'+
                            '<p>'+summary+'</p>'+
                            '<a href="'+url+'" alt="'+title+'" title="'+title+'">'+url+'</a>'+
                        '</div>'+
                    '</div>';
        output += '';
    }
    return output;
}

function addCursoronInputtoSearchPage() {
    var page = currentPage();
    if (page == '/content/search.html') {
        document.querySelector(".global-search-action input").focus();
        document.querySelector(".global-search-action input").select();
    }
}