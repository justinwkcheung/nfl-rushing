import React from "react";

const App = (props) => {
  return (
    <div>
      <h1>NFL Rushing Stats</h1>
      {props.players.map((player, i) => {
        console.log(player);
        return (
          <div key={i}>
            {player.first_name} {player.last_name}
          </div>
        )
      })}
    </div>
  )
}

export default App;