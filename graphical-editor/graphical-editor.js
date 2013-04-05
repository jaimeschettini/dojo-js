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