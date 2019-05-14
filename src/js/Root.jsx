import React, {Component} from 'react';
import {Provider} from 'react-redux';
import {ConnectedRouter} from 'connected-react-router';
import axios from 'axios';
import createStore, {getHistory} from 'store/store';
import App from './App';
import Spinner from 'common/Spinner';

export default class Root extends Component {
    state = {
        isLoading: true,
        spots: []
    };

    componentDidMount() {
        this._loadSpots();
    }

    async _loadSpots() {
        try {
            const {
                data
            } = await axios.get('/spots');

            this.setState({
                isLoading: false,
                spots: data
            });
        } catch (error) {
            console.log('Error loading spot data: ', error); // eslint-disable-line no-console
        }
    }

    render() {
        const {
            isLoading,
            spots
        } = this.state;

        if (isLoading) {
            return (
                <Spinner>Loading...</Spinner>
            );
        }

        return (
            <div className="Root">
                <Provider store={createStore()}>
                    <ConnectedRouter history={getHistory()}>
                        <App spots={spots} />
                    </ConnectedRouter>
                </Provider>
            </div>
        );
    }
}
