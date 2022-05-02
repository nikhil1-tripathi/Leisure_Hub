



export const useGenres = (selectedGenres) => {
    if (selectedGenres.length < 1) return "";

    const genreId = selectedGenres.map((e) => e.id)
    return genreId.reduce((acc, curr) => acc + "," + curr)

}