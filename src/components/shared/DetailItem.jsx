import React from 'react';

export default function DetailItem(props) {
    return (
        <div className="item">
            <div className="item__highlight">
                <div className="item__highlight__image">
                    <img src={props.item.picture} alt={`imagen ${props.item.title}`}/>
                </div>
                <div className="buy-info">
                    <span className="buy-info__condition-amount">{`${props.item.condition} - ${props.item.sold_quantity} vendidos`}</span>
                    <h3 className="buy-info__item-title">{props.item.title}</h3>
                    <h1 className="price">{`${props.item.price.currency} ${props.item.price.amount}`}
                        <span className="price__decimals">{props.item.price.decimals}</span>
                    </h1>
                    <button type="button" className="buy-info__buy-button">Comprar</button>
                </div>
            </div>
            <div className="item__description">
                <h1 className="item__description__title">{props.item.title}</h1>
                <div
                    className="item__description__text"
                    dangerouslySetInnerHTML={{
                    __html: props.item.description
                }}></div>
            </div>
        </div>
    );
}

DetailItem.propTypes = {
    item: React
        .PropTypes
        .shape({
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
        .isRequired
}