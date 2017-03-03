import React from 'react';

export default function Breadcrum(props) {
    return (
        <ol className="breadcrumb">
            {
                props.items && props.items.map((item, index) => {
                    return (
                        <li key={`${item}-${index}`} className={`breadcrum__item${props.items.length === (index+1)? ' breadcrum__item-active' : ''}`}>
                            {item}
                        </li>
                    ) ;
                })
            }
        </ol>
    );
}

Breadcrum.propTypes = {
    items: React.PropTypes.arrayOf(React.PropTypes.string)
}