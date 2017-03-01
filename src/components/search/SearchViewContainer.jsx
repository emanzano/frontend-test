import React from 'react';
import {connect} from 'react-redux';

import {getItems} from '../../store/actions/items.js';

import SearchView from './SearchView.jsx';

class SearchViewContainerComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            query: this.props.query
        };

        this.onSearch = this.onSearch.bind(this);
        this.onClickItem = this.onClickItem.bind(this);
    }

    componentWillMount() {
        const {params, dispatch, gettingItemsSuccess} = this.props;

        if(params.query != null && params.query.length && !gettingItemsSuccess){
            dispatch(getItems(query));
        }
    }

    onSearch(e){
        console.log(e);
        debugger;
    }

    onClickItem(e){
        console.log(e);
        debugger;
    }

    render() {
        const { items, categories } = this.props;
        const { query } = this.state;
        const { onSearch, onClickItem } = this;

        return (
            <SearchView items={items} query={query} onSearch={onSearch} categories={categories} onClickItem={onClickItem}/>
        );
    }
}

SearchViewComponent.contextTypes = {
    router: React.PropTypes.func.isRequired
};

const mapStateToProps = (state) => {
  return { 
      items: state.items.itemsList,
      categories: state.items.categories,
      query: state.items.query,
      gettingItemsSuccess: state.items.gettingItemsSuccess
    }
}

const SearchViewContainer = connect(mapStateToProps)(SearchViewContainerComponent);

export default SearchViewContainer;