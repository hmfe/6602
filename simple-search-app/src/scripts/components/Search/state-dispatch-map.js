import {
    toggleActive,
    makeSearch,
    setQueryString,
    setItems,
    toggleFetching
} from "../../actions/search";
import { addItem } from "../../actions/search-history";

export const mapStateToProps = state => {
    const {
        queryString,
        isFetching,
        isActive,
        items,
    } = state.search;

    return {
        queryString,
        isFetching,
        isActive,
        items
    };
};

export const mapDispatchToProps = dispatch => ({
    toggleActive: flag => dispatch(toggleActive(flag)),
    toggleFetching: flag => dispatch(toggleFetching(flag)),
    setQueryString: val => dispatch(setQueryString(val)),
    makeSearch: val => dispatch(makeSearch(val)),
    setItems: items => dispatch(setItems(items)),
    saveSearchItem: item => dispatch(addItem(item)),
});