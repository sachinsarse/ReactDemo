import _ from 'lodash';
import React, { Component } from 'react';
import { browserHistory } from 'react-router'

class AlbumAddEditView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            albumForm: {
                id: '',
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
        if (!this.state.albumForm.id) {
            var header = {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                "body": JSON.stringify(albumForm),
            };

            return fetch("http://localhost:4000/api/album", header)
                .then(response => {
                    response;
                })
        } else {
            var header = {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                "body": JSON.stringify(albumForm),
            };

            return fetch("http://localhost:4000/api/album", header)
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
        var url = "http://localhost:4000/api/album/" + id;
        return fetch(url, { method: 'GET' })
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
        if (!this.state.albumForm.id) {
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
            <div className="container container-padding">
                <div className="row">
                    <div className="col-md-2">
                    </div>
                    <div className="col-md-8">
                        {this.renderForm() }
                    </div>
                    <div className="col-md-2">
                    </div>
                </div>
            </div>
        );
    }
}

export default AlbumAddEditView;