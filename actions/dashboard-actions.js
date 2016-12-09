import * as types from './action-types';
import ApiUtils from '../utils/api-utils';

export function getAlbums() {
    return function (dispatch) {
        ApiUtils.getAlbums().then(function (response) {
            var album = [];
             dispatch({
                type: types.GET_ALBUMS,
                value: response
            });
        });
    };
}
