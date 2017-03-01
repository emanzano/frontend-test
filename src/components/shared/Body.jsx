import React from 'react';

export default function List(props) {
    return (
        <div className="body">
            {
                props.isItemDetail ? (
                    <div className="body--list">
                        {
                            props.items.map((item, index) => {
                                <div className="body--list--item">

                                </div>
                            })
                        }
                    </div>
                ) :(
                    <div className="body--item">

                    </div>
                )
            }
        </div>
    );
}

List.propTypes = {
    onClickItem: React.PropTypes.func.isRequired,
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
    }))
}