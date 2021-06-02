import React, { Component } from 'react';
import { Container } from 'reactstrap';
import { HeaderMenu } from '../SharedServices/Header/HeaderMenu';
import { Footer } from '../SharedServices/Footer/Footer';
export class Layout extends Component {
  render() {
    return (
      <div>
        <HeaderMenu />
        <Footer />
        <Container>
          {this.props.children}
        </Container>
      </div>
    );
  }
}