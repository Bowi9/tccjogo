//scripts.js
import Game from "./js/game/game.js";
import { setupInputListeners } from "./js/input/input.js";

const canvas = document.getElementById("pongCanvas");

const game = new Game(canvas);

setupInputListeners(game, canvas);

game.startGame();
