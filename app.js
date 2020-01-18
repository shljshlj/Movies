'use strict';


function Genre(name) {
    this.name = name;
}

Genre.prototype.getData = function () {
    return (this.name.slice(0, 1) + this.name.slice(-1)).toUpperCase();
};

function Movie(title, genre, length) {
    this.title = title;
    this.genre = genre;
    this.length = length;
}

Movie.prototype.getData = function () {
    return `${this.title}, ${this.length}min, ${this.genre.getData()}`;
};

function Program(name, date) {
    this.name = name;
    this.date = date;
    this.movieList = [];
    this.numberOfMovies = 0;
}

Program.prototype.addMovie = function (movie) {
    this.movieList.push(movie);
    this.numberOfMovies++;
};

Program.prototype.getProgramDuration = function () {
    return this.movieList.map(movie => +movie.length).reduce((acc, cur) => acc + cur, 0)
};

Program.prototype.formatDate = function () {
    const date = this.date;
    return date.getDate() + '.' + (date.getMonth() + 1) + '.' + date.getFullYear() + '.';
};

Program.prototype.getData = function () {
    let programData = `${this.formatDate()}, ${this.name}, program duration: ${this.getProgramDuration()}min\n`;

    this.movieList.forEach(function (movie) {
        programData += '\t\t' + movie.getData() + '\n';
    });

    return programData;
};

function Festival(name) {
    this.name = name;
    this.programList = [];
}

Festival.prototype.addProgram = function (program) {
    this.programList.push(program);
};

Festival.prototype.getMovieCount = function () {
    return this.programList.map(program => program.numberOfMovies).reduce((acc, cur) => acc + cur, 0);
};

Festival.prototype.getData = function () {
    let festivalData = `${this.name} has ${this.getMovieCount()} movie titles\n`;

    this.programList.forEach(program => {
        festivalData += '\t' + program.getData() + '\n';
    });

    return festivalData;
};


(function () {

    function createMovie(title, genreStr, length) {
        return new Movie(title, new Genre(genreStr), length);
    }

    function createProgram(name, dateStr) {
        const date = new Date(dateStr);
        return new Program(name, date);
    }

    const festivalSpanishFilm = new Festival('Spanish Film Festival');

    const programAfterMidnight = createProgram('After Midnight', 'December 17, 2019');
    const programDiagonalStreams = createProgram('Diagonal Streams', 'January 07, 2020');

    const laPielQueHabito = createMovie('La piel que habito', 'thriller', 125);
    const dolorYGloria = createMovie('Dolor y gloria', 'drama', 113);
    const julieta = createMovie('Julieta', 'Drama', 100);
    const losAmantesPasajeros = createMovie('Los amantes pasajeros', 'comedy', 90);

    programAfterMidnight.addMovie(laPielQueHabito);
    programAfterMidnight.addMovie(dolorYGloria);
    programAfterMidnight.addMovie(julieta);

    programDiagonalStreams.addMovie(losAmantesPasajeros);

    festivalSpanishFilm.addProgram(programAfterMidnight);
    festivalSpanishFilm.addProgram(programDiagonalStreams);

    console.log(programAfterMidnight.getData());
    console.log(programDiagonalStreams.getData());
    console.log(festivalSpanishFilm.getData());
})();