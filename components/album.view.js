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
      return fetch("http://localhost:4000/api/album", { method: 'GET' })
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
    var url = "http://localhost:4000/api/album/" + id;
    return fetch(url, { method: 'DELETE'})
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
                  <td><Link to={"albumAddEdit/" + row.id}> {row.albumName}</Link> </td>
                  <td> {row.releaseYear} </td>
                  <td> {row.artistId} </td>
                  <td>
                    <button type="button" className="btn btn-default btn-sm" onClick={ current.onDelete.bind(null, row.id, current) }>
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
      <div className="container container-padding">
        <div className="row">
          <div className="col-xs-10">          
            <Link  to={'/albumAddEdit'}><button id="add" className="btn btn-success pull-right"><span className="glyphicon glyphicon-plus-sign"></span> Add</button></Link>
          </div>
        </div>
        <div className="row">
          <div className="col-md-2">
          </div>
          <div className="col-md-8">
            {this.renderTable() }
          </div>
          <div className="col-md-2">
          </div>
        </div>
      </div>
    );
  }
}


export default AlbumView;