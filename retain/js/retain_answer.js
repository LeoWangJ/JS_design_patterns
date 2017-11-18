$(function(){
    /**
    * @param {function} init - 若localStorage中的notes無值則給予[]
    * @param {function} add - 將obj的值傳進localStorage中的notes中
    * @param {function} getAllNotes - 回傳notes值
    */
    var model = {
        init: function() {
            if (!localStorage.notes) {
                localStorage.notes = JSON.stringify([]);
            }
        },
        add: function(obj) {
            var data = JSON.parse(localStorage.notes);
            data.push(obj);
            localStorage.notes = JSON.stringify(data);
        },
        getAllNotes: function() {
            return JSON.parse(localStorage.notes);
        }
    };
    
    var octopus = {
        addNewNote: function(noteStr) {
            model.add({
                content: noteStr,
                date: Date.now()
            });
            view.render();
        },
        getNotes: function() {
            return model.getAllNotes().reverse();
        },
        init: function() {
            model.init();
            view.init();
        }
    };


    var view = {
        init: function() {
            this.noteList = $('#notes');
            var newNoteForm = $('#new-note-form');
            var newNoteContent = $('#new-note-content');
            newNoteForm.submit(function(e){
                octopus.addNewNote(newNoteContent.val());
                newNoteContent.val('');
                e.preventDefault();
            });
        },
        render: function(){
            var htmlStr = '';
            octopus.getNotes().forEach(function(note){
                htmlStr += '<li class="note">'+
                                '<span class="note-date">'+
                                new Date(note.date).toString() +     
                                '</span>'+
                                 note.content +
                            '</li>';
            });
            this.noteList.html( htmlStr );
        }
    };
    //載入js檔時執行
    octopus.init();
});