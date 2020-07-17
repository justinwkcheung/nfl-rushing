// Run this example by adding <%= javascript_pack_tag 'hello_react' %> to the head of your layout file,
// like app/views/layouts/application.html.erb. All it does is render <div>Hello React</div> at the bottom
// of the page.

import React from 'react'
import ReactDOM from 'react-dom'
import App from "../components/App";

document.addEventListener('DOMContentLoaded', () => {
  const node = document.getElementById('players_data')
  const data = JSON.parse(node.getAttribute('data'))

  ReactDOM.render(
    <App players={data} />,
    document.body.appendChild(document.createElement('div')),
  )
})
