import React from 'react';

export default function Breadcrum(props) {
    return (
        <ol class="breadcrumb">
            {
                props.items.map((item, index) => {
                    return (
                        <li key={`${item}-${index}`} className={`breadcrum--item${props.items.length === (index+1)? ' breadcrum--item__active' : ''}`}>
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