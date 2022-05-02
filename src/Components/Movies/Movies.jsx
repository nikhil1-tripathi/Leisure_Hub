import { axios } from "axios"
import { useState } from 'react';
import { useEffect } from 'react';
import "./Movies.css"
import { SingleContent } from './../SingleContent/SingleContent';
import { PaginationPage } from './../Pagination/Pagination';
import { Genres } from './../Genres/Genres';
import { useGenres } from './../hooks/useGenres';

export const Movies = () => {

    const [moviesContent, setMoviesContent] = useState([]);
    const [page, setPage] = useState(1)
    const [numOfPages, setNumOfPages] = useState()
    const [selectedGenres, setSelectedGenres] = useState([]);
    const [genres, setGenres] = useState([]);
    const genreforURL = useGenres(selectedGenres)

    const fetchMovieData = () => {

        fetch(`https://api.themoviedb.org/3/discover/movie?api_key=55d3986357276fb32520164149dcabe4&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=${genreforURL}`)
            .then(res => res.json())
            .then(json => setMoviesContent(json.results))
            .then(json => setNumOfPages(json.total_pages))


    }


    useEffect(() => {
        window.scroll(0, 0)
        fetchMovieData();
    }, [page, genreforURL])
    console.log(moviesContent)


    return (
        <>
            <div>
                <span className="pagetitle">MOVIE</span>
                <Genres
                    type="movie"
                    setSelectedGenres={setSelectedGenres}
                    selectedGenres={selectedGenres}
                    genres={genres}
                    setGenres={setGenres}
                    setPage={setPage}
                />
                <div className="movie">
                    {moviesContent && moviesContent.map((c) =>
                        <SingleContent
                            key={c.id}
                            id={c.id}
                            poster={c.poster_path}
                            title={c.title || c.name}
                            date={c.first_air_date || c.release_date}
                            media_type="movie"
                            vote_average={c.vote_average}
                        />
                    )}
                </div>

                <PaginationPage setPage={setPage} numOfPages={numOfPages} />



            </div>

        </>
    );
};