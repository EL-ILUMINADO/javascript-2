// Select the notes container and create button elements
const notesContainer = document.querySelector('.notes-container');
const createBtn = document.querySelector('.btn');

// Initialize an empty array to store the notes
let notes = [];

// Function to display notes from local storage
function showNotes() {
  notesContainer.innerHTML = localStorage.getItem('notes') || '';
  // Update the notes array with the current notes
  notes = Array.from(notesContainer.querySelectorAll('.input-box'));
}

// Call showNotes to display any existing notes
showNotes();

// Function to update local storage with the current notes
function updateStorage() {
  localStorage.setItem('notes', notesContainer.innerHTML);
}

// Add event listener to the create button
createBtn.addEventListener('click', () => {
  // Create a new note element with a delete icon
  const inputBox = document.createElement('p');
  const img = document.createElement('img');
  inputBox.className = 'input-box';
  inputBox.setAttribute('contenteditable', 'true');
  img.src = 'images/delete.png';
  inputBox.appendChild(img);
  notesContainer.appendChild(inputBox);
  // Update the notes array with the new note
  notes.push(inputBox);
  // Add a keyup event listener to the new note
  inputBox.addEventListener('keyup', updateStorage);
});

// Add event listener to the notes container
notesContainer.addEventListener('click', (e) => {
  if (e.target.tagName === 'IMG') {
    // Remove the note when the delete icon is clicked
    e.target.parentElement.remove();
    updateStorage();
  }
});

// Add event listener to the document for the Enter key press
document.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    document.execCommand('insertLineBreak');
    event.preventDefault();
  }
});