import { BaseRepository } from "./baseRepository";

export class BaseService {

    repositories: {
        [key: string]: any // figure out why this can't be BaseRepository!
    };

    constructor() {
        this.repositories = {};
    }

    setRepository = (key: string, rep: BaseRepository) => {
        this.repositories[key] = rep;
    }

    getRepository = <T>(key: string) : T => {
        if (this.repositories[key] !== undefined) {
            return this.repositories[key];
        }

        throw new Error(`Requested repository of ${key} does not exist!`);
    }
}