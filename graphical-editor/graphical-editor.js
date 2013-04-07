var Editor = function() {
    var table, columns, lines;

    this.create = function(columns, lines) {
        this.table = [];
        this.columns = columns;
        this.lines = lines;

        for (var column = 0; column < columns; column++) {
            this.table[column] = [];
            for(var line = 0; line < lines; line++) {
                this.table[column][line] = "O";
            }
        }
    }

    this.clear = function() {
        for (var column = 0; column < this.columns; column++) {
            for(var line = 0; line < this.lines; line++) {
                this.table[column][line] = "O";
            }
        }    
    }

    this.getPixel = function(x, y) {
        return this.table[x-1][y-1];
    }
    
    this.setPixel = function(x, y, color) {
        this.table[x-1][y-1] = color;
    }

    this.paint = function(x, y, color) {
        this.setPixel(x, y, color);
    }

    this.drawVerticalLine = function(x, initialY, endY, color) {
        for (var i = initialY; i <= endY; i++) {
            this.paint(x, i, color);
        }
    }

    this.drawHorizontalLine = function(initialX, endX, y, color) {
        for (var i = initialX; i <= endX; i++) {
            this.paint(i, y, color);
        }
    }

    this.drawFilledRectangle = function(initialX, initialY, endX, endY, color) {
        for (var x = initialX; x <= endX; x++) {
            for (var y = initialY; y <= endY; y++) {
                this.paint(x, y, color);
            }
        }
    }

    this.getSidePixels = function(x, y) {
        var pixels = [];
        if (x > 1) {
            pixels.push([x - 1, y]);
        }

        if (x < this.columns) {
            pixels.push([x + 1, y]);
        }

        if (y > 1) {
            pixels.push([x, y - 1]);
        }

        if (y < this.lines) {
            pixels.push([x, y + 1]);
        }

        return pixels;
    }

    this.fillRegionStartingWith = function(x, y, color) {
        var previousColor = this.getPixel(x, y);
        this.fillRegion(x, y, previousColor, color);
    }

    this.fillRegion = function(x, y, previousColor, color) {
        this.paint(x, y, color);

        var sidePixels = this.getSidePixels(x, y);
        for (var i = 0; i < sidePixels.length; i++) {
            var sidePixel = sidePixels[i];
            var sideX = sidePixel[0];
            var sideY = sidePixel[1];

            if (this.getPixel(sideX, sideY) === previousColor) {
                this.fillRegion(sideX, sideY, previousColor, color);
            }
        }
    }

    this.printTable = function() {
        for (var line = 0; line < this.lines; line++) {
            for (var column = 0; column < this.columns; column++) {
                process.stdout.write(this.table[column][line]);
            }
            console.log();
        }
    }
};

exports.Editor = Editor;