import { removeItem, clear } from "../../actions/search-history";

export const mapStateToProps = state => ({
    items: state.searchHistory.items
});

export const mapDispatchToProps = dispatch => ({
    removeItem: id => dispatch(removeItem(id)),
    clearHistory: () => dispatch(clear()),
});