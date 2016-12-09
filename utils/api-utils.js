import Utils from '../utils/utils';
//import _ from 'lodash';

var ApiUtils = {
    getAlbums: function () {
       // let assignmentURL = Utils.getAlbums();
        return fetch("", { method: 'GET'})
            .then(response => {
                // if (response.status >= 200 && response.status < 300) {
                //     return response.json();
                // } else {
                //     const error = new Error(response.statusText);
                // }
                response.json()
            })
            .then(function (res) {
                return res;
            })
            .catch(error => { console.log('request failed', error); });
    }
};

module.exports = ApiUtils;