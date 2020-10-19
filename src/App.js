import React from 'react';
import { Grid } from '@material-ui/core';
import Youtube from './api/Youtube';
import    SearchBar from './Components/SearchBar';
import    VideoDetail from './Components/VideoDetail';
import    VideoList from './Components/VideoList';




class App extends React.Component {
   state = {
     videos: [],
     selectedVideo: null,
   }

   

   onVideoSelect = (video) => {
     this.setState({ selectedVideo: video})
   }

  handleSubmit = async (searchTerm) => {
   const respnse = await Youtube.get('search', {
      params: {
        part: 'snippet',
        maxResults: 5,
        key: 'AIzaSyB9Qfx7W-O_o7gEoGUCPBV4lurvTt9cAf0',
        q: searchTerm,
    }
  });
    this.setState({ videos: respnse.data.items, selectedVideo: respnse.data.items[0] });
  }
  render () {
    const { selectedVideo, videos } = this.state;
    return(
      <Grid justify="center" container spacing={10}>
        <Grid item xs={11}>
          <Grid container spacing={10}>
            <Grid item xs={12}>
            <SearchBar onFormSubmit={this.handleSubmit}/>
            </Grid>
            <Grid item xs={8}>
             <VideoDetail video={selectedVideo}/>
            </Grid>
            <Grid item xs={4}>
              <VideoList videos={videos} onVideoSelect={this.onVideoSelect}/>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    )
  }


  
}

export default App;
