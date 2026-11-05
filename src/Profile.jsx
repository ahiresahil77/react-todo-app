function MovieInfo(name,year){
    return(
        <>
        <ul>
        {MovieInfo.map((info)=>(
           <li key={info.name}>
            title:{info.name}, year:{info.year}</li>
        ))}
</ul>
        </>
    )
}
export default MovieInfo;