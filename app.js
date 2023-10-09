document.addEventListener('DOMContentLoaded', () => {
  const preloader = document.getElementById('new-preloader');
  const appContainer = document.querySelector('.app-container');

  setTimeout(() => {
      preloader.style.display = 'none';
      if (appContainer) {
          appContainer.style.opacity = 1;
      }
  }, 2000); 
  loadNotes();
});


  
  function addNote() {
    const noteInput = document.getElementById('note-input');
    const notesContainer = document.getElementById('notes-container');
  
    if (noteInput.value.trim() !== '') {
      const note = createNoteElement(noteInput.value);
      notesContainer.appendChild(note);
      noteInput.value = '';
  
      // Save notes to local storage
      saveNotes();
    }
  }
  
  function clearNotes() {
    const notesContainer = document.getElementById('notes-container');
    notesContainer.innerHTML = '';
  
    // Clear notes from local storage
    clearLocalStorage();
  }
  
  function saveNotes() {
    const notesContainer = document.getElementById('notes-container');
    const notes = notesContainer.querySelectorAll('.note');
    const notesArray = Array.from(notes).map(note => note.textContent);
  
    // Save notes to local storage
    localStorage.setItem('notes', JSON.stringify(notesArray));
  }
  
  function clearLocalStorage() {
    // Clear notes from local storage
    localStorage.removeItem('notes');
  }
  
  function loadNotes() {
    const notesContainer = document.getElementById('notes-container');
    const savedNotes = JSON.parse(localStorage.getItem('notes')) || [];
  
    savedNotes.forEach(noteText => {
      const note = createNoteElement(noteText);
      notesContainer.appendChild(note);
    });
  }


  // ... (Previous JavaScript code)

// Function to create a note element
function createNoteElement(text) {
    const note = document.createElement('div');
    note.classList.add('note');
    
    const noteContent = document.createElement('div');
    noteContent.classList.add('note-content');
    noteContent.textContent = text;
    note.appendChild(noteContent);
  
    // Toggle expanded class on click to expand/collapse
    note.addEventListener('click', () => {
      note.classList.toggle('expanded');
    });
  
    // Add Edit button
    const editButton = document.createElement('button');
    editButton.textContent = 'Edit Note';
    editButton.classList='editx'
    // editButton.style.background='blue';
    // editButton.style.color='white';
    // editButton.style.border='none';
    // editButton.style


    editButton.addEventListener('click', (event) => {
      event.stopPropagation(); // Prevent note from being clicked
      openNoteDetailsModal(note);
    });
  
    note.appendChild(editButton)
  
    return note;
  }
  
  // ... (Remaining JavaScript code)
  





  
  function openNoteDetailsModal(note) {
    const noteDetailsModal = document.getElementById('noteDetailsModal');
    const editedNoteInput = document.getElementById('edited-note');
  
    // Set the current note text in the modal
    editedNoteInput.value = note.textContent;
  
    // Save the reference to the current note in the modal
    noteDetailsModal.currentNote = note;
  
    // Show the note details modal
    noteDetailsModal.style.display = 'block';
  }






  
  function closeNoteDetailsModal() {
    const noteDetailsModal = document.getElementById('noteDetailsModal');
    const editedNoteInput = document.getElementById('edited-note');
  
    // Clear the current note reference in the modal
    noteDetailsModal.currentNote = null;
  
    // Clear the edited note input
    editedNoteInput.value = '';
  
    // Hide the note details modal
    noteDetailsModal.style.display = 'none';
  }
  
  function saveEditedNote() {
    const noteDetailsModal = document.getElementById('noteDetailsModal');
    const editedNoteInput = document.getElementById('edited-note');
  
    const currentNote = noteDetailsModal.currentNote;
  
    if (currentNote) {
      // Update the note text with the edited content
      currentNote.textContent = editedNoteInput.value;
  
      // Close the note details modal
      closeNoteDetailsModal();
  
      // Save notes to local storage after editing
      saveNotes();
    }
  }
  
  function deleteNote() {
    const noteDetailsModal = document.getElementById('noteDetailsModal');
    const currentNote = noteDetailsModal.currentNote;
  
    if (currentNote) {
      // Find and remove the note element from the notes container
      const notesContainer = document.getElementById('notes-container');
      notesContainer.removeChild(currentNote);
  
      // Close the note details modal
      closeNoteDetailsModal();
  
      // Save notes to local storage after deletion
      saveNotes();
    }
  }
  



  function openConfirmDialog() {
    const confirmDialog = document.getElementById('confirmDialog');
    confirmDialog.style.display = 'block';
  }
  
  // Function to close confirm dialog
  function closeConfirmDialog() {
    const confirmDialog = document.getElementById('confirmDialog');
    confirmDialog.style.display = 'none';
  }
  
  // Function to confirm deletion and delete note
  function confirmDeletion() {
    closeConfirmDialog();
    deleteNote();
  }



  if ("serviceWorker" in navigator) {
    window.addEventListener("load", function() {
      navigator.serviceWorker
        .register("/serviceWorker.js")
        .then(res => console.log("service worker registered"))
        .catch(err => console.log("service worker not registered", err))
    })
  }