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
    // >>> Add generates unique key (id) function plan <<<
    // once set up, remove add input from UI
    // Add must also include Edit and Delete, tied to key of entry
    // Add must 'append' new entries (replace '.html')

/* ----------------------------------------------------------------------------------- */
$(document).ready(function() {
  $('.submit').click(function(e) {
    var keyData = Date.now();// use timestamp instead of asking for a key entry.
    var valueData = $('#addText').val();
    $('#addText').val(''); // clear input
    // write to db
    localStorage.setItem(keyData, valueData);
    // write to display
    $('.todos').append(`<div class="display-data-item ` +
                         keyData +
                         `" data-keyValue="keyData"><span class="item">` +
                         valueData +
                         `</span><span class="item-buttons"><button class="edit" id="` +
                         keyData +
                         `">Edit</button><button class="delete" id="` +
                         keyData +
                         `">Delete</button></span></div>`);
  });

  // delete item
  $('.todos').on('click', '.delete', function() {// get item clicked in .todos
    var keyData = $('.delete').attr('id').toString();// get id and make it a string
    localStorage.removeItem(keyData);// removes key and data
    $(this).closest('div').remove();// remove item from display
  });

  // edit item
  $('.todos').on('click', '.edit', function() {// get item clicked in .todos
    var keyData = $('.delete').attr('id').toString();// get id and make it a string
    // uh oh... how to edit?
  });

  // clear all
  $('.clear').click(function() {
    localStorage.clear();// clears localstorage
    $('.todos').html('');// clear the .todos box
  });

});
