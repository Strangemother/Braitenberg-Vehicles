/*
Braitenberg-Vehicles
Copyright (c) 2013 Vince Allen
vince@vinceallen.com
http://www.vinceallen.com

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
*/
/* Version: 1.0.0 */
/* Build time: April 27, 2013 04:14:29 */

/*global Flora, Brait, document */
Flora.Mantle.System.create(function() {

  var i, max,
      maxVehicles = 6,
      getRandomNumber = Flora.Utils.getRandomNumber,
      world = Flora.Mantle.System.allWorlds()[0];

  Flora.Mantle.World.update({
    c: 0.01,
    gravity: new Flora.Vector(),
    width: Flora.Utils.getWindowSize().width / 0.45,
    height: Flora.Utils.getWindowSize().height / 0.45,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: [100, 100, 100],
    color: [0, 0, 0]
  });

  // create vehicles
  for (i = 0; i < maxVehicles; i += 1) {

    new Brait.Vehicle({
      system: this,
      controlCamera: !i,
      color: !i ? [255, 255, 255] : [255, 100, 0],
      borderColor: !i ? [255, 100, 0] : [255, 150, 50],
      viewArgs: [i],
      sensors: [
        new Brait.Sensor({
          type: 'heat',
          behavior: 'ACCELERATE'
        }),
        new Brait.Sensor({
          type: 'light',
          behavior: 'AGGRESSIVE'
        }),
        new Brait.Sensor({
          type: 'oxygen',
          behavior: 'LIKES'
        }),
        new Brait.Sensor({
          type: 'food',
          behavior: 'LIKES'
        })
      ],
      collisions: {
        'light': Brait.Light.collide,
        'food': Brait.Food.collide,
        'oxygen': Brait.Oxygen.collide
      }
    });
  }

  // create stimulants
  for (i = 0, max = (0.02 * world.bounds[1]); i < max; i += 1) {
    Brait.Stimulus.create(null, new Flora.Vector(getRandomNumber(0, world.bounds[1]),
        getRandomNumber(0, world.bounds[2])), [Brait.Heat, Brait.Light, Brait.Oxygen, Brait.Food]);
  }

  // add event listener to create random stimulant on mouseup
  Flora.Utils.addEvent(document, 'mouseup', Brait.Stimulus.create);

}, null, null, true);

Flora.Utils.addEvent(document.getElementById('buttonStart'), "mouseup", function(e) {

  if (e.stopPropagation) {
    e.stopPropagation();
  }
  document.getElementById('containerMenu').removeChild(document.getElementById('containerButton'));
  Flora.Mantle.System.start();
});
