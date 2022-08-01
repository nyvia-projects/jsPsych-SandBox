/**
 * @title test
 * @description no idea
 * @version 0.1.0
 *
 * @assets assets/
 */

// You can import stylesheets (.scss or .css).
import "../styles/main.scss";

import FullscreenPlugin from "@jspsych/plugin-fullscreen";
import HtmlKeyboardResponsePlugin from "@jspsych/plugin-html-keyboard-response";
import PreloadPlugin from "@jspsych/plugin-preload";
import canvasButtonResponse from "@jspsych/plugin-canvas-button-response";

import { initJsPsych } from "jspsych";

/**
 * This function will be executed by jsPsych Builder and is expected to run the jsPsych experiment
 *
 * @type {import("jspsych-builder").RunFunction}
 */
export async function run({ assetPaths, input = {}, environment, title, version }) {
  const jsPsych = initJsPsych();
  const timeline = [];

  const jsPsychCanvasButtonResponse = canvasButtonResponse;
  // Preload assets
  timeline.push({
    type: PreloadPlugin,
    images: assetPaths.images,
    audio: assetPaths.audio,
    video: assetPaths.video,
  });

  // Welcome screen
  timeline.push({
    type: HtmlKeyboardResponsePlugin,
    stimulus: "<p>Welcome to test02!<p/>",
  });

  // Switch to fullscreen
  timeline.push({
    type: FullscreenPlugin,
    fullscreen_mode: true,
  });


  function filledCirc(canvas, radius, color) {
    let ctx = canvas.getContext("2d");
    ctx.beginPath();
    ctx.arc(150, 150, radius, 0, 2 * Math.PI);
    ctx.fillStyle = color;
    ctx.fill();
  }

  timeline.push({
    type: jsPsychCanvasButtonResponse,
    stimulus: function (c) {
      filledCirc(c, 100, 'blue');
    },
    canvas_size: [300, 300],
    choices: ['Red', 'Green', 'Blue'],
    prompt: '<p>What color is the circle?</p>',
    data: {color: 'blue', radius: 100}
  });

  timeline.push({
    type: jsPsychCanvasButtonResponse,
    stimulus: function (c) {
      filledCirc(c, 150, 'green');
    },
    canvas_size: [300, 300],
    choices: ['Larger', 'Smaller'],
    stimulus_duration: 1000,
    prompt: '<p>Is this circle larger or smaller than the last one?</p>' +
        '<p>Stimulus will be hidden after 1 second.</p>',
    data: {color: 'green', radius: 150}
  });

  await jsPsych.run(timeline);

  // Return the jsPsych instance so jsPsych Builder can access the experiment results (remove this
  // if you handle results yourself, be it here or in `on_finish()`)
  return jsPsych;
}
