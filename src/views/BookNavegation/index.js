import React, {useState} from 'react';
import BookList from '../../components/BooksList';
import ChapterList from '../../components/ChapterList';
import {Container, Title} from './styles';

const BookNavegation = () => {
  const [book, setBook] = useState('');
  const [chapter, setChapter] = useState(0);
  const bookSelect = bookChild => {
    setBook(bookChild);
  };
  const chapterSelect = chapterChild => {
    setChapter(chapterChild);
  };
  return (
    <Container>
      <Title>Livro</Title>
      {book === '' ? (
        <BookList book={bookSelect} />
      ) : (
        <ChapterList
          chapterLength={book.length}
          selectChapter={chapterSelect}
        />
      )}
    </Container>
  );
};

export default BookNavegation;
