import React, { Component } from 'react';
import axios from 'axios';
import './main.css';

class Main extends Component {

  constructor() {
    super();
    this.state = {
      search: '',
      pics: []
    }
  }

  getPics(search) {
    axios.request({
      method: 'GET',
      url: `https://pixabay.com/api/?key=6719675-c46c12359be6521fcf903fe33&q=${search}&image_type=photo`,
    }).then(response => {
      this.setState({pics: response.data.hits}, () => {
      })
    }).catch(err => console.log(err));
  }

  onSubmit(e) {
    const search = this.refs.search.value;
    e.preventDefault();

    this.getPics(search);
  }



  render() {
    const pics = this.state.pics;
    const showPics = pics.map((showPic, index) => {
      return(
        <div key={index}>
          <div className="col-sm-4">
            <div className="card">
              <div className="card-block">
                <div className="img-block">
                  <img src={showPic.webformatURL} alt="" className="img-thumbnail" />
                </div>
                <h3 className="card-title">{showPic.tags}</h3>
                <p className="card-text">Views: {showPic.views}</p>
                <a href={showPic.webformatURL} className="btn btn-primary" target="_blank">View Full Screen</a>
              </div>
            </div>
          </div>
        </div>
      )
    }
  );

    return (
      <div>
      <div className="container">
        <div className="jumbotron jumbotron-fluid">
          <h1 className="display-3">Pixabay Api</h1>
          <p className="lead">This react application fecthes pictures from pixabay api</p>
          <hr className="my-4" />
          <h3 className="text-center">Secrch For Images</h3>
          <form onSubmit={this.onSubmit.bind(this)}>
            <input type="text" className="form-control mb-3" name="search" ref="search" />
            <br/>
            <div className="col-12 text-center">
              <button type="submit" className="btn btn-primary text-center">Search</button>
            </div>
          </form>
        </div>
      </div>
      <div className="row">
        {showPics}
      </div>
      </div>
    );
  }
}

export default Main;