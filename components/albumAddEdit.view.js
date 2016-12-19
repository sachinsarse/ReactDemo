import _ from 'lodash';
import React, { Component } from 'react';
import { browserHistory } from 'react-router'

class AlbumAddEditView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            albumForm: {
                albumId: '',
                albumName: '',
                releaseYear: '',
                artistId: ''
            },
        }
        this.onAddClick = this.onAddClick.bind(this);
        this.onBack = this.onBack.bind(this);
        this.handleAlbumNameChange = this.handleAlbumNameChange.bind(this);
        this.handleYearChange = this.handleYearChange.bind(this);
        this.handleArtistIdChange = this.handleArtistIdChange.bind(this);
    };

    componentDidMount() {
        if (this.props.params.id)
            this.getAlbum();
    }
    onBack() {
        browserHistory.goBack();
    }

    handleAlbumNameChange(e) {
        var albumForm = this.state.albumForm;
        albumForm.albumName = e.target.value;
        this.setState({ albumForm: albumForm });
    }

    handleYearChange(e) {
        var albumForm = this.state.albumForm;
        albumForm.releaseYear = e.target.value;
        this.setState({ albumForm: albumForm });
    }

    handleArtistIdChange(e) {
        var albumForm = this.state.albumForm;
        albumForm.artistId = e.target.value;
        this.setState({ albumForm: albumForm });
    }

    saveAlbumsApi(album) {
        var albumForm = this.state.albumForm;

        if (!this.state.albumForm.albumId) {
            var form = new FormData();
            form.append("artistId", albumForm.artistId);
            form.append("albumName", albumForm.albumName);
            form.append("releaseYear", albumForm.releaseYear);

            var header = {
                method: 'POST',
                headers: {
                    "Authorization": 'Basic dGVzdEBsaWZlcmF5LmNvbTplc3BsQDEyMw==',
                },
                body: form,
            };

            return fetch("/api/jsonws/EternusCRUD-portlet.album/create-album", header)
                .then(response => {
                    response;
                })
        } else {
            var form = new FormData();
            form.append("albumId", albumForm.albumId);
            form.append("artistId", albumForm.artistId);
            form.append("albumName", albumForm.albumName);
            form.append("releaseYear", albumForm.releaseYear);

            var header = {
                method: 'PUT',
                headers: {
                    "Authorization": 'Basic dGVzdEBsaWZlcmF5LmNvbTplc3BsQDEyMw==',
                },
                body: form,
            };

            return fetch("/api/jsonws/EternusCRUD-portlet.album/update-album", header)
                .then(response => {
                    response;
                })
        }
    }

    onAddClick() {
        var rec = this;
        this.saveAlbumsApi().then(function (response) {
            browserHistory.goBack();
        });
    };

    getAlbumApi(id) {
        var url = "/api/jsonws/EternusCRUD-portlet.album/get-album/album-id/" + id;
        var header = {
            method: 'GET',
            headers: {
                "Authorization": 'Basic dGVzdEBsaWZlcmF5LmNvbTplc3BsQDEyMw==',
            },
        };
        return fetch(url, header)
            .then(response => {
                return response.json();
            })
    }

    getAlbum() {
        var rec = this;
        this.getAlbumApi(this.props.params.id).then(function (response) {
            rec.setState({ albumForm: response });
        });
    };

    renderForm() {
        var buttons;
        if (!this.state.albumForm.albumId) {
            buttons = (
                <div className="col-xs-6">
                    <button id="add" className="btn btn-success pull-right" onClick={ this.onAddClick }><span className="glyphicon glyphicon-plus-sign"></span> Save</button>
                </div>
            )
        } else {
            buttons = (
                <div className="col-xs-6">
                    <button id="update" className="btn btn-success pull-right" onClick={ this.onAddClick }><span className="glyphicon glyphicon glyphicon-edit"></span> Update</button>
                </div>
            )
        }
        return (
            <div>
                <div className="form-group">
                    <label className="control-label" for="title">Album Name <span className="asterisk">*</span></label>
                    <input type="text" id="title" name="title" className="form-control" value={this.state.albumForm.albumName || ''}
                        onChange={this.handleAlbumNameChange} />
                </div>
                <div className="form-group">
                    <label className="control-label" for="year"> Release Year <span className="asterisk">*</span></label>
                    <input id="year" name="year" className="form-control" type="number"  className="form-control" value={this.state.albumForm.releaseYear || ''}
                        onChange={this.handleYearChange} />
                </div>
                <div className="form-group">
                    <label className="control-label" for="artistId"> Artist ID <span className="asterisk">*</span></label>
                    <input id="artistId" name="artistId" className="form-control" type="number" className="form-control" value={this.state.albumForm.artistId || ''}
                        onChange={this.handleArtistIdChange} />
                </div>

                <div className="row">
                    <div className="col-xs-6">
                        <button id="back" className="btn btn-success pull-left" onClick={ this.onBack }>Back</button>
                    </div>
                    { buttons }
                </div>
            </div>
        );
    }


    render() {
        return (
            <div>
                <div className="row">
                    <div className="col-md-1">
                    </div>
                    <div className="col-md-10">
                        {this.renderForm() }
                    </div>
                    <div className="col-md-1">
                    </div>
                </div>
            </div>
        );
    }
}

export default AlbumAddEditView;