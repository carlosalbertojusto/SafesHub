import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class OtherLayersExample extends Component<{}> {
  render() {
    return (
      <div>
            Contato
            <Link to="/">home</Link>
        </div>
    )
  }
}