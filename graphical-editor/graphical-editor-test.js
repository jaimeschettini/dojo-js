var vows = require('vows'),
    assert = require('assert');

var graphicalEditor = require('./graphical-editor');
var editor = new graphicalEditor.Editor();

vows.describe('A graphical editor').addBatch({
    'when creating the table': {
        topic: editor.create(5, 6),

        'it should have the passed coordinates': function (topic) {
            assert.equal(editor.columns, 5);
            assert.equal(editor.lines, 6);
        },

        'all pixels should have the value "O"': function (topic) {
            for (var x = 1; x <= 5; x++) {
                for (var y = 1; y <= 6; y++) {
                    assert.equal(editor.getPixel(x, y), "O");
                }
            }
        }
    },

    'when painting a pixel in the table': {
        topic: editor.create(5, 6),

        'the pixel the corresponds the coordinates should have been painted with the color': function (topic) {
            editor.paint(3, 5, "C");
            assert.equal(editor.getPixel(3, 5), "C");

            for (var x = 1; x <= 5; x++) {
                for (var y = 1; y <= 6; y++) {
                    if (x == 3 && y == 5) continue;

                    assert.equal(editor.getPixel(x, y), "O");
                }
            }
        }
    },

    'when clearing the table': {
        'all pixels should have the value "O"': function (topic) {
            editor.create(5, 6);
            editor.paint(3, 5, "C");
            assert.equal(editor.getPixel(3, 5), "C");

            editor.clear();
            for (var x = 1; x <= 5; x++) {
                for (var y = 1; y <= 6; y++) {
                    assert.equal(editor.getPixel(x, y), "O");
                }
            }
        }
    },

    'when drawing a vertical line in the table': {
        topic: editor.create(5, 6),

        'the pixels the corresponds the coordinates should have been painted with the color': function (topic) {
            editor.drawVerticalLine(2, 3, 5, "W");
            assert.equal(editor.getPixel(2, 3), "W");
            assert.equal(editor.getPixel(2, 4), "W");
            assert.equal(editor.getPixel(2, 5), "W");

            for (var x = 1; x <= 5; x++) {
                for (var y = 1; y <= 6; y++) {
                    if (x == 2 && (y == 3 || y == 4 || y == 5)) continue;

                    assert.equal(editor.getPixel(x, y), "O");
                }
            }
        },

        tearDown : function() {
            editor.clear();
        }
    },

    'when drawing a horizontal line in the table': {
        topic: editor.create(5, 6),

        'the pixels the corresponds the coordinates should have been painted with the color': function (topic) {
            editor.drawHorizontalLine(1, 3, 6, "Z");
            editor.printTable();
            assert.equal(editor.getPixel(1, 6), "Z");
            assert.equal(editor.getPixel(2, 6), "Z");
            assert.equal(editor.getPixel(3, 6), "Z");

            for (var x = 1; x <= 5; x++) {
                for (var y = 1; y <= 6; y++) {
                    if ((x == 1 || x == 2 || x == 3) && y == 6) continue;

                    assert.equal(editor.getPixel(x, y), "O");
                }
            }
        },

        tearDown : function() {
            editor.clear();
        }
    },

    'when drawing a filled rectangle in the table': {
        topic: editor.create(5, 6),

        'the pixels inside the coordinates should have been painted with the color': function (topic) {
            var 
                x1 = 3,
                y1 = 4,
                x2 = 5,
                y2 = 6,
                paintedCoordinate,
                paintedCoordinates = [
                    [3, 4],
                    [4, 4],
                    [5, 4],
                    [3, 5],
                    [4, 5],
                    [5, 5],
                    [3, 6],
                    [4, 6],
                    [5, 6]
                ];

            editor.drawFilledRectangle(x1, y1, x2, y2, "R");
            editor.printTable();

            for (var x = 1; x <= 5; x++) {
                loop : for (var y = 1; y <= 6; y++) {
                    for (var p = 0; p < paintedCoordinates.length; p++) {
                        paintedCoordinate = paintedCoordinates[p];
                        if (x == paintedCoordinate[0] && y == paintedCoordinate[1]) {
                            assert.equal(editor.getPixel(x, y), "R");
                            continue loop;
                        }
                    }

                    assert.equal(editor.getPixel(x, y), "O");
                }
            }
        },

        tearDown : function() {
            editor.clear();
        }
    },

    'when filling a region in the table': {
        topic: editor.create(5, 6),

        'Fills the region with the colour C. The region R to be filled is defined as follows. The pixel (X,Y) belongs to this region. The other pixel belongs to the region R if and only if it has the same colour as pixel (X,Y) and a common side with any pixel which belongs to this region.': function (topic) {
            console.log("");
            editor.drawFilledRectangle(3, 4, 5, 6, "J");
            editor.drawVerticalLine(1, 2, 5, "V");
            editor.drawHorizontalLine(2, 5, 3, "H");
            editor.paint(3, 1, "P");
            editor.fillRegionStartingWith(2, 2, "R");

            editor.printTable();

            assert.equal(editor.getPixel(1, 1), "R");
            assert.equal(editor.getPixel(2, 1), "R");
            assert.equal(editor.getPixel(3, 1), "P");
            assert.equal(editor.getPixel(4, 1), "R");
            assert.equal(editor.getPixel(5, 1), "R");

            assert.equal(editor.getPixel(1, 2), "V");
            assert.equal(editor.getPixel(2, 2), "R");
            assert.equal(editor.getPixel(3, 2), "R");
            assert.equal(editor.getPixel(4, 2), "R");
            assert.equal(editor.getPixel(5, 2), "R");

            assert.equal(editor.getPixel(1, 3), "V");
            assert.equal(editor.getPixel(2, 3), "H");
            assert.equal(editor.getPixel(3, 3), "H");
            assert.equal(editor.getPixel(4, 3), "H");
            assert.equal(editor.getPixel(5, 3), "H");

            assert.equal(editor.getPixel(1, 4), "V");
            assert.equal(editor.getPixel(2, 4), "O");
            assert.equal(editor.getPixel(3, 4), "J");
            assert.equal(editor.getPixel(4, 4), "J");
            assert.equal(editor.getPixel(5, 4), "J");

            assert.equal(editor.getPixel(1, 5), "V");
            assert.equal(editor.getPixel(2, 5), "O");
            assert.equal(editor.getPixel(3, 5), "J");
            assert.equal(editor.getPixel(4, 5), "J");
            assert.equal(editor.getPixel(5, 5), "J");

            assert.equal(editor.getPixel(1, 6), "O");
            assert.equal(editor.getPixel(2, 6), "O");
            assert.equal(editor.getPixel(3, 6), "J");
            assert.equal(editor.getPixel(4, 6), "J");
            assert.equal(editor.getPixel(5, 6), "J");
        },

        tearDown : function() {
            editor.clear();
        }
    }

}).export(module); // Export the Suite
