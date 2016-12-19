import React, { Component } from 'react';
import { Link } from 'react-router'

class AlbumView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      albumData: []
    }
  }

  componentDidMount() {
      this.getAlbums();
  }

  getAlbumsApi() {
       var header = {
                method: 'GET',
                headers: {
                    "Authorization": 'Basic dGVzdEBsaWZlcmF5LmNvbTplc3BsQDEyMw==',
                },
       };
      return fetch("/api/jsonws/EternusCRUD-portlet.album/get-albums", header)
      .then(response => {
        if (response.status >= 200 && response.status < 300) {
           return response.json();
        }
      })
  }

  getAlbums() {
    var rec = this;
    this.getAlbumsApi().then(function (response) {
      rec.setState({ albumData: response });
    });
  };


  deleteAlbumApi(id) {
    var url = "/api/jsonws/EternusCRUD-portlet.album/delete-album/album-id/" + id;
    var header = {
      method: 'DELETE',
      headers: {
        "Authorization": 'Basic dGVzdEBsaWZlcmF5LmNvbTplc3BsQDEyMw==',
      },
    };
    return fetch(url, header)
      .then(response => {
        response;
      });
  }

  onDelete(id, current) {
    current.deleteAlbumApi(id).then(function (response) {
      current.getAlbums();
    });
  };

  renderTable() {
    var rec = this.state;
    var current = this;
    return (
      <table className="table table-hover">
        <thead>
          <tr>
            <th> Sr.No </th>
            <th> Album Name </th>
            <th> Release Year </th>
            <th> Artist ID </th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {          
            rec.albumData.map(function (row, i) {
              return (
                <tr key={i}>
                  <td> {i + 1} </td>
                  <td><Link to={"albumAddEdit/" + row.albumId}> {row.albumName}</Link> </td>
                  <td> {row.releaseYear} </td>
                  <td> {row.artistId} </td>
                  <td>
                    <button type="button" className="btn btn-default btn-sm" onClick={ current.onDelete.bind(null, row.albumId, current) }>
                    <span class="glyphicon glyphicon- remove"></span> Delete
                    </button>
                  </td>
                </tr>
              );
            })
          }
        </tbody>
      </table>
    );
  }


  render() {
    return (
      <div>
        <div className="row">
          <div className="col-xs-11">          
            <Link  to={'/albumAddEdit'}><button id="add" className="btn btn-success pull-right"><span className="glyphicon glyphicon-plus-sign"></span> Add</button></Link>
          </div>
        </div>
        <div className="row">
          <div className="col-md-1">
          </div>
          <div className="col-md-10">
            {this.renderTable() }
          </div>
          <div className="col-md-1">
          </div>
        </div>
      </div>
    );
  }
}


export default AlbumView;