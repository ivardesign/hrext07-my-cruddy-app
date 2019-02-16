/*---------------------------------------------- */
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
    // once set up, remove addKey input from UI
    // Add must also include Edit and Delete, tied to key of entry
    // Add must 'append' new entries (replace '.html')

/*---------------------------------------------- */
$(document).ready(function() {
  // should load pre-existing local storage to display on ready/refresh
  // if localStorage stuff... iterate
  if (localStorage.length > 0) {
    var keysArray = Object.keys(localStorage);

    for (i = 0; i < keysArray.length; i++) {
      var keyData = keysArray[i];
      var keyPrefix = keysArray[i].slice(0, 8);
      var valueData = localStorage.getItem(localStorage.key(i));
      // load value and its html and put it on display if it has our prefix
      if (keyPrefix == 'T0DOLi5t') {
        $('.todos').append(`<div class="display-data-item" data-key-value="` + keyData +
                           `"><span class="item">` + valueData +
                           `</span><span class="item-buttons"><button class="edit" id="` + keyData +
                           `">Edit</button><button class="delete" id="` + keyData +
                           `">Delete</button></span></div>`);
      }
    }
    toggleDisplay();
  } else {
    toggleDisplay();
  }

  // '.submit' (aka: add)
  $('.submit').click(function(e) {
    var keyData = 'T0DOLi5t-' + Date.now();// use timestamp instead of asking for a key entry.
    // added prefix to keydata to help identify todo list keys to this app.
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
      // toggleDisplay
      toggleDisplay();
      respond(this);// -----------------------------------------------------
    }

  });

  // '.edit'
  $('.todos').on('click', '.edit', function() {// get item clicked in .todos
    var keyData = $(this).attr('id').toString();// get id and make it a string
    var valueData = window.localStorage.getItem(keyData);
    // on click:
      // replace content of data-keyValue with
        // an input that contains the value currently stored
        // and replace .item-buttons (edit/delete buttons) with 'save' and 'cancel' buttons
      $(this).closest('div').replaceWith('<div class="edit-item"><input type="text" class="save-value" id="' + keyData +
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
    respond(this);// -----------------------------------------------------
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
    respond(this);// -----------------------------------------------------
  });

  // '.delete'
  $('.todos').on('click', '.delete', function() {// get item clicked in .todos
    var keyData = $(this).attr('id').toString();// get id and make it a string
    $(this).closest('.display-data-item').fadeOut(150, function() {
      localStorage.removeItem(keyData);// removes key and data
      $(this).closest('.display-data-item').remove();// remove item from display
      // toggleDisplay
      toggleDisplay();
      respond(this);// -----------------------------------------------------
    });

  });

  // 'clear all'
  $('.clear').click(function() {
    if (localStorage.length > 0) {
      var keysArray = Object.keys(localStorage);

      for (i = 0; i < keysArray.length; i++) {
        var keyData = keysArray[i];
        var keyPrefix = keysArray[i].slice(0, 8);

        if (keyPrefix =='T0DOLi5t') {
          localStorage.removeItem(keyData);// removes key and data
        }
      }
      $('.todos').html('');// clear the .todos box
      // toggleDisplay
      toggleDisplay();
      respond(this);// -----------------------------------------------------
    }
  });

  // 'toggleDisplay'
  function toggleDisplay() {
    var keysArray = Object.keys(localStorage);

    if (keysArray.length > 0) {
      for (var i = 0; i < keysArray.length; i++) {
        var prefix = keysArray[i].slice(0, 8);
        if (prefix != 'T0DOLi5t') {
          keysArray.splice(keysArray[i], 1);
        }
      }
      if (keysArray.length > 0) {
        $('#content').fadeIn(100, function() {
          $('#content').removeClass('hide');
        });
      }
      if (keysArray.length === 0) {
        $('#content').fadeOut(100, function() {
          $('#content').addClass('hide');
        });
      }
    }
    if (keysArray.length === 0) {
      $('#content').fadeOut(100, function() {
        $('#content').addClass('hide');
      });
    }
  }

  // responses
  // $('#responses').append('A response might be nice.  Maybe not.');
  function respond() {
    // detect what is calling for a response
    var arg = arguments[0].className;
    var deleteResponse = '<h2>ToDo has been deleted</h2>';
    var addResponse    = '<h2>ToDo has been added</h2>';
    var clearResponse  = '<h2>ToDo list has been cleared</h2>';
    var saveResponse   = '<h2>ToDo edit has been saved</h2>';
    var cancelResponse = '<h2>ToDo edit has been cancelled</h2>';
    var $response;
    // establish appropriate response
    if (arg == 'display-data-item') $response = deleteResponse;
    if (arg == 'submit')            $response = addResponse;
    if (arg == 'clear')             $response = clearResponse;
    if (arg == 'save')              $response = saveResponse;
    if (arg == 'cancel')            $response = cancelResponse;
    // response message should fade in
    // response message should fade out after n seconds
    $('#responses').animate({ opacity: 0 }, function() {
      $('#responses h2').replaceWith($response);
      $('#responses').animate({ opacity: 1 }, 0).delay(1500).animate({ opacity: 0 });
    });
  }

});
// final thoughts:
// i don't care for the feedback responses.  they feel like showing-off jQuery, mainly.
// drag and drop reordering and memory of changes seems important
