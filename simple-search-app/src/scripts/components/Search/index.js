import React, { createRef } from 'react';
import { connect } from 'react-redux';
import debounce from 'lodash.debounce';
import PropTypes from 'prop-types';

import { mapDispatchToProps, mapStateToProps } from './state-dispatch-map';
import Loader from '../Loader';
import Highlighted from './Highlighted';
import '../../../styles/search.css';

const RESULTS_HEIGHT_FETCHING = 29;
const RESULTS_HEIGHT = 160;
const RESULTS_HEIGHT_DEFAULT = 0;
const DEBOUNCE_VALUE = 500;
const ANIMATION_DURATION = 500;

class Search extends React.Component {
    static propTypes = {
        queryString: PropTypes.string,
        isFetching: PropTypes.bool,
        isActive: PropTypes.bool,
        items: PropTypes.arrayOf(PropTypes.string),

        toggleActive: PropTypes.func,
        toggleFetching: PropTypes.func,
        makeSearch: PropTypes.func,
        setItems: PropTypes.func,
        saveSearchItem: PropTypes.func,
        setQueryString: PropTypes.func,
    };

    constructor(props) {
        super(props);

        this.sectionRef = createRef();
        this.timer = null;
        this.state = {
            animating: false
        };

        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.onClearClickHandler = this.onClearClickHandler.bind(this);
    }

    componentDidMount() {
        document.addEventListener('mousedown', this.handleClickOutsideForm)
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClickOutsideForm);

        if (this.timer) {
            clearTimeout(this.timer);
            this.timer = null;
        }
    }

    render() {
        const { queryString } = this.props;

        return (
            <section
              ref={this.sectionRef}
              className={`search-section ${this.state.animating ? 'animating' : ''}`}
            >
                <header>
                    <form role='search' >
                        <fieldset>
                            <label htmlFor='query'>
                                <div className='search-input'>
                                    <input
                                        type='search'
                                        name='query'
                                        id='query'
                                        placeholder='Type to search the movie...'
                                        maxLength='200'
                                        value={queryString}
                                        autoComplete='off'

                                        onKeyDown={this.onSearchKeyDown}
                                        onChange={this.onChangeHandler}
                                    />
                                    <button
                                        value=''
                                        className={`clear-btn ${queryString.length ? 'visible' : '' }`}
                                        onClick={this.onClearClickHandler}
                                    />
                                </div>
                            </label>
                        </fieldset>
                    </form>
                </header>
                <footer
                    className={`search-result-wrap ${this.isSearchResultVisible() ? 'visible' : ''}`}
                    style={{ height: this.calculateSearchResultHeight() }}
                >
                    {this.renderSearchResult()}
                </footer>
            </section>
        )
    }

    // handlers

    onClearClickHandler(e) {
        e.preventDefault();
        this.resetSearch();
    }

    onSearchKeyDown(e) {
        if (e.key === 'Enter') {
            e.preventDefault()
        }
    }

    onSearchItemClickHandler(item) {
        const { saveSearchItem, setQueryString, toggleActive, setItems } = this.props;

        saveSearchItem({
            name: item,
            createdDate: (new Date()).toISOString()
        });
        setQueryString(item);
        setItems([]);
        toggleActive(false);
    }

    onChangeHandler(evt) {
        const val = evt.target.value;

        this.props.setQueryString(val);

        if (val) {
            this.props.toggleActive(true);
            this.props.toggleFetching(true);
            this.makeSearch(val);
        }
        else {
            this.performEmptyInputAnimation();
            this.resetSearch();
        }
    }

    handleClickOutsideForm = (evt) => {
        if (this.sectionRef && !this.sectionRef.current.contains(evt.target)) {
            this.props.setItems([]);
            this.props.toggleActive(false);
        }
    };

    // methods

    performEmptyInputAnimation() {
        this.setState({ animating: true });
        this.timer = setTimeout(() => {
            this.setState({ animating: false });
            this.timer = null;
        }, ANIMATION_DURATION);
    }

    makeSearch = debounce(value => {
        this.props.makeSearch(value);
    }, DEBOUNCE_VALUE);

    resetSearch() {
        this.props.setQueryString('');
        this.props.setItems([]);
        this.props.toggleActive(false);
    }

    calculateSearchResultHeight() {
        const {
            isActive,
            isFetching,
            queryString,
            items
        } = this.props;

        if (
            isActive && (
                isFetching ||
                (
                    queryString &&
                    !items.length
                )
            )
        ) {
            return RESULTS_HEIGHT_FETCHING;
        }

        if (isActive && items.length) {
            return RESULTS_HEIGHT;
        }

        return RESULTS_HEIGHT_DEFAULT;
    }

    isSearchResultVisible() {
        const {
            isActive,
            queryString,
            isFetching,
            items
        } = this.props;

        return isActive && (
            isFetching ||
            items.length ||
            (
                !items.length &&
                queryString
            )
        );
    }

    renderSearchResult() {
        const {
            isFetching,
            items,
            queryString
        } = this.props;

        if (isFetching) {
            return <Loader />;
        }

        if (items.length) {
            return (
                <ul>
                    {items.map((item, idx) => (
                        <li key={idx} className='search-item'>
                          <button onClick={() => this.onSearchItemClickHandler(item)}>
                            {Highlighted(item, queryString)}
                          </button>
                        </li>
                    ))}
                </ul>
            )
        }

        if (!items.length && queryString) {
            return <span className='empty-result'>No items were found</span>;
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Search);
