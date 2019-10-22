import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { mapDispatchToProps, mapStateToProps } from './state-dispatch-map';
import formatDate from './utils/format-date';
import '../../../styles/search-history.css';

class SearchHistory extends React.Component {
    static propTypes = {
        items: PropTypes.arrayOf(PropTypes.shape({
            name: PropTypes.string,
            createdDate: PropTypes.string
        })),
        removeItem: PropTypes.func,
        clearHistory: PropTypes.func,
    };

    constructor(props) {
        super(props);

        this.onClearHistoryHandler = this.onClearHistoryHandler.bind(this);
        this.onClearHistoryHandler = this.onClearHistoryHandler.bind(this);
    }

    render() {
        const { items } = this.props;

        return (
            <section className='search-history'>
                <header>
                    <h1>Search history</h1>
                    {Boolean(items.length) && (
                        <div className='clear-history-btn-wrap'>
                            <button
                                onClick={this.onClearHistoryHandler}
                                className='clear-history-btn'
                            >Clear search history</button>
                            <button
                                onClick={this.onClearHistoryHandler}
                                className='clear-history-btn-small'
                            >Clear</button>
                        </div>
                    )}
                </header>
                <footer>
                    {items.length ? (
                        <ul>
                            {
                                items.map((item, idx) => (
                                    <li key={idx} className='saved-item'>
                                        <span className='name'>{item.name}</span>
                                        <div className='right-wrap'>
                                            <span className='created-date'>{formatDate(item.createdDate)}</span>
                                            <button
                                                className='remove-btn'
                                                onClick={() => this.onRemoveItemHandler(item.createdDate)}
                                            />
                                        </div>
                                    </li>
                                ))
                            }
                        </ul>
                    ) : (
                            <p className='empty-list-message'>There are no saved items yet</p>
                        )
                    }
                </footer>
            </section>
        );
    }

    // handlers

    onClearHistoryHandler() {
        this.props.clearHistory();
    }

    onRemoveItemHandler(createdDate) {
        this.props.removeItem(createdDate);
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchHistory);
