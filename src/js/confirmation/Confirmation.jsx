import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {reset} from 'redux-form';
import {push} from 'connected-react-router';
import {resetSelected} from 'spot/spot-actions';
import Button from 'common/Button';
import Image from 'common/Image';

class Confirmation extends PureComponent {
    static propTypes = {
        form: PropTypes.object.isRequired,
        selectedSpot: PropTypes.object,
        pushTo: PropTypes.func.isRequired,
        resetSelected: PropTypes.func.isRequired,
        resetForm: PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);

        const {
            selectedSpot,
            pushTo
        } = props;

        // if you refresh on conirmation and there isn't a selectedSpot, make sure to go back to search and render nothing here
        if (!selectedSpot) {
            pushTo('/');
        }
    }

    _onPurchaseAnotherClick = evt => {
        const {
            pushTo,
            resetSelected,
            resetForm
        } = this.props;
        //clear selected spot
        resetSelected();
        //reset checkout form
        resetForm("checkout");
        //redirect to search
        pushTo('/');
    }

    render() {
        const {
            form,
            selectedSpot
        } = this.props;

        if (!selectedSpot) {
            return null;
        }

        return (
            <div className="Confirmation">
                <h1>Park it like its hot!</h1>
                <p>You successfully purchased parking at <strong>{selectedSpot.title}</strong> for <strong>${(selectedSpot.price / 100).toFixed(2)}</strong>.</p>
                <Image src={selectedSpot.image} />
                <p>We emailed a receipt to <a href={`mailto:${form.checkout.values.email}`}>{form.checkout.values.email}</a>.</p>
                <Button
                    color="primary"
                    onClick={this._onPurchaseAnotherClick}
                >
                    Purchase Another Spot!
                </Button>
            </div>
        );
    }
}

const mapStateToProps = state => {
    const {
        form,
        spot: {
            selected: selectedSpot
        }
    } = state;

    return {
        form,
        selectedSpot
    };
};

const mapDispatchToProps = {
    pushTo: push,
    resetSelected,
    resetForm:reset
};

export default connect(mapStateToProps, mapDispatchToProps)(Confirmation);
