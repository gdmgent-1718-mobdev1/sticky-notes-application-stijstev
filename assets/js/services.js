/*
ApplicationDBConext
1) Database transactions: CRUD operations,
2) Cache for loaded data or content,
*/

let ApplicationDbContext = {
    init: function(connectionStr) {
        this._connectionStr = connectionStr; //Connection string (key in local storage)
        this._dbData = {
            stickyNotes: [],
        }; //The data saved as value in the local storage video de connectionString aka key
        //Check if the key exists in the local storage
        //If so -> assign value as value of the variable _dbData
        //Otherwise -> set the value of the variable _dbData as value for the specified key
        if(window.localStorage.getItem(this._connectionStr) != null) {
            this._dbData = JSON.parse(window.localStorage.getItem(this._connectionStr));
        } else {
            window.localStorage.setItem(this._connectionStr, JSON.stringify(this._dbData));
        }
    },
    getStickyNotes: function() { //Get all sticky notes from local storage
        const data = this._dbData.stickyNotes;
        if (data == null || (data != null && data.length == null)) {
            return null;
        }
        return data;
    },
    getStickyNoteById: function(id) { //Get a specific sticky note by its id
        const data = this._dbData.stickyNotes;
        // Ugly
        let match = false, i = 0, stickyNote;
        while(!match && i < data.length) {
            stickyNote = data[i];
            if(stickyNote.id === id) {
                match = true;
                break;
            } else {
                i++;
            }
        }      
        if(match) {
            return stickyNote;
        }
        return null;
    },
    addStickyNote: function(stickyNote) { //Add stickynote
        if (stickyNote != undefined && stickyNote != null) {
            //Create unique id
            stickyNote.id = utils.generateId(1000);
            //Add created date to stickynote
            stickyNote.createdDate = new Date().getTime();
            //Add stickynote to array
            this._dbData.stickyNotes.push(stickyNote);
            this.save();
            return stickyNote;
        }
        return null;
    },
    //Find index of stickynote by id
    findIndexOfStickyNoteById: function(id) {
        const data = this.getStickyNotes();
        if(data == null) {
            return -1;
        }

        const snFromDB = this.getStickyNoteById(id);
        if(snFromDB == null) {
            return -1;
        }

        // Ugly
        let match = false, i = 0, stickyNote;
        while(!match && i < data.length) {
            stickyNote = data[i];
            if(stickyNote.id === id) {
                match = true;
            } else {
                i++;
            }
        }      
        if(match) {
            return i;
        }
        return -1;
    },
    updateStickyNote: function(stickyNote) { //Update stickynote
        // 1. Get the index of the sticky note 
        // 2. Replace element in array
        // 3. Save to the local storage
        // 4. Return true if succeeded otherwise false        
        const index = this.findIndexStickyNoteById(stickyNote.id);
        if(index == -1) {
            return false;
        }
        this._dbData.stickynotes[index] = stickyNote;
        this.save();
        return true;
    },
    // Delete an exisiting sticky note
    deleteStickyNoteById: function(id) { //Delete stickynote
        // 1. Get the index of the sticky note 
        // 2. Remove element from the array
        // 3. Save to the local storage
        // 4. Return true if succeeded otherwise false        
        const index = this.findIndexStickyNoteById(id);
        if(index == -1) {
            return false;
        }
        this._dbData.stickynotes.splice(index, 1);
        this.save();
        return true;
    },
    softDeleteStickyNoteById: function(id) { //Soft delete stickynote
        // 1. Get the index of the sticky note 
        // 2. Replace element from the array
        // 3. Save to the local storage
        // 4. Return true if succeeded otherwise false        
        const index = this.findIndexOfStickyNoteById(id);
        if(index == -1) {
            return false;
        }
        const stickyNote = this.getStickyNoteById(id);
        if(stickyNote == null) {
            return false;
        }
        stickyNote.deletedDate = new Date().getTime();
        this._dbData.stickyNotes[index] = stickyNote;
        this.save();
        return true;
    },
    softUndeleteStickyNoteById: function(id) { //Soft undelete stickynote
        // 1. Get the index of the sticky note 
        // 2. Replace element from the array
        // 3. Save to the local storage
        // 4. Return true if succeeded otherwise false        
        const index = this.findIndexStickyNoteById(id);
        if(index == -1) {
            return false;
        }
        const stickyNote = this.getStickyNoteById(id);
        if(stickyNote == null) {
            return false;
        }
        stickyNote.deletedDate = null;
        this._dbData.stickynotes[index] = stickyNote;
        this.save();
        return true;
    },
    save: function() {
        window.localStorage.setItem(this._connectionStr, JSON.stringify(this._dbData)); // Write the _dbData into the localstorage via the key
        return true; // Always true in modern webbrowsers
    }
}