// let rosterDB = [
//     {
//         name: "Gen",
//         location: "New Jersey",
//     },
//     {
//         name: "Chandan",
//         location: "Los Angeles",
//     },
//     {
//         name: "Gen",
//         location: "Los Angeles",
//     },
// ];

const { default: axios } = require("axios");
const { response } = require("express");
const { uid } = require("uid");

class Roster {
    constructor() {}

    async addStudent({ name, location }) {
        // unique identified (also will be a key)
        const id = uid();
        this[id] = {
            id,
            name,
            location,
            profilePic: await this.getProfilePic(location),
        };

        return this[id];
    }

    // get 1 student by id
    getStudentById(id) {
        return this[id];
    }

    getStudentQuery({ name, location }) {
        let results = Object.values(this);

        if (name) {
            results = results.filter((student) => student.name === name);
        }

        if (location) {
            results = results.filter((student) => student.location === location);
        }

        return results;
    }

    async updateStudent(id, { name, location }) {
        const student = this.getStudentById(id);

        if (name) {
            student.name = name;
        }
        if (location) {
            student.location = location;
            student.profilePic = await this.getProfilePic(location);
        }

        return student;
    }

    deleteStudent(id) {
        delete this[id];
    }

    async getProfilePic(location) {
        const base = "https://api.unsplash.com/photos/random?client_id=";
        const apiKey = process.env.UNSPLASH_API_KEY;
        const fullSplashURL = `${base}${apiKey}&query=${location}`;

        try {
            const { data } = await axios.get(fullSplashURL);

            if (data && data.urls.small) {
                return data.urls.small;
            } else {
                return "https://placehold.jp/50x50.png";
            }
        } catch (error) {
            return "https://placehold.jp/50x50.png";
        }
    }
}

module.exports = { rosterDB: new Roster() };
