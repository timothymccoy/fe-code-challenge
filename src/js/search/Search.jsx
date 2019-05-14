import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {push} from 'connected-react-router';
import {updateSelected, resetSelected} from 'spot/spot-actions';
import SpotList from './spot-list/SpotList';
import SpotDetails from './spot-details/SpotDetails';

const Search = ({
    selectedSpot,
    spots,
    setSpot,
    resetSpot,
    pushTo
}) => {

    return (
        <div className="Search">
            <SpotList
                spots={spots}
                selectedSpot={selectedSpot}
                setSpot={setSpot}
            />
            <div className="Search-content">
                <SpotDetails push={pushTo} display={selectedSpot == null ? false : true} postHideAction={resetSpot} selectedSpot={selectedSpot}/>
            </div>
        </div>
    );
};

Search.propTypes = {
    selectedSpot: PropTypes.object,
    spots: PropTypes.arrayOf(PropTypes.object).isRequired,
    setSpot: PropTypes.func.isRequired,
    resetSpot: PropTypes.func.isRequired
};

const mapStateToProps = state => {
    const {
        spot: {
            selected: selectedSpot
        }
    } = state;

    return {
        selectedSpot
    };
};

const mapDispatchToProps = {
    setSpot: updateSelected,
    resetSpot: resetSelected,
    pushTo:push
};

export default connect(mapStateToProps, mapDispatchToProps)(Search);
