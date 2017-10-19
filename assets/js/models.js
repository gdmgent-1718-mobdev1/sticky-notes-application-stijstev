//Set of different models

//sticky note class (object constructor)

function StickyNote() {
    let _id;
    let _message;

    let _createdDate;
    let _modifiedDate = null;
    let _deletedDate = null;

    return {
        get id() {
            return _id;
        },
        set id(id) {
            _id = id;
        },
        get message() {
            return _message;
        },
        set message(message) {
            _message = message;
        },
        get createdDate() {
            return _createdDate;
        },
        set createdDate(createdDate) {
            _createdDate = createdDate;
        },
        get modifiedDate() {
            return _modifiedDate;
        },
        set modifiedDate(modifiedDate) {
            _modifiedDate = modifiedDate;
        },
        get deletedDate() {
            return _deletedDate;
        },
        set deletedDate(deletedDate) {
            _deletedDate = deletedDate;
        },
    }
}
//I've seperated stickynote content and visual representation, is this the way to go?
function StickyNoteEl(id) {
    this.stickyNote = ApplicationDbContext.getStickyNoteById(id);

    this.isEditable = true;

    this.elementsArray = [];

    this.elements = {
        stickyNote: {element: null, class: 'stickyNote'},
        stickyNoteBody: {element: null, class: 'stickyNote-body'},
        buttonContainer: {element: null, class: 'stickyNote-buttonsContainer'},
    }
    this.buttons = {
        remove: {
            func: function(id){
                ApplicationDbContext.softDeleteStickyNoteById(id);
                document.getElementById(id).style.display = 'none';
            },
            display: 'inline-block',
            img: "assets/images/delete.svg",
        },
        edit: {
            func: this.editStickyNote,
            display: 'inline-block',
            img: "assets/images/edit.svg",
        },
        confirm: {
            func: function(){},
            display: 'none',
            img: "assets/images/confirm.svg",
        }
    };
    this.drawNote = function() {
        this.createStickyNoteEls();
        this.createButtons();
    };
    this.createStickyNoteEls = function() {
        for (key in this.elements) {
            this.elements[key].element = document.createElement('div');
            this.elements[key].element.setAttribute('class', this.elements[key].class);
        }
        this.elements.stickyNote.element.setAttribute('id', this.stickyNote.id);
        this.elements.stickyNoteBody.element.textContent = this.stickyNote.message;
        this.elements.stickyNote.element.appendChild(this.elements.stickyNoteBody.element);
        this.elements.stickyNote.element.appendChild(this.elements.buttonContainer.element);

        document.querySelector('#workArea').appendChild(this.elements.stickyNote.element);
    };
    this.createButtons = function() {
        //Loops over buttons in buttons object and adds them to the sticky note
        for (key in this.buttons) {
            let button = this.buttons[key];
            let stickyNote = this.stickyNote;
            let buttonEl = document.createElement('img');
            buttonEl.setAttribute('src', button.img);
            buttonEl.setAttribute('class', `stickyNote-buttonsContainer button`);
            buttonEl.style.display = button.display;
            //Variables become undefined inside anonymous function. Is the current solution good practice?
            buttonEl.addEventListener('click', function(){
                button.func(stickyNote.id);
            }, false);
            this.elements.buttonContainer.element.appendChild(buttonEl);
        }
    }
    this.editStickyNote = function() {
        let toolBelt = document.querySelector('#toolbelt');
        let input = document.createElement('input');
        input.setAttribute('class', stickyNote-input);

        let confirmBtn = document.createElement('img');
        confirmBtn.setAttribute('src', 'assets/images/confirm.svg');
        confirmBtn.addEventListener('click', )
        
        toolBelt.appendChild(input);
        toolBelt.appendChild(confirmBtn);
    }
}