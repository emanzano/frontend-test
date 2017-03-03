import React from 'react';

import Header from '../shared/Header.jsx';
import Body from '../shared/Body.jsx';
import Breadcrum from '../shared/Breadcrum.jsx';

export default function SearchView(props){
    return(
        <div className="container">
            <Header query={props.query} onSearch={props.onSearch} handleOnChange={props.handleOnChange}/>
            <Breadcrum items={props.categories}/>
            <Body items={props.items} onClickItem={props.onClickItem} isItemDetail={false}/>
        </div>
    );
}

SearchView.propTypes = {
    query: React.PropTypes.string,
    categories: React.PropTypes.arrayOf(React.PropTypes.string),
    onSearch: React.PropTypes.func.isRequired,
    handleOnChange: React.PropTypes.func.isRequired,
    onClickItem: React.PropTypes.func.isRequired,
    items: React.PropTypes.arrayOf(React.PropTypes.shape({
        id: React.PropTypes.string.isRequired,
        title: React.PropTypes.string.isRequired,
        price: {
            currency: React.PropTypes.string.isRequired,
            amount: React.PropTypes.number.isRequired,
            decimals: React.PropTypes.number.isRequired
        },
        picture: React.PropTypes.string.isRequired,
        condition: React.PropTypes.string.isRequired,
        free_shipping: React.PropTypes.string.isRequired,
        state: React.PropTypes.bool.isRequired
    }))
};