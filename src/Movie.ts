export enum MovieId {
  F001 = "F001",
  F002 = "F002",
}

export enum MovieCode {
  CHILDRENS = "childrens",
  REGULAR = "regular",
  NEW = "new",
}

interface MovieDetails {
  title: string;
  code: MovieCode;
}

export type MovieCollection = {
  [MovieID in MovieId]: MovieDetails;
};

// new code here

const fs = require("fs");
const path = require("path");
const moviePath = path.join(__dirname, "/data/movies.json");
const codePath = path.join(__dirname, "/data/codes.json");

export class MoviesCtrl {
  async getAll() {
    try {
      const data = fs.readFileSync(moviePath, "utf8");
      return JSON.parse(data);
    } catch (err) {
      console.error(err);
    }
  }

  async getMovie(id: any) {
    let movies = await this.getAll();
    return movies[id];
  }

  async createMovie(title: any, movieCode: string) {
    let movies = await this.getAll();
    let nextId = await this.nextId();
    let newMovies = { ...movies, [nextId]: { title: title, code: movieCode } };
    let jsonString = JSON.stringify(newMovies);
    try {
      fs.writeFile(moviePath, jsonString, (err: any) => {
        console.error(err);
      });
    } catch (err) {
      console.error(err);
    }
  }

  async updateMovie(id: any, title: any, code: any) {
    let movies = await this.getAll();
    let newMovies = { ...movies, [id]: { title: title, code: code } };
    let jsonString = JSON.stringify(newMovies);
    try {
      fs.writeFile(moviePath, jsonString, (err: any) => {
        console.error(err);
      });
    } catch (err) {
      console.error(err);
    }
  }

  async deleteMovie(id: any) {
    let movies = await this.getAll();
    delete movies[id];
    let jsonString = JSON.stringify(movies);
    try {
      fs.writeFile(moviePath, jsonString, (err: any) => {
        console.error(err);
      });
    } catch (err) {
      console.error(err);
    }
  }

  async nextId() {
    let movies = await this.getAll();
    let keys = Object.keys(movies);
    let lastKey = keys[keys.length - 1];
    let spiceKey = lastKey.slice(3);
    let keyToNumber = parseInt(spiceKey);
    let nextId = "F00" + (keyToNumber + 1);
    return nextId;
  }
}
