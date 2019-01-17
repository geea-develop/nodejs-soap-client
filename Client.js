"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var SoapRequests_1 = require("./SoapRequests");
var DefaultSoapRequest_1 = require("./SoapRequests/DefaultSoapRequest");
var Client = /** @class */ (function () {
    function Client(config) {
        this._config = config;
        this._soapRequest = new DefaultSoapRequest_1.DefaultSoapRequest(config);
        this._logger = [{
                title: '[SOAP Client initiated]'
            }];
    }
    Object.defineProperty(Client.prototype, "config", {
        get: function () {
            return this._config;
        },
        set: function (value) {
            this._config = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Client.prototype, "soapRequest", {
        get: function () {
            return this._soapRequest;
        },
        set: function (value) {
            this._soapRequest = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Client.prototype, "logger", {
        get: function () {
            return this._logger;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @returns AxiosResponse
     */
    Client.prototype.execute = function (action, config, mock) {
        if (config === void 0) { config = {}; }
        if (mock === void 0) { mock = false; }
        return __awaiter(this, void 0, void 0, function () {
            var response, _a, e_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        this.config = __assign({}, this.config, config);
                        if (SoapRequests_1.SoapRequests[action]) {
                            this.soapRequest = new SoapRequests_1.SoapRequests[action](this.config);
                        }
                        else {
                            throw "Soap request not found: " + action;
                        }
                        if (mock)
                            this._logger.push({ title: "SOAP MOCK ENABLED" });
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 6, , 7]);
                        if (!mock) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.soapRequest.executeMock()];
                    case 2:
                        _a = _b.sent();
                        return [3 /*break*/, 5];
                    case 3: return [4 /*yield*/, this.soapRequest.execute()];
                    case 4:
                        _a = _b.sent();
                        _b.label = 5;
                    case 5:
                        response = _a;
                        return [3 /*break*/, 7];
                    case 6:
                        e_1 = _b.sent();
                        response = this.processError(e_1);
                        return [3 /*break*/, 7];
                    case 7: return [2 /*return*/, this.processResponse(response)];
                }
            });
        });
    };
    /**
     * @returns AxiosResponse
     */
    Client.prototype.executeMock = function (action, config) {
        if (config === void 0) { config = {}; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.execute(action, config, true)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
      * @returns AxiosResponse
      */
    Client.prototype.processError = function (e) {
        if (this.config.isDebug)
            this._logger.push({
                title: '[SOAP Client] processError ',
                data: e
            });
        if (e.response) {
            this._logger.push({
                title: "SOAP FAIL: " + e
            });
            return e.response;
        }
        else {
            this._logger.push({
                title: "SOAP FAIL: " + e
            });
            return {
                status: 500,
                statusText: 'Unknown error',
                headers: {},
                config: {}
            };
        }
    };
    /**
     * @returns AxiosResponse
     */
    Client.prototype.processResponse = function (response) {
        this._logger.push({
            title: "[Client] processResponse ",
            data: response
        });
        if (!response)
            return {
                status: 500,
                statusText: 'Empty response',
                headers: {},
                config: {}
            };
        return {
            response: {
                body: response.data,
                statusCode: response.status,
            }
        };
    };
    return Client;
}());
exports.Client = Client;
