import React from 'react';
import './Search.css';
import axios from 'axios';
import Loader from './loader.gif';
import { result } from 'lodash';
import concert from './Concert.mp4';
import zIndex from '@material-ui/core/styles/zIndex';
// /import PageNavigation from './PageNavigation';

class Search extends React.Component {

	constructor( props ) {
		super( props );

		this.state = {
			query: '',
			results: {},
            image_url:'',
			loading: false,
			message: '',
			totalResults: 0,
			totalPages: 0,
			currentPageNo: 0,
		};

		this.cancel = '';
	}


	/**
	 * Get the Total Pages count.
	 *
	 * @param total
	 * @param denominator Count of results per page
	 * @return {number}
	 */
	getPageCount = ( total, denominator ) => {
		const divisible	= 0 === total % denominator;
		const valueToBeAdded = divisible ? 0 : 1;
		return Math.floor( total/denominator ) + valueToBeAdded;
	};

	/**
	 * Fetch the search results and update the state with the result.
	 * Also cancels the previous query before making the new one.
	 *
	 * @param {int} updatedPageNo Updated Page No.
	 * @param {String} query Search Query.
	 *
	 */
	fetchSearchResults = ( updatedPageNo = '', query ) => {
//        fetch('https://rest.bandsintown.com/artists/Skrillex?app_id=0c23be812d95f8b66d01d1db46e8a11e')

      // console.log(axios.get('https://rest.bandsintown.com/artists/Skrillex?app_id=0c23be812d95f8b66d01d1db46e8a11e'))
       //console.log(PromiseResult.data);
		const pageNumber = updatedPageNo ? `&page=${updatedPageNo}` : '';
		//const searchUrl = `https://pixabay.com/api/?key=PASTE_YOUR_API_KEY_HERE&q=${query}${pageNumber}`;
        const searchUrl = `https://rest.bandsintown.com/artists/${query}?app_id=0c23be812d95f8b66d01d1db46e8a11e`;
		//const searchUrl = `https://rest.bandsintown.com/artists/s/?app_id=0c23be812d95f8b66d01d1db46e8a11e`;
        //console.log(searchUrl);
        //query = 'Skrillex'
        //axios.fetchSearchResults('https://rest.bandsintown.com/artists/Adele?app_id=0c23be812d95f8b66d01d1db46e8a11e';
		if( this.cancel ) {
			this.cancel.cancel();
		}

		this.cancel = axios.CancelToken.source();
        //const promise = axios.get(searchUrl)
        //console.log(promise)
        axios.get( searchUrl, {
			cancelToken: this.cancel.token
		} )
			.then( res => {
               // console.log(res.data.thumb_url)
				const total = res.data.total;
				const totalPagesCount = this.getPageCount( total, 20 );
				const resultNotFoundMsg = ''
                    this.setState( {
					results: res.data,
					message: resultNotFoundMsg,
					totalResults: total,
					totalPages: totalPagesCount,
					currentPageNo: updatedPageNo,
					loading: false
				}
                )
			} 
            )
			.catch( error => {
				if ( axios.isCancel(error) || error ) {
					this.setState({
						loading: false,
						message: ''
					})
				}
			} )
	};

	handleOnInputChange = ( Event ) => {
		const query = Event.target.value;
		if ( ! query ) {
			this.setState( { query, results: {}, message: '', totalPages: 0, totalResults: 0 } );
		} else {
			this.setState( { query, loading: true, message: '' }, () => {
				this.fetchSearchResults( 1, query );
			} );
		}
	};

	/**
	 * Fetch results according to the prev or next page requests.
	 *
	 * @param {String} type 'prev' or 'next'
	 */
	handlePageClick = ( type ) => {
		Event.preventDefault();
		const updatePageNo = 'prev' === type
			? this.state.currentPageNo - 1
			: this.state.currentPageNo + 1;

		if( ! this.state.loading  ) {
			this.setState( { loading: true, message: '' }, () => {
				this.fetchSearchResults( updatePageNo, this.state.query );
			} );
		}
	};

	renderSearchResults = () =>{ 
        
		const { results } = this.state;
		console.log(results)
		if (results.facebook_page_url == '')
			results.facebook_page_url='N/A'
        if ( Object.keys( results ).length && results.length!=0 ) {
			return (
				<div className="results-container">
					<div>
							<a key={ results.id } href={ results.previewURL } className="result-item">
							<div className="image-wrapper">
									<img className="image" src={ results.thumb_url } alt={`${results.username} image`}/>
								</div>
								<div className="text-data">
									<h6 className="artistname">Artist Name: {results.name}</h6>
									<h6 className="artistsocial">Artist Social Handle:  
										<a className="sociallink" href={ results.facebook_page_url}										>
											{results.facebook_page_url}
										</a> 
									</h6>
								</div>
							</a>
					</div>
							<div className="Eventsdata">
									<h6 className="count">Upcoming Events: {results.upcoming_event_count} </h6>
										<a className="moreinfo" href={results.url}>
											More Info								
										</a> 
							</div>
				</div>
			)
			
		}
		//console.log(`https://rest.bandsintown.com/artists/${results.name}/events/?app_id=0c23be812d95f8b66d01d1db46e8a11e`)
		//axios.get(`https://rest.bandsintown.com/artists/${results.name}/events/?app_id=0c23be812d95f8b66d01d1db46e8a11e`, {
		//	cancelToken: this.cancel.token
			
		//} )
	};

	render() {
		const { query, loading, message, currentPageNo, totalPages } = this.state;

		const showPrevLink = 1 < currentPageNo;
		const showNextLink = totalPages > currentPageNo;

		return (
			
			<div className="containerpre">
				<video className='videoTag' autoPlay loop muted
				style={
					{
						position:"absolute",
						width: "100%",
						left: "50%",
						top: "50%",
						height: "100%",
						objectFit: "cover",
						transform: "translate(-50%,-50%)",
						zIndex: -1


					}
				}>
    <source src={concert} type='video/mp4' />
</video>
				<h3>Artasia</h3>
				<div className="inputbox">
			<label className="search-label" htmlFor="search-input">
				<input
					className="search-input"
					type="text"
					name="query"
					value={ query }
					id="search-input"
					placeholder="Search..."
					onChange={this.handleOnInputChange}
				/>
			</label>
			</div>

		

			{/*	Result*/}
			{ this.renderSearchResults() }


			</div>
		)
	}
}

export default Search