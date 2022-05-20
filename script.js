

const addBook  = document.querySelector('.click-area');  // select a click area
addBook.addEventListener('click', showModal);          // show a modal when clicked on the click area
// pop up modal function
function showModal() {
    
    modalContainer.classList.add('c-modal-active');

}
// remove add Button when hover over the click area
const addButton = document.querySelector('.click-area > h4');
addBook.addEventListener('mouseover', function(){

    addButton.remove();

});


const modalContainer = document.querySelector(".c-modal");   // select modal container
const closeButton = document.querySelector('#close').addEventListener('click', closeModal); // select close button and close modal when click it
const submitButton = document.querySelector("#submit");
submitButton.addEventListener('click', closeModal);  // when click on submit button, close the modal
submitButton.addEventListener('click', function(event) {

   event.preventDefault();
   addBookToLibrary();

 });

//close modal function 
function closeModal() {

    modalContainer.classList.remove('c-modal-active');

}


// constructor function for Books
class Book {

    constructor(title, author, pages, isRead) {

    this.title = title;
    this.author = author;
    this.pages  = pages;
    this.isRead = isRead;

    }

}
// function Book(title, author, pages, isRead) {

//     this.title = title;
//     this.author = author;
//     this.pages  = pages;
//     this.isRead = isRead;

// }

let myLibrary = [];  // myLibrary, empty array

 // Add book in the myLibrary array
 function addBookToLibrary() {
    
     const form = document.querySelector('form');
     let userInputs = Array.from(document.querySelectorAll('input'));

     let book  = new Book();
     console.log(book);
     userInputs.forEach( userInput => {


       if(userInput.name == "book name") {

         book.title = userInput.value;

        }

       else if (userInput.name == "author name") {

        book.author = userInput.value;

     }

     else if (userInput.name == "page number") {

          book.pages = userInput.value;

      }   
    });

    myLibrary.push(book);
    updateLocalStorage();
    displayBook();
    form.reset();

};


// display display function
function displayBook() {

    const container = document.querySelector('.c-book');
    const books = document.querySelectorAll('.c-book-item');
    books.forEach(book => container.removeChild(book));
    for(let i = 0; i < myLibrary.length; i++) {

        createBook(myLibrary[i]);

    }

}

// create Book on the page
function createBook(index) {
       
        //displaying the last object from the array
        // New Div created
        const container = document.querySelector('.c-book');
        const  newDiv = document.createElement('div');
        newDiv.style.padding = "32px";
        newDiv.style.position = "relative";
        newDiv.classList.add('c-book-item');
        container.appendChild(newDiv);

            // New heading for title
        const bookTitle = document.createElement('h5');
        bookTitle.textContent = `${index.title.toUpperCase()}`;
        newDiv.appendChild(bookTitle);

            // New heading for Author
        const authorName = document.createElement('h6');
        authorName.style.marginTop = "8px";
        authorName.textContent = `${index.author.toUpperCase()}`;
        newDiv.appendChild(authorName);

            // New heading for page
        const howManyPages = document.createElement('p');
        howManyPages.style.marginTop = "42px";
        howManyPages.textContent = `${index.pages.toUpperCase()} Pages`;
        newDiv.appendChild(howManyPages);

             // New Remove Button
        const removeButton = document.createElement('a');
        removeButton.classList.add('remove');
        removeButton.style.cursor = "pointer";
        removeButton.style.border = "none";
        removeButton.style.position = "absolute";
        removeButton.style.bottom = "32px";
        removeButton.style.right = "32px";
        removeButton.textContent = "Remove";
        newDiv.appendChild(removeButton);

            // Read Button
        const readCheck = document.getElementById('read');
        const newRead = document.createElement('a');
        newRead.style.cursor = "pointer";
        newRead.style.border = "none";
        newRead.style.position = "absolute";
        newRead.style.bottom = "32px";
            
        if(readCheck.checked) 

            {
              
        newRead.textContent = "Reading";
        newDiv.appendChild(newRead);

            }

            else 

            {

        newRead.textContent = "Finished";
        newDiv.appendChild(newRead);

            }

        newRead.addEventListener('click', function() {

            if(newRead.textContent == "Reading") {

                newRead.textContent = "Finished";

                }

          else {
                    
                    newRead.textContent = "Reading";

                }
            

               });

         }




// Remove Book from the library
function removeBook() {

    document.querySelector('.c-book').addEventListener('click', function(e){
        if(e.target.classList.contains('remove')) { 
        const currentChild = e.target.parentNode.parentNode.childNodes;
        const count = currentChild.length;
       // const childIndex = e.target.parentNode.parentNode.children.indexOf(currentChild);
       // const currentTarget = e.target.parentNode;
       for ( let i = 0; i < count - 1; ++i) {
        if (e.target.parentNode === currentChild[i]) {
          console.log(i);
          myLibrary.splice((i - 1), 1);
          break;              
   
    }
}
    e.target.parentNode.remove();   
    updateLocalStorage();
    }
   });
    
}
removeBook();




// Local Storage Initiation
function updateLocalStorage() {

    localStorage.setItem('myLibrary', JSON.stringify(myLibrary));

}

function restore() {
    if (!localStorage.myLibrary) {
        displayBook();
    } 
    
    else {
        let objects = JSON.parse(localStorage.getItem('myLibrary')); // gets information from local storage to use in below loop to create DOM/display
        myLibrary = objects;
        displayBook();
    }
}
restore();



