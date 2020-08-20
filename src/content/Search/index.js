import React, { useEffect, useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faStar } from '@fortawesome/free-solid-svg-icons';

export const Search = props => {

    const [activeFilter, setActiveFilter] = useState('Movie');
    const [searchText, setSearchText] = useState('');
    const [responseMovies, setResponseMovies] = useState([]);

    let filters = ['Movie','TV'];

    let filterContent = filters.map(filter => {
        let filterClassName = 'search_bar_filter search_bar_filter_option'
        if (activeFilter === filter) {
            filterClassName += ' search_bar_filter_option_active'
        };
        return  <span className={filterClassName} key={filter} name={filter} onClick={e => setActiveFilter(e.currentTarget.getAttribute('name'))}>
                    <p className='content content_two'>{filter}</p>
                </span>
    });

    const handleSearch = () => {
        let filter = activeFilter === 'Movie' ? 'movie' : 'tv';
        fetch(`${process.env.REACT_APP_MOVIE_API}/${filter}?api_key=${process.env.REACT_APP_MOVIE_API_KEY}&query=${searchText}`)
        .then(res => {
            if (res.ok) {
                res.json()
                .then(result => {
                    let data = [];
                    result.results.forEach(result => {
                        if (result.poster_path !== null) {
                            data.push(result);
                        }
                    });
                    setResponseMovies(data);
                });
            };
        });
    };

    let results = responseMovies.map(movie => {
        let release_year = movie.release_date.substring(0, 4);
        return <SearchResult key={movie.id} poster={movie.poster_path} release_year={release_year} title={movie.title} tmdb_rating={movie.vote_average} />
    })

    return (
        <div className='page search'>
            <div className='search search_bar'>
                <input className='content content_one search_bar_input' onChange={e => setSearchText(e.target.value)} type='text' />
                <FontAwesomeIcon className='content_one' icon={faSearch} onClick={handleSearch} size='1x' />
                <div className='search_bar_filter'>
                    {filterContent}
                </div>
            </div>
            <div className='search search_results'>
                {results}
            </div>
        </div>
    )
};

const SearchResult = props => {
    return (
        <div className='search_result'>
            <img className='search_result_img' src={`http://image.tmdb.org/t/p/w500${props.poster}`} />
            <div className='search_result_detail'>
                <p className='content content_two'>{props.title}</p>
                <p className='content content_three'>{props.release_year}</p>
                <p className='content content_three'>{props.tmdb_rating} <FontAwesomeIcon icon={faStar} size='1x' /></p>
            </div>
        </div>
    )
}