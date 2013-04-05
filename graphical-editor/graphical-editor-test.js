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
            editor.printTable();
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
            editor.printTable();
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
            editor.printTable();
            assert.equal(editor.getPixel(3, 5), "C");

            editor.clear();
            for (var x = 1; x <= 5; x++) {
                for (var y = 1; y <= 6; y++) {
                    assert.equal(editor.getPixel(x, y), "O");
                }
            }
        }
    }

}).export(module); // Export the Suite
