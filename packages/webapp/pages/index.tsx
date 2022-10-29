import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import React, { useState } from 'react';
import {Button, Grid, Jumbotron,
  FormControl, FormGroup, ControlLabel,
  HelpBlock} from 'react-bootstrap';
  import Link from 'next/link'

function Home() {
  const [tempUsername, settempUsername] = React.useState(0);

  const handleChange =  (e: any): any => {
    this.setState({tempUsername: e.target.value});
  }

  function onSave () {
    window.localStorage.setItem('username', this.state.tempUsername);
    this.setState({username: this.state.tempUsername})
  }

  function logout () {
    window.localStorage.removeItem('username');
    this.setState({username: undefined})
  }

  if (username) {
    return (
      <div>
        <Grid>
          <br/>
          <Jumbotron>
            <h1>Hi! {username} <span role="img" aria-label="emoji">🤓</span></h1>
          </Jumbotron>
          <Link to="/place-order"><Button bsStyle="primary">Place new order</Button></Link>
          &nbsp; &nbsp;
          <Button bsStyle="danger" onClick={logout}>Logout</Button>
          <hr/>
          <Orders username={username} />
        </Grid>
        <div className="footerWrapper">
          <a href={'https://github.com/hasura/3factor-example'} target={'_blank'}>Source</a>
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <Grid>
          <br/>
          <FieldGroup
            id="formControlsText"
            type="text"
            label="Enter username"
            placeholder="username"
            onChange={onChange}
          />
          <Button bsStyle="primary" onClick={onClick}>Enter app</Button>
        </Grid>
        <div className="footerWrapper">
          <a href={'https://github.com/hasura/3factor-example'} target={'_blank'}>Source</a>
        </div>
      </div>
    );
  }
}
  




export default Home
