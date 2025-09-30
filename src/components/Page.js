// 1. PAGE BASE CLASS
// File: src/components/Page.js
import React, { Component } from 'react';

class Page extends Component {
  constructor(props) {
    super(props);
    this.id = props.id || '';
    this.title = props.title || '';
    this.content = props.content || '';
  }

  // Base method for rendering content
  renderContent() {
    return <div>{this.content}</div>;
  }

  // Navigation method
  navigateTo(targetId) {
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start' 
      });
    }
  }

  render() {
    return this.renderContent();
  }
}

export default Page;