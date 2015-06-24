/* Task Description */
/* 
 *	Create a module for working with books
 *	The module must provide the following functionalities:
 *	Add a new book to category
 *	Each book has unique title, author and ISBN
 *	It must return the newly created book with assigned ID
 *	If the category is missing, it must be automatically created
 *	List all books
 *	Books are sorted by ID
 *	This can be done by author, by category or all
 *	List all categories
 *	Categories are sorted by ID
 *	Each book/catagory has a unique identifier (ID) that is a number greater than or equal to 1
 *	When adding a book/category, the ID is generated automatically
 *	Add validation everywhere, where possible
 *	Book title and category name must be between 2 and 100 characters, including letters, digits and special characters ('!', ',', '.', etc)
 *	Author is any non-empty string
 *	Unique params are Book title and Book ISBN
 *	Book ISBN is an unique code that contains either 10 or 13 digits
 *	If something is not valid - throw Error
 */
function solve() {
    var library = (function () {
        var books = [];
        var categories = [];

        function listBooks() {
            var filterObject = arguments[0];
            books = books.sort(function (firstBook, secondBook) {
                return firstBook.ID - secondBook.ID;
            });

            if (filterObject) {
                books = books.filter(function (book) {
                    return book.author === filterObject.author || book.category === filterObject.category;
                });
            }

            return books;

        }

        function isValid(book) {

            if (book.title.length < 2 || book.title.length > 100 ||
                book.category.length < 2 || book.category.length > 100 || !book.author || book.isbn.length !== 10 && book.isbn.length !== 13) {
                return false;
            }
            return true;
        }

        function isNotUnique(book) {
            var booksLength = books.length,
                i;
            for (i = 0; i < booksLength; i += 1) {
                if (books[i].title === book.title || books[i].isbn === book.isbn) {
                    return true;
                }
                return false;
            }
        }

        function addBook(book) {

            if (!(isValid(book))) {
                throw new Error();
            }
            if (isNotUnique(book)) {
                throw new Error();
            }
            var newCategory = {
                category: book.category,
                ID: categories.length + 1
            }
            if (!book.category) {

                categories.push(newCategory);
            }
            else if(categories && !categories.some(function(book){
                    return book.category === newCategory.category;
                })){
                categories.push(newCategory);
            }

            book.ID = books.length + 1;

            books.push(book);
            return book;

        }

        function listCategories() {
            categories.sort(function (firstBook, secondBook) {
                return firstBook.ID - secondBook.ID;
            })
            return categories.map(function (book) {
                return book.category;
            })

            return categories;
        }

        return {
            books: {
                list: listBooks,
                add: addBook
            },
            categories: {
                list: listCategories
            }
        };
    }());

    return library;
}
module.exports = solve;