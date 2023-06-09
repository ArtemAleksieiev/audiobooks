import React from "react";
import { Link } from "react-router-dom";
import { books } from "./books";
import Book from "./Book";

function Home() {
  return (
    <>
      <section className="booklist">
        {books.map((book) => {
          return (
            <Link to={`/player/${book.tracks}`} key={book.id}>
              <Book {...book} />;
            </Link>
          );
        })}
      </section>
    </>
  );
}
export default Home;
