import React from 'react';

export default function ListItem(props) {
    return (
        <div className="item" onClick={() => props.onClickItem(props.item.id)}>
            <div className="item__image">
                <img src={props.item.picture} alt={`imagen ${props.item.title}`}/>
            </div>
            <div className="item__description">
                <h3 className="price">{`${props.item.price.currency} ${props.item.price.amount}`}
                    <span className="price__decimals">{props.item.price.decimals === 0 ? '' : props.item.price.decimals }</span>
                </h3>
                {
                    props.item.free_shipping ? 
                    (
                        <i className="item__description__free-shipping"></i>
                    ) : null
                }
                <p className="item__description__title">{props.item.title}</p>
            </div>
            <div className="item__extras">
                <span className="item__extras__location">{props.item.state}</span>
            </div>
        </div>
    );
}

ListItem.propTypes = {
    onClickItem: React.PropTypes.func.isRequired,
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
        state: React.PropTypes.bool.isRequired
    }).isRequired
}