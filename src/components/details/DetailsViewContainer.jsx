import React from 'react';
import {connect} from 'react-redux';

import {getItem} from '../../store/actions/items.js';

import DetailsView from './DetailsView.jsx';

class DetailsViewContainerComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            query: this.props.query
        };

        this.onSearch = this.onSearch.bind(this);
    }

    componentWillMount() {
        const {params, dispatch, gettingItemSuccess} = this.props;

        if(params.query != null && params.query.length && !gettingItemSuccess){
            dispatch(getItems(query));
        }
    }

    onSearch(e){
        // Detect "click" or "enter" to submit the query
        console.log(e);
        debugger;
    }

    render() {
        const { item, categories } = this.props;
        const { query } = this.state;
        const { onSearch } = this;

        return (
            <DetailsView item={item} query={query} onSearch={onSearch} categories={categories}/>
        );
    }
}

const mapStateToProps = (state) => {
  return { 
      categories: state.categories,
      gettingItemSuccess: state.gettingItemSuccess,
      item: state.item,
      query: state.query
    }
}

const DetailsViewContainer = connect(mapStateToProps)(DetailsViewContainerComponent);

export default DetailsViewContainer;