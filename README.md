# hrext07-my-cruddy-app
Create Read Update and Delete framework using JS

## Tasks

- [x] Where to store data? (localstorage)
- [x] How to capture data? (web form)
- [x] How to modify data? (update action, delete action)
- [x] How to view data? (style?)
- [x] UI/UX considerations (how are we going to use this?)

### Advanced Reqs
- [x] Clear inputs on click of 'add' button
- [x] Make 'add' generate unique key (id) for each entry and get rid of the 'key' input on the form
- [x] Add function should ouput to display: entry data (ToDo item) with unique edit and delete buttons
- [x] Rearrange UI
- [x] Clear button: should be obvious that Clear means to clear all ToDos and maybe say 'Clear all'

## Final Thoughts
- I don't care for the feedback responses, they feel unnecessary.
- Drag and drop reordering and memory of changes seems important.
- Unique id-prefix tied to app allows for other items that use localStorage on the same domain, but the 'Clear All' button clears ALL localStorage: it should ONLY clear ToDo list items with the unique-ish prefix!
