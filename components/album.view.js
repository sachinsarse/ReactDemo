import _ from 'lodash';
import React, { Component } from 'react';
import { Link } from 'react-router'
import { Router } from 'react-router';

class EstimateView extends Component {
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
    //  var creds = {
    //     username: 'test@liferay.com',
    //     password : 'test'
    //  }
    //   const hash = new Buffer(`${creds.username}:${creds.password}`).toString('base64')
    //  var rec = {
    //     method: 'GET',
    //     headers: {
    //       'Content-Type': 'application/json',
    //       'Authorization': 'Basic ${hash}'
    //     }
    //  };

    return fetch("http://localhost:4000/api/album", { method: 'GET', mode: 'no-cors' })
      .then(response => {
        response.json();
      })
      .then(function (res) {
        return res;
      })
      .catch(error => { console.log('request failed', error); });
  }

  getAlbums() {
    var rec = this;
    this.getAlbumsApi().then(function (response) {
      rec.setState({ albumData: response });
    });
  };


  deleteAlbumApi(id) {
    var url = "http://localhost:4000/api/album/" + id;
    return fetch(url, { method: 'DELETE', mode: 'no-cors' })
      .then(response => {
        response.json();
      })
      .then(function (res) {
        return res;
      })
      .catch(error => { console.log('request failed', error); });
  }

  onDelete(id, current) {
    current.deleteAlbumApi(id).then(function (response) {
      this.getAlbums();
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
                      <span class="glyphicon glyphicon-remove"></span> Delete
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
            <button id="add" className="btn btn-success pull-right"><span className="glyphicon glyphicon-plus-sign"></span><Link to="/albumAddEdit">Add </Link></button>
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


export default EstimateView;