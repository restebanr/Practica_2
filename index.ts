import express from "express"
import cors from "cors"
import axios from "axios"
import crypto from "crypto";

const app = express();
const port = 3000;
app.use(cors());
app.use(express.json());

type Book = {
    _id: string;
    title: string;
    author: string;
    pages: number;
    createdAt: string;
    updatedAt: string;
}

let books: Book[] = [
    { _id: crypto.randomUUID(),
     title: "Inazuma",
     author: "Alex",
     pages: 316,
     createdAt: new Date().toISOString(),
     updatedAt: new Date().toISOString() 
    },
    { _id: crypto.randomUUID(),
      title: "El planeta del tesoro",
      author: "YO",
      pages: 57,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString() }
]

app.listen(port, () => console.log(`Servidor en http://localhost:${port}`));

app.get("/", (req,res) => {
    res.send("Te has conectado correctamente a la API de libros");
});

// Mostrar todos los libros
app.get("/api/books", (req, res) => {
    res.status(200).json(books);
});

// Mostrar un libro por su _id
app.get("/api/books/:id", (req,res) => {
    const book = books.find(b => b._id === req.params.id);
    book ? res.json(book) : res.status(404).json({ message: "Libro no encontrado" });
});

// Crear un libro
app.post("/api/books", (req,res) => {
    const { title, author, pages } = req.body;

    if(typeof title !== "string") return res.status(400).send("Error: 'title' debe ser un texto");
    if(typeof author !== "string") return res.status(400).send("Error: 'author' debe ser un texto");
    if(typeof pages !== "number") return res.status(400).send("Error: 'pages' debe ser un número");

    const newBook: Book = {
        _id: crypto.randomUUID(),
        title,
        author,
        pages,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    };

    books.push(newBook);
    res.status(201).json(newBook);
});

// Actualizar un libro 
app.put("/api/books/:id", (req,res) => {
    const book = books.find(b => b._id === req.params.id);
    if(!book) return res.status(404).json({ message: "Libro no encontrado" });

    const { title, author, pages } = req.body;

    if(title !== undefined && typeof title !== "string") return res.status(400).send("Error: 'title' debe ser un texto");
    if(author !== undefined && typeof author !== "string") return res.status(400).send("Error: 'author' debe ser un texto");
    if(pages !== undefined && typeof pages !== "number") return res.status(400).send("Error: 'pages' debe ser un número");

    if(title) book.title = title;
    if(author) book.author = author;
    if(pages) book.pages = pages;
    book.updatedAt = new Date().toISOString();

    res.status(200).json(book);
});

// Eliminar un libro
app.delete("/api/books/:id", (req,res) => {
    const eliminado = books.find((elem) => elem._id === req.params.id);
    if(eliminado) {
        books = books.filter((n) => n._id !== req.params.id);
        res.status(200).json({ message: "Deleted successfully" });
    } else {
        res.status(404).send("Libro no encontrado");
    }
});



