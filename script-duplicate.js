



// poping up modal when clicking on the container
// closing when clicking on the cross button
const bookAdd  = document.querySelector('.click-area'); 
const modalContainer = document.querySelector(".c-modal");
const closeButton = document.querySelector('#close');
const submitButton = document.querySelector("#submit");

  
// Add book in the myLibrary array
class Book {
    constructor(title, author, pages, read) {
        this.title = form.title.value; 
        this.author = form.author.value; 
        this.pages = form.pages.value + 'pg'; 
        this.read = form.read.checked; 
    }
}

let myLibrary = [];
let newBook;

//display Book on the page
function addBookToLibrary(event) {
    event.preventDefault();
    popUpForm.style.display = 'none';

    newBook = new Book(title, author, pages,read); 
    myLibrary.push(newBook); 
    updateLocalStorage();  //saves updated array in local storage
    render(); 
    form.reset();
}

// Display Book on the page
//Creates book visual in browser
function render() {
    const display = document.getElementById('c-book');
    const books = document.querySelectorAll('.c-book-item');
    books.forEach(book => display.removeChild(book));
   
    for (let i=0; i<myLibrary.length; i++){
        createBook(myLibrary[i]);
    }
}

function createBook(index) {

        const container = document.querySelector('.c-book');
          // New Div created
          const  newDiv = document.createElement('div');
          newDiv.style.padding = "32px";
          newDiv.style.position = "relative";
          newDiv.classList.add('c-book-item');
          container.appendChild(newDiv);

          // New heading for title
          const bookTitle = document.createElement('h5');
          bookTitle.textContent = `${myLibrary[index].title}`;
          newDiv.appendChild(bookTitle);

          // New heading for Author
          const authorName = document.createElement('h6');
          authorName.style.marginTop = "8px";
          authorName.textContent = `${myLibrary[index].author}`;
          newDiv.appendChild(authorName);

          // New heading for page
          const howManyPages = document.createElement('p');
          howManyPages.style.marginTop = "42px";
          howManyPages.textContent = `${myLibrary[index].pages} Pages`;
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

           removeButton.addEventListener('click', () => {
            myLibrary.splice(myLibrary.indexOf(index),1);
            updateLocalStorage();
            render();
        });


          // Read Button
          const readCheck = document.getElementById('read');
          const newRead = document.createElement('a');
          newRead.style.cursor = "pointer";
          newRead.style.border = "none";
          newRead.style.position = "absolute";
          newRead.style.bottom = "32px";
          
          if(readCheck.checked) 

          {
            
          newRead.textContent = "Read";
          newDiv.appendChild(newRead);

          }

          else 

          {

          newRead.textContent = "Not Read";
          newDiv.appendChild(newRead);

          }

          newRead.addEventListener('click', function() {

              if(newRead.textContent == "Read") {

                  newRead.textContent = "Not Read";

              }

              else {
                  
                  newRead.textContent = "Read";

              }
              

             });

}
  



// Close the modal when user click on the cross icon
function openCloseForm(){

    bookAdd.addEventListener('click', function() {

        modalContainer.classList.add('c-modal-active');
             
    });
    
    closeButton.addEventListener('click', function() {
    
       modalContainer.classList.remove('c-modal-active');
    
    });

    submitButton.addEventListener('click', function(){

        modalContainer.classList.remove('c-modal-active');

    })
}
openCloseForm();


// Remove Book from the library
// function removeBook() {


//     document.querySelector('.c-book').addEventListener('click', function(e){

//         console.log(e.target);
//      if(e.target.classList.contains('remove')) { 
//         const currentChild = e.target.parentNode.parentNode.childNodes;
//         const count = currentChild.length;
//        // const childIndex = e.target.parentNode.parentNode.children.indexOf(currentChild);
//        // const currentTarget = e.target.parentNode;
//        for ( let i = 0; i < count - 1; ++i) {
//         if (e.target.parentNode === currentChild[i]) {
//           console.log(i);
//           myLibrary.splice((i - 1), 1);
//             break;              
   
//     }
// }
//     e.target.parentNode.remove();   
//     updateLocalStorage();
//     displayBook();
//     }
//    });
    
// }
// removeBook();




// removing add button 

function removeAddButton() {

    const addIcon = document.querySelector('.click-area > h4');
    bookAdd.addEventListener('mouseover', function(){

        addIcon.remove();

    })
}
removeAddButton();


function updateLocalStorage() {

    localStorage.setItem('myLibrary', JSON.stringify(myLibrary));
    render();

}

function checkLocalStorage() {

    if(localStorage.getItem("myLibrary") === null) {

        myLibrary = [];

    }
    
    else 

    {

    const booksFromStorage = JSON.parse(localStorage.getItem('myLibrary'));
    myLibrary = booksFromStorage;
    render();

    }

    }

