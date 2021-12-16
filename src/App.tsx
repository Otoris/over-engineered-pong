import React, { useRef } from "react";

import Paddle from "./Paddle";
import Ball from "./Ball";
import FpsCounter from "./FpsCounter";

import { GameStateContext } from "./GameStateContext";

import useAnimationFrame from "./hooks/useAnimationFrame";

import "./App.css";
import Arena from "./Arena";

export interface IBallState {
  ballX: number;
  ballY: number;
  ballDX: number;
  ballDY: number;
}

function App() {
  const arena = useRef<HTMLDivElement>(null);
  const pong = useRef<HTMLDivElement>(null);
  const [gameState, setGameState] = React.useState("ready");
  const [ballState, setBallState] = React.useState({
    ballX: 0,
    ballY: 0,
    ballDX: Math.random() > 0.5 ? 1 : -1,
    ballDY: Math.random(),
    // ballSpeed: 0,
    // collision: false,
  });

  const ballWidth = 20,
    ballHeight = 20;

  // const checkCollision = (paddle: RefObject<HTMLDivElement>) => {
  //     if (paddle.current &&
  //       (ballState.ballX > paddle.current.getBoundingClientRect().x + paddle.current.getBoundingClientRect().width || paddle.current.getBoundingClientRect().x > ballState.ballX + ballWidth)
  //     ) {
  //       //console.log("checking collision", ballState.ballX, player.current.getBoundingClientRect().x + player.current.getBoundingClientRect().width);
  //       return false;
  //     }

  //     if (paddle.current &&
  //       (ballState.ballY > paddle.current.getBoundingClientRect().y + paddle.current.getBoundingClientRect().height || paddle.current.getBoundingClientRect().x + paddle.current.getBoundingClientRect().y > ballState.ballY + ballHeight)
  //     ) {
  //       console.log("no collision", ballState.ballY, paddle.current.getBoundingClientRect().y + paddle.current.getBoundingClientRect().height);

  //       return false;
  //     }
  //     console.log("collision");
  //     return true;
  //   }

  useAnimationFrame((dt) => {


    if (pong.current && gameState === "playing") {
      //   if (checkCollision(player)) {
      //     setBallState({
      //       ...ballState,
      //       ballX: Math.floor(ballState.ballX + ballState.ballDX * dt) + player.current?.getBoundingClientRect().x + 5,
      //       ballY: Math.floor(ballState.ballY + ballState.ballDY * dt),
      //       ballDX: -ballState.ballDX * 1.03,
      //       ballDY: ballState.ballDY < 0 ? -getRandomInt(10, 150) : getRandomInt(10, 150),
      //       collision: true
      //     });
      //   } else if (checkCollision(opponent)) {
      //     setBallState({
      //       ...ballState,
      //       ballX: Math.floor(ballState.ballX + ballState.ballDX * dt) + opponent.current?.getBoundingClientRect().x - 5,
      //       ballY: Math.floor(ballState.ballY + ballState.ballDY * dt),
      //       ballDX: ballState.ballDX * .02,
      //       ballDY: ballState.ballDY < 0 ? -getRandomInt(10, 150) : getRandomInt(10, 150),
      //       collision: true
      //     });
      if (ballState.ballY < 0) {
        setBallState({
          ...ballState,
          ballY: 0,
          ballDY: -ballState.ballDY,
        });
      } else if (
        arena.current &&
        ballState.ballY > arena.current.offsetHeight - ballHeight
      ) {
        setBallState({
          ...ballState,
          ballY: arena.current.offsetHeight - ballHeight,
          ballDY: -ballState.ballDY,
        });
      } else {
        setBallState({
          ...ballState,
          ballX: Math.floor(ballState.ballX + ballState.ballDX * dt),
          ballY: Math.floor(ballState.ballY + ballState.ballDY * dt),
        });
      }
    }

    // if (opponent.current && pong.current) {
    //   if (
    //     pong.current.offsetTop > opponent.current.offsetTop &&
    //     pong.current.offsetTop <
    //       opponent.current.offsetTop + opponent.current.offsetHeight / 2
    //   ) {
    //   } else {
    //     opponent.current.style.top = `calc(${
    //       opponent.current.offsetTop < pong.current.offsetTop
    //         ? Math.floor(opponent.current.offsetTop + dt * 0.2)
    //         : Math.floor(opponent.current.offsetTop - dt * 0.2)
    //     }px)`;
    //   }
    // }
  });

  return (
    <GameStateContext.Provider value={{ gameState, setGameState }}>
      <Arena>
        <FpsCounter />
        <Paddle owner="player" width={ballHeight} height={ballWidth * 3} />
        <Paddle owner="ai" width={ballHeight} height={ballWidth * 3} />
        <Ball ballState={ballState} setBallState={setBallState} width={ballWidth} height={ballHeight} />
      </Arena>
    </GameStateContext.Provider>
  );

}

export default App;
