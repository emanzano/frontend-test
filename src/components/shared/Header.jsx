import React from 'react';

export default function Header(props) {
    return (
        <div className="header">
            <div className="header__logo"></div>
            <form className="header__form">
                <input className="header__form__input" name="searchQuery" type="text" value={props.query} onKeyPress={props.onSearch}/>
                <button className="header__form__submit" type="submit" onClick={props.onSearch}>LUPA</button>
            </form>
        </div>
    );
}

Header.propTypes = {
    query: React.PropTypes.string,
    onSearch: React.PropTypes.func.isRequired
}

Header.defaultProps = {
    query: 'Nunca dejes de buscar'
}