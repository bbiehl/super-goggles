// import React from 'react';
// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

import React, { Component } from 'react'
import { Container, Header, Segment, Button, Icon, Dimmer, Loader, Divider } from 'semantic-ui-react'


class App extends Component {
  constructor () {
    super()
    this.state = {}
    this.getBeers = this.getBeers.bind(this)
    this.getBeer = this.getBeer.bind(this)
  }

  componentDidMount () {
    this.getBeers()
  }

  fetch (endpoint) {
    return window.fetch(endpoint)
      .then(response => response.json())
      .catch(error => console.log(error))
  }

  getBeers () {
    this.fetch('/api/beers')
      .then(beers => {
        if (beers.length) {
          this.setState({beers: beers})
          this.getBeer(beers[0].id)
        } else {
          this.setState({beers: []})
        }
      })
  }

  getBeer (id) {
    this.fetch(`/api/beers/${id}`)
      .then(beer => this.setState({beer: beer}))
  }

  render () {
    let {beers, beer} = this.state
    return beers
      ? <Container text>
        <Header as='h2' icon textAlign='center' color='teal'>
          <Icon name='unordered list' circular />
          <Header.Content>
            Our Beers
          </Header.Content>
        </Header>
        <Divider hidden section />
        {beers && beers.length
          ? <Button.Group color='teal' fluid widths={beers.length}>
            {Object.keys(beers).map((key) => {
              return <Button active={beer && beer.id === beers[key].id} fluid key={key} onClick={() => this.getBeer(beers[key].id)}>
                {beers[key].title}
              </Button>
            })}
          </Button.Group>
          : <Container textAlign='center'>No beers found.</Container>
        }
        <Divider section />
        {beer &&
          <Container>
            <Header as='h2'>{beer.name}</Header>
            {beer.abv && <p>ABV: {beer.abv}</p>}
            {beer.ibu && <p>IBU: {beer.ibu}</p>}
            {beer.description && <p>{beer.description}</p>}
          </Container>
        }
      </Container>
      : <Container text>
        <Dimmer active inverted>
          <Loader content='Loading' />
        </Dimmer>
      </Container>
  }
}

export default App
