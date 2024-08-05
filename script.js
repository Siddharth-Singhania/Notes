const addbtn = document.querySelector("#addbtn");
const main = document.querySelector("#main");

addbtn.addEventListener('click',
    function(){
        addnote();
    }    
);

const saveNotes = () =>{
    const notes = document.querySelectorAll(".note textarea");
    const data = [];
    notes.forEach(
        (note) => {
            data.push(note.value);
        }
    )
    if(data.length == 0){
        localStorage.removeItem("notes");
    }else{
        localStorage.setItem("notes",JSON.stringify(data));
    }
}   




const addnote = (text = "") =>{    
//text = "" this means at first this text is empty but if there is something passed then text will have that value
    const note = document.createElement("div");
    note.classList.add("note");
    note.innerHTML= `
    <div class="tool">
        <i class="save fa-solid fa-floppy-disk"></i>
        <i class="trash fa-solid fa-trash"></i>
    </div>
    <textarea>${text}</textarea>
    `;
    note.querySelector(".trash").addEventListener("click",
        function(){
            note.remove();
            saveNotes();
        }
    )

    note.querySelector(".save").addEventListener("click",
        function(){
            saveNotes();
        }
    )
    note.querySelector("textarea").addEventListener(
        "focusout",
        function(){
            saveNotes();
        }
    )
    main.appendChild(note);
    saveNotes();

}

//self calling function

(function(){
    const LS_notes = JSON.parse(localStorage.getItem("notes"));
    if(LS_notes === null){
        addnote();
    }else{
        LS_notes.forEach(
            (LS_notes) =>{
                addnote(LS_notes);
            }
        )
    }    
}
)();