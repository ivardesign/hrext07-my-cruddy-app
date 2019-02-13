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
  // should load pre-existing local storage to display on ready/refresh
  // if localStorage stuff... iterate
  if (localStorage.length > 0) {
    for (var i = 0; i < localStorage.length; i++) {
      // get current key and value
      var keysArray = Object.keys(localStorage);
      var keyData = keysArray[i];
      var valueData = localStorage.getItem(localStorage.key(i));
      // load value and its html and put it on display
      $('.todos').append(`<div class="display-data-item" data-key-value="` + keyData +
                         `"><span class="item">` + valueData +
                         `</span><span class="item-buttons"><button class="edit" id="` + keyData +
                         `">Edit</button><button class="delete" id="` + keyData +
                         `">Delete</button></span></div>`);
    }
  }

  // '.submit' (aka: add)
  $('.submit').click(function(e) {
    var keyData = Date.now();// use timestamp instead of asking for a key entry.
    var valueData = $('#addText').val();

    if (valueData) {
      $('#addText').val(''); // clear input
      // write to db
      localStorage.setItem(keyData, valueData);
      // write to display
      $('.todos').append(`<div class="display-data-item" data-key-value="` + keyData +
                         `"><span class="item">` + valueData +
                         `</span><span class="item-buttons"><button class="edit" id="` + keyData +
                         `">Edit</button><button class="delete" id="` + keyData +
                         `">Delete</button></span></div>`);
    }
  });

  // '.delete'
  $('.todos').on('click', '.delete', function() {// get item clicked in .todos
    var keyData = $(this).attr('id').toString();// get id and make it a string

    localStorage.removeItem(keyData);// removes key and data
    $(this).closest('.display-data-item').remove();// remove item from display
  });

  // '.edit'
  $('.todos').on('click', '.edit', function() {// get item clicked in .todos
    var keyData = $(this).attr('id').toString();// get id and make it a string
    var valueData = window.localStorage.getItem(keyData);
    // on click:
      // replace content of data-keyValue with
        // an input that contains the value currently stored
        // and replace .item-buttons (edit/delete buttons) with 'save' and 'cancel' buttons
      $(this).closest('div').replaceWith('<div><input type="text" class="save-value" id="' + keyData +
                                         '" value="' + valueData +
                                         '"></input><span class="item-buttons">' +
                                         '<button class="save" id="' + keyData +
                                         '">Save</button><button class="cancel">Cancel</button>' +
                                         '</span></div>');
      $('.save-value').focus();
  });

  // '.save'
  // on save, put updated value into localstorage
  // swap input and save/cancel buttons for updated value & edit/delete
  $('.todos').on('click', '.save', function() {
    var keyData = $('.save').attr('id').toString();
    var valueData = $('.save-value').val();

    if (valueData) {
      $('.save-value').val(''); // clear input
      // write to db
      localStorage.setItem(keyData, valueData);
      // write to display
      $(this).closest('div').replaceWith('<div class="display-data-item" data-key-value="' + keyData +
                                         '"><span class="item">' + valueData +
                                         '</span><span class="item-buttons"><button class="edit" id="' + keyData +
                                         '">Edit</button><button class="delete" id="' + keyData +
                                         '">Delete</button></span></div>');
    }
  });

  // '.cancel'
  $('.todos').on('click', '.cancel', function() {
    var keyData = $('.save').attr('id').toString();
    var valueData = $('.save-value').val();

    $('.save-value').val(''); // clear input
    // write to display
    $(this).closest('div').replaceWith('<div class="display-data-item" data-key-value="' + keyData +
                                       '"><span class="item">' + valueData +
                                       '</span><span class="item-buttons"><button class="edit" id="' + keyData +
                                       '">Edit</button><button class="delete" id="' + keyData +
                                       '">Delete</button></span></div>');
  });

  // 'clear all'
  $('.clear').click(function() {
    localStorage.clear();// clears localstorage
    $('.todos').html('');// clear the .todos box
  });

});
