/* ----------------------------------------------------------------------------------- */
    // ---------- brainstorm ----------
    // clear inputs on button click (add button)
    // every entry should be appened as a new .display-entry item (switch to append)
    // every entry should have it's own edit and delete.
    // duplicate keys (add button) should not be permitted >> maybe do away with manually entered keys - replace with incrementing or timestamp, don't display key id's in output but tie edit/delete to id for each
    //-- make list sortable >> drag-n-drop
    // edit function needs work too
    // make UI pretty and aria compliant

    // ---------- Order ideas ----------
    // clear inputs on click of 'add' button
    // make 'add' generate unique key (id) for each entry and get rid of the 'key' input
    // 'add' function should include
        // entry
        // edit button
        // delete button
    // re-arrange the UI
    // 'clear' should be obvious, near ouput (away from form) and say 'clear all'

    // ---------- Implementation ----------

    // >>> clear inputs function plan <<<
    // tied to 'add' click-event (what about when someone just hits return/enter?)
    // search MDN : clear input on click >>>>>>> try #addText .value = '';
    // >>> Add generates unique key (id) function plan <<<
    // John mentioned something about uuid generater ... see if that's something to use
    // mdn uuid and search uuid generator
    // once set up, remove add input from UI
    // Add must also include Edit and Delete, tied to key of entry
    // Add must 'append' new entries (replace '.html')
    // do buttons need to be in forms? what happens to listeners when we append?
/* ----------------------------------------------------------------------------------- */
// init app
// interact with DOM
// interact with localstorage
/*
window.localStorage (mdn)
localStorage.setItem('hrext07', 'r00lz');
var localTest = localStorage.getItem('hrext07');
localStorage.removeItem('hrext07');
localStorage.clear(); //clears all local storage

// uuid generator
// db could be a object to expand more than 1 item is added
*/
$(document).ready(function() {
  $('.submit').click(function(e) {
    //console.log(e);
    var keyData = Date.now();// use instead of asking for key entry.
    var valueData = $('#addText').val();
    //$('#input-key').val('');// clear input
    $('#addText').val(''); // clear input
    // write to db
    localStorage.setItem(keyData, valueData);
    var displayText = keyData + ' | ' + localStorage.getItem(keyData);
    //console.log(localStorage.getItem(keyData, valueData));

    // read from db
    // and append a div
    // <div class="display-data-item" data-keyValue="keyData">valueData</div>
    //ToDo make these vars make sense accross the app

    $('.display-entry').append(`<div class="display-data-item ` + keyData + `" data-keyValue="keyData">` + valueData + `</div>`);
  });

  // delete item
  $('.delete').click(function() {
  var keyData = $('#input-key').val();
    localStorage.removeItem(keyData);
    $('.display-entry').text('');
  });

  // delete all
  $('.clear').click(function() {
    localStorage.clear();
    $('.display-entry').text('');
  });
  // update/edit db
});
