import {AxiosResponse} from "axios";
import axios from "axios";
import https from "https";

export class Client {

    private _config: {};

    constructor() {
        this._config = {}
    }

    get config(): {} {
        return this._config;
    }

    async execute(action, config) {
       // [this._config, ...config];

    }

}
