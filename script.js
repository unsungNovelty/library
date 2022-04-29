openForm();
closeForm();
let myLibrary = [];
let form = document.getElementById('the-form');

function openForm() {
    const addABookElement = document.getElementById('open-form');
    addABookElement.addEventListener('click', () => {
        document.getElementById('the-form').reset();
        form.style.display = 'grid';
        document.querySelector('.container').style.filter = 'blur(5px)';
    });
}

function closeForm() {
    const closeElement = document.getElementById('close-form');
    closeElement.addEventListener('click', () => {
        form.style.display = 'none';
        document.getElementById('my-article').style.filter = 'blur(0px)';
        document.getElementById('the-form').reset();
    });
}

class Book {
    constructor(title, author, pages, readStatus) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.readStatus = readStatus;
    }
}


function pushFormDataToArray() {
    let submitButton = document.getElementById('submit-book');
    
    submitButton.addEventListener('click', () => {
        const theTitle = document.getElementById('title').value;
        const theAuthor = document.getElementById('author').value;
        const thePages = document.getElementById('pages').value;
        let theReadStatus = document.getElementById('read-status').value;
        const gridLayout = document.getElementById('grid-layout');
        
        if (theTitle === '' || theAuthor === '' || thePages === '') {
            window.alert('Fill all the input fields');
        } else {
            myLibrary.push(new Book(theTitle, theAuthor, thePages, theReadStatus));
            console.log(myLibrary);
            
            let newObject = document.createElement('div');
            newObject.innerText = theTitle + '\n'+ ' by ' + '\n' + '\n' + theAuthor;
            newObject.className = 'tile';
            gridLayout.append(newObject);

            let readStatusObject = document.createElement('div');
            readStatusObject.innerText = theReadStatus;
            readStatusObject.className = 'smallBtns';
            newObject.append(readStatusObject);
            readStatusObject.ondblclick = () => {
                if (theReadStatus === 'read') {
                    theReadStatus = 'unread';
                    readStatusObject.innerText = theReadStatus;
                    console.log(readStatusObject + ' and ' + theReadStatus);
                } else {
                    theReadStatus = 'read';
                    readStatusObject.innerText = theReadStatus;
                }
            };
            
            form.style.display = 'none';
            document.getElementById('my-article').style.filter = 'blur(0px)';
        }

        const totalBooks = document.getElementById('total-books');
        const booksRead = document.getElementById('books-read');
        const booksNotRead = document.getElementById('books-not-read');
        const pagesRead = document.getElementById('pages-read');
        const totalPages = document.getElementById('total-pages');
        const completionPercent = document.getElementById('completion-percent');
        
        if (myLibrary.length > 0) {
           totalBooks.innerText = 'Total books: ' + (myLibrary.length);

            let readBooks = 0;
            let numberOfPagesRead = 0;
            for (let i in myLibrary) {
                if (myLibrary[i].readStatus === 'read') {
                    readBooks++;
                    numberOfPagesRead += parseInt(myLibrary[i].pages);
                }
            }
            booksRead.innerText = 'Books read: ' + readBooks;
            pagesRead.innerText = 'Pages read: ' + numberOfPagesRead;

            let notRead = 0;
            for(let i in myLibrary) {
                if(myLibrary[i].theReadStatus === 'unread') {
                    notRead++;
                }
            }
            booksNotRead.innerText = 'Books not read: ' + notRead;
            
            let totalPagesInBooks = 0;
            for(let i in myLibrary) {
                totalPagesInBooks += parseInt(myLibrary[i].pages);
            }
            totalPages.innerText = 'Total pages: ' + totalPagesInBooks;

            let completedPercent = parseFloat((parseInt(readBooks) / parseInt(myLibrary.length)) * 100);
            completionPercent.innerText = 'Completion %: ' + completedPercent + '%'; 
        
        
        }    
    });
}

function updatingTheDB() {
    console.log('My library is' + myLibrary);
}

pushFormDataToArray();
