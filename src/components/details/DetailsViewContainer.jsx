import React from 'react';
import {connect} from 'react-redux';

import {getItem} from '../../store/actions/items.js';

import DetailsView from './DetailsView.jsx';

class DetailsViewContainerComponent extends React.Component {

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
    }

    componentWillMount() {
        const { dispatch, gettingItemSuccess } = this.props;

        const { router: { params } } = this.context;

        if(params != null && Object.keys(params).length > 0 && params.id != null && !gettingItemSuccess){
            dispatch(getItem(params.id));
        }
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
        }
    }

    render() {
        const { item, categories } = this.props;
        const { query } = this.state;
        const { onSearch, handleOnChange } = this;

        return (
            <DetailsView item={item} onSearch={onSearch} handleOnChange={handleOnChange} categories={categories} query={query}/>
        );
    }
}

const mapStateToProps = (state) => {
  return { 
      item: state.item,
      categories: state.categories,
      query: state.query,
      gettingItemSuccess: state.gettingItemSuccess
    }
}

const DetailsViewContainer = connect(mapStateToProps)(DetailsViewContainerComponent);

export default DetailsViewContainer;