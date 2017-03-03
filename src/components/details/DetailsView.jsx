import React from 'react';

import Header from '../shared/Header.jsx';
import Body from '../shared/Body.jsx';
import Breadcrum from '../shared/Breadcrum.jsx';

export default function DetailsView(props){
    return(
        <div className="container">
            <Header query={props.query} onSearch={props.onSearch}/>
            {
                props.categories.lentgh > 0 ? (<Breadcrum items={props.categories}/>) : null
            }
            {
                props.items.length > 0 ? (<Body item={props.item} isItemDetail={true}/>) : null
            }
        </div>
    );
}

DetailsView.propTypes = {
    query: React.PropTypes.string,
    categories: React.PropTypes.arrayOf(React.PropTypes.string),
    onSearch: React.PropTypes.func.isRequired,
    item: React.PropTypes.shape({
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
        sold_quantity: React.PropTypes.number.isRequired,
        description: React.PropTypes.string.isRequired
    })
};