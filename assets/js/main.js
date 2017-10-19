window.onload = function(){
    (function(){
        let App = {
            workArea: document.querySelector('#workArea'),
            init: function() {  //Initialize the application
                console.log("Initialize");
                /*const stickyNote = new StickyNote();    //Creates new stickynote object
                stickyNote.message = "Hallo daar, maat";    //Assign message to new stickynote
                stickyNote.createdDate = new Date().getTime();  //Assign creation date to new stickynote
                stickyNote.id = utils.generateId(); //Assign random id with timestamp and random number 

                const stickyNoteJsonString = JSON.stringify(stickyNote);    //convert JSON to string

                if (window.localStorage) {
                    window.localStorage.setItem('sn', stickyNoteJsonString);    //Store sticky note JSON in local storage
                } else {
                    console.warn("This browser does not support local storage");
                }
                const snJsonString = window.localStorage.getItem('sn'); //Gets stickynote from local storage
                const snObject = JSON.parse(snJsonString);  //Parses JSON string back to object
                console.log(snObject);
                this._applicationDbContext = ApplicationDbContext; //Reference the ApplicationDbContext Object literal
                this._applicationDbContext.init("stickyNotes"); //Call the init function from the previous object
                const data = this._applicationDbContext.getStickyNotes();
                console.log(data);
                let sn = new StickyNote();
                sn.message = "Hallo wereld";
                this._applicationDbContext.addStickyNote(sn);*/
                this._applicationDbContext = ApplicationDbContext; // Reference to the ApplicationDbContext object
                this._applicationDbContext.init('stickyNotes'); // Intialize the ApplicationDbContext with the connection string as parameter value
                this.setWorkArea();
            },
            setWorkArea: function() {
                document.querySelector('#addStickyNote').addEventListener('click', function(){this.createStickyNote}, false);
                let stickyNotes = ApplicationDbContext.getStickyNotes();
                for (let i = 0; i < stickyNotes.length; i++){
                    if (!stickyNotes[i].deletedDate) {
                        this.createStickyNote(stickyNotes[i]);
                    }
                }
            },
            createStickyNote: function(stickyNote) {
                let sn;
                let sticky = stickyNote;
                //Why does this not work?
                if (!sticky) {
                    console.log('hello');
                    sn = new StickyNote();
                    let stickyNoteEl = new StickyNoteEl(sn.id);
                    stickyNoteEl.editStickyNote();
                    ApplicationDbContext.addStickyNote(sn);
                } else {
                    sn = stickyNote;
                    let stickyNoteEl = new StickyNoteEl(sn.id);
                    stickyNoteEl.drawNote();
                }
            },
        };
        App.init();
    })();
}