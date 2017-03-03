import React from 'react';
import ListItem from './ListItem.jsx';
import DetailItem from './DetailItem.jsx';

export default function Body(props) {
    return (
        <div className="body">
            {
                props.isItemDetail ? (
                    <DetailItem item={item}/>
                ) :(
                    <div className="body__list">
                        {
                            props.items && props.items.map((item, index) => {
                                return (<ListItem key={item.id} item={item} onClickItem={props.onClickItem}/>);
                            })
                        }
                    </div>
                )
            }
        </div>
    );
}

Body.propTypes = {
    onClickItem: React.PropTypes.func,
    isItemDetail: React.PropTypes.bool.isRequired,
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
    })),
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
}