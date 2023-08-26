console.log("Hello World!");
import * as H from '@vladmandic/human'; // equivalent of import @vladmandic/Human

      const humanConfig = { // user configuration for human, used to fine-tune behavior
        modelBasePath: '../models', // models can be loaded directly from cdn as well
        filter: { enabled: true, equalization: true, flip: false },
        face: { enabled: true, detector: { rotation: false }, mesh: { enabled: true }, attention: { enabled: false }, iris: { enabled: true }, description: { enabled: true }, emotion: { enabled: true } },
        body: { enabled: true },
        hand: { enabled: true },
        gesture: { enabled: true },
        object: { enabled: false },
        segmentation: { enabled: false },
      };
      const human = new H.Human(humanConfig); // create instance of human with overrides from user configuration
      const canvas = document.getElementById('canvas'); // output canvas to draw both webcam and detection results

      async function drawLoop() { // main screen refresh loop
        const interpolated = human.next(); // get smoothened result using last-known results which are continously updated based on input webcam video
        human.draw.canvas(human.webcam.element, canvas); // draw webcam video to screen canvas // better than using procesed image as this loop happens faster than processing loop
        await human.draw.all(canvas, interpolated); // draw labels, boxes, lines, etc.
        setTimeout(drawLoop, 10); // use to slow down refresh from max refresh rate to target of 1000/30 ~ 30 fps
      }

      async function main() { // main entry point
        document.getElementById('log').innerHTML = `human version: ${human.version} | tfjs version: ${human.tf.version['tfjs-core']}<br>platform: ${human.env.platform} | agent ${human.env.agent}`;
        await human.webcam.start({ crop: true }); // find webcam and start it
        human.video(human.webcam.element); // instruct human to continously detect video frames
        canvas.width = human.webcam.width; // set canvas resolution to input webcam native resolution
        canvas.height = human.webcam.height;
        canvas.onclick = async () => { // pause when clicked on screen and resume on next click
          if (human.webcam.paused) await human.webcam.play();
          else human.webcam.pause();
        };
        await drawLoop(); // start draw loop
      }

      window.onload = main;