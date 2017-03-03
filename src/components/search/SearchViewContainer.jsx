import React from 'react';
import {connect} from 'react-redux';

import {getItems} from '../../store/actions/items.js';

import SearchView from './SearchView.jsx';

class SearchViewContainerComponent extends React.Component {

    static contextTypes = {
        router: React.PropTypes.object.isRequired
    };

    constructor(props, context) {
        super(props, context);
        this.state = {
            query: this.props.query
        };

        this.onSearch = this.onSearch.bind(this);
        this.handleOnChange = this.handleOnChange.bind(this);
        this.onClickItem = this.onClickItem.bind(this);
    }

    componentWillMount() {
        const { dispatch, gettingItemsSuccess } = this.props;

        const { router: { location: { query } } } = this.context;

        if(query != null && Object.keys(query).length > 0 && query.search != null && !gettingItemsSuccess){
            dispatch(getItems(query.search));
        }
    }

    componentWillUpdate(){
        const { dispatch, gettingItemsSuccess } = this.props;

        const { router: { location: { query } } } = this.context;

        /*if(query != null && Object.keys(query).length > 0 && query.search != null && !gettingItemsSuccess){
            dispatch(getItems(query.search));
        }*/
    }

    handleOnChange(event) {
        this.setState({query: event.target.value});
    }

    onSearch(event){
        const { query } = this.state;
        const { dispatch } = this.props;
        // Detect "click" or "enter" to submit the query
        if ( (event.type === 'keypress' && event.key === 'Enter') || event.type === 'click'){
            event.preventDefault();
            this.context.router.replace(`/items?search=${query}`);
            dispatch(getItems(query));
        }
    }

    onClickItem(itemId){
        console.log(itemId);
        debugger;
    }

    render() {
        const { items, categories } = this.props;
        const { query } = this.state;
        const { onSearch, onClickItem, handleOnChange } = this;

        return (
            <SearchView items={items} query={query} onSearch={onSearch} categories={categories} onClickItem={onClickItem} handleOnChange={handleOnChange}/>
        );
    }
}

const mapStateToProps = (state) => {
  return { 
      items: state.itemsList,
      categories: state.categories,
      query: state.query,
      gettingItemsSuccess: state.gettingItemsSuccess
    }
}

const SearchViewContainer = connect(mapStateToProps)(SearchViewContainerComponent);

export default SearchViewContainer;