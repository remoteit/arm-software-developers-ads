function searchByTitle(card,search_word_array) {
    // Title of learning path --> title must include ALL search terms (any order or case)
    let card_title = card.querySelector('.search-title').innerHTML.toLowerCase();
    var title_serach_match = search_word_array.every(item => card_title.includes(item));
    if (!title_serach_match) {
        return true // hide it
    }
    else {
        return false // show it
    }
}

function searchByAdditionalSearchTerm(card,search_word_array) {
    let card_classes = card.classList;
    card_classes.forEach(function (term, i) {
        console.log(term);
        if (term.startsWith('term-')) {
            // now iterate through this
            var additional_search_match = search_word_array.every(item => term.includes(item));
            if (additional_search_match) {
                console.log('keep shown!')
                return false // show it
            }
        }
    });
    return true
}


function parseParamsFromURL(url_str) {
        // Split by & and get element that has 'search='
        let url_params = url_str.split('&');
        let search_str = url_params[url_params.findIndex(e => e.includes("search="))];
        
        // Remove '?', 'search=', and replace '+' with spaces leaving just the string.
        search_str = search_str.replaceAll('?','').replace('search=','').replaceAll('+',' ');
        // Again, for safety, strip all non numbers and letters
        search_str = search_str.replaceAll(/[^a-z A-Z 0-9]+/g, "");

        return search_str
}


function hideElements(all_path_cards,results_to_hide) {
    // Hide elements in array (and actively show all OTHER elements)
    for (let card of all_path_cards) {
        if (results_to_hide.includes(card)) { 
            // Hide card
            card.setAttribute('hidden',true);
        }
        else {
            // Show card
            card.removeAttribute('hidden');
        }
    }
}
