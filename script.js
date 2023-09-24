document.addEventListener("DOMContentLoaded", function () {
	showBooks();
});

document.getElementById("search-form").addEventListener("submit", (e) => {
	e.preventDefault();
	const search = document.getElementById("search");
	const searchQuery = search.value.toLowerCase();
	filterBooks(searchQuery);
	search.value = "";
});

document.getElementById("book-form").addEventListener("submit", (e) => {
	e.preventDefault();
	addBook();
});

const addBook = () => {
	const title = document.getElementById("title").value;
	const author = document.getElementById("author").value;
	const year = document.getElementById("year").value;
	const isComplete = document.getElementById("isComplete").checked;

	const book = {
		id: +new Date(),
		title,
		author,
		year: parseInt(year),
		isComplete,
	};

	let books = getBooksFromStorage();
	books.push(book);
	localStorage.setItem("books", JSON.stringify(books));
	showBooks();
	clearForm();
};

const showBooks = () => {
	const unCompletedList = document.getElementById("unCompletedList");
	const completedList = document.getElementById("completedList");

	let books = getBooksFromStorage();

	let unCompletedBooks = books.filter((book) => !book.isComplete);
	let completedBooks = books.filter((book) => book.isComplete);

	unCompletedList.innerHTML = "";
	completedList.innerHTML = "";

	unCompletedBooks.forEach((book) => {
		const listItem = createBookListItem(book, false);
		unCompletedList.appendChild(listItem);
	});

	completedBooks.forEach((book) => {
		const listItem = createBookListItem(book, true);
		completedList.appendChild(listItem);
	});
};

const filterBooks = (query) => {
	const unCompletedList = document.getElementById("unCompletedList");
	const completedList = document.getElementById("completedList");

	let books = getBooksFromStorage();

	let unCompletedBooks = books.filter((book) => !book.isComplete);
	let completedBooks = books.filter((book) => book.isComplete);

	unCompletedBooks = unCompletedBooks.filter((book) =>
		book.title.toLowerCase().includes(query)
	);
	completedBooks = completedBooks.filter((book) =>
		book.title.toLowerCase().includes(query)
	);

	unCompletedList.innerHTML = "";
	completedList.innerHTML = "";

	unCompletedBooks.forEach((book) => {
		const listItem = createBookListItem(book, false);
		unCompletedList.appendChild(listItem);
	});

	completedBooks.forEach((book) => {
		const listItem = createBookListItem(book, true);
		completedList.appendChild(listItem);
	});
};

const createBookListItem = (book, isComplete) => {
	let ul = document.createElement("ul");
	ul.innerHTML = `<ul>
                        <li>Judul: ${book.title}</li>
                        <li>Penulis: ${book.author}</li>
                        <li>Tahun: ${book.year}</li>
                        <li>
                            <button onclick="moveBook(${book.id}, ${isComplete})">Pindah</button>
                            <button onclick="deleteBook(${book.id})" class="btn-delete">Hapus</button>
                        </li>
                    </ul>`;
	return ul;
};

const moveBook = (id, isComplete) => {
	let books = getBooksFromStorage();
	let index = books.findIndex((book) => book.id === id);

	if (index !== -1) {
		books[index].isComplete = !isComplete;
		localStorage.setItem("books", JSON.stringify(books));
		showBooks();
	}
};

const deleteBook = (id) => {
	let books = getBooksFromStorage();
	let index = books.findIndex((book) => book.id === id);
	let ques = confirm("Apakah anda benar ingin menghapus data ini?");

	if (ques) {
		if (index !== -1) {
			books.splice(index, 1);
			localStorage.setItem("books", JSON.stringify(books));
			showBooks();
		}
	}
};

const deleteAllBook = () => {
	let ques = confirm("Anda yakin akan menghapus seluruh data ini?");
	if (ques) {
		localStorage.clear();
		showBooks();
	}
};

const getBooksFromStorage = () => {
	let books = localStorage.getItem("books");
	if (books) {
		return JSON.parse(books);
	} else {
		return [];
	}
};

const clearForm = () => {
	document.getElementById("title").value = "";
	document.getElementById("author").value = "";
	document.getElementById("year").value = "";
	document.getElementById("isComplete").checked = false;
};
