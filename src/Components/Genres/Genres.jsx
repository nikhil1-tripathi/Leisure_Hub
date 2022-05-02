import { Chip } from '@mui/material';
import { useEffect } from 'react';
export const Genres = ({
    type, selectedGenres, setSelectedGenres,
    genres, setPage, setGenres
}) => {

    const handleAdd = (genre) => {
        setSelectedGenres([...selectedGenres, genre])
        setGenres(genres.filter((g) => g.id !== genre.id))
        setPage(1);
    }


    const handleRemove = (genre) => {

        setSelectedGenres(selectedGenres.filter((remove) => remove.id !== genre.id))
        setGenres([...genres, genre])
        setPage(1);
    }

    const fetchGenres = () => {
        fetch(`https://api.themoviedb.org/3/genre/${type}/list?api_key=55d3986357276fb32520164149dcabe4&language=en-US`)
            .then(res => res.json())
            .then(json => setGenres(json.genres))
    }
    // console.log(genres);
    useEffect(() => {
        fetchGenres()
        return () => {
            setGenres({});
        }
    }, [])
    return (
        <>
            <div style={{ padding: "10px", marginTop: "10px" }}>
                {selectedGenres.map((genre) => (
                    <Chip label={genre.name} style={{ margin: 3, backgroundColor: "black" }} size="small"
                        color='primary' clickable key={genre.id} onDelete={() => handleRemove(genre)}

                    />
                ))}
                {genres.map((genre) => (
                    <Chip label={genre.name} style={{ margin: 3, backgroundColor: "black", color: "white", fontStyle: "italic" }} size="small" clickable key={genre.id}
                        onClick={() => handleAdd(genre)}
                    />
                ))}
            </div>
        </>
    )
}