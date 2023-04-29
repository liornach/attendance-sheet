"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
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
exports.__esModule = true;
var puppeteer_1 = require("puppeteer");
var CryptoJS = require("crypto-js");
var fs = require("fs/promises");
// Secret key for password encryption
var SECRET_KEY = '9jnerlff23u8ed01np9g6ysbhsh0dvcs';
(function () { return __awaiter(void 0, void 0, void 0, function () {
    var orgId, password, userId, jsonData, data, browser, page, encryptedPassword, submitButton, loginButton, accessibilityIconXPath, reportXPath, reportButton, errorDaysXpath, wrongDaysButton, wrongDaysPath, err_1, textInputArray, i, selectElements, i, options, err_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 50, , 51]);
                orgId = void 0, password = void 0, userId = void 0;
                return [4 /*yield*/, fs.readFile("./1-assets/data.json", "utf8")];
            case 1:
                jsonData = _a.sent();
                data = JSON.parse(jsonData);
                return [4 /*yield*/, puppeteer_1["default"].launch({
                        headless: false,
                        defaultViewport: null
                    })];
            case 2:
                browser = _a.sent();
                return [4 /*yield*/, browser.newPage()];
            case 3:
                page = _a.sent();
                // Go to page
                return [4 /*yield*/, page.goto("https://net.hilan.co.il/login", { waitUntil: "networkidle0" })];
            case 4:
                // Go to page
                _a.sent();
                if (!(!data.orgId || !data.password || !data.userId)) return [3 /*break*/, 8];
                return [4 /*yield*/, page.evaluate(function () {
                        return window.prompt("Enter Organzation Number:");
                    })];
            case 5:
                // Get organization id from the user:
                orgId = _a.sent();
                return [4 /*yield*/, page.evaluate(function () {
                        return window.prompt("Enter Employee Number:");
                    })];
            case 6:
                // Get user id from the user:
                userId = _a.sent();
                return [4 /*yield*/, page.evaluate(function () {
                        return window.prompt("Enter Password:");
                    })];
            case 7:
                // Get password from the user:
                password = _a.sent();
                return [3 /*break*/, 9];
            case 8:
                orgId = data.orgId;
                password = CryptoJS.AES.decrypt(data.password, SECRET_KEY).toString(CryptoJS.enc.Utf8);
                userId = data.userId;
                _a.label = 9;
            case 9: 
            // Focus on the input field
            return [4 /*yield*/, page.focus("#orgId")];
            case 10:
                // Focus on the input field
                _a.sent();
                // If user gave no organization id:
                if (!orgId) {
                    // something to stop the code and try again
                    return [2 /*return*/];
                }
                // If user gave no user id:
                if (!userId) {
                    // something to stop the code and try again
                    return [2 /*return*/];
                }
                // If user gave no password:
                if (!password) {
                    // something to stop the code and try again
                    return [2 /*return*/];
                }
                encryptedPassword = CryptoJS.AES.encrypt(password, SECRET_KEY).toString();
                return [4 /*yield*/, fs.writeFile("./1-assets/data.json", "{\n      \"password\" : \"".concat(encryptedPassword, "\" , \n      \"orgId\" : \"").concat(orgId, "\",\n      \"userId\": \"").concat(userId, "\"\n    }"))];
            case 11:
                _a.sent();
                // insert org Id in the input box
                return [4 /*yield*/, page.keyboard.type(orgId)];
            case 12:
                // insert org Id in the input box
                _a.sent();
                return [4 /*yield*/, page.$('button[type="submit"]')];
            case 13:
                submitButton = _a.sent();
                // If button is not found;
                if (!submitButton) {
                    // some error to throw
                    console.log("No Button");
                }
                // Send organization id:
                return [4 /*yield*/, (submitButton === null || submitButton === void 0 ? void 0 : submitButton.click())];
            case 14:
                // Send organization id:
                _a.sent();
                // Wait for page to fully load
                return [4 /*yield*/, page.waitForNavigation({ waitUntil: 'load' })];
            case 15:
                // Wait for page to fully load
                _a.sent();
                // Focus on the user input field
                return [4 /*yield*/, page.focus("#user_nm")];
            case 16:
                // Focus on the user input field
                _a.sent();
                // Insert user id in the input box:
                return [4 /*yield*/, page.keyboard.type(userId)];
            case 17:
                // Insert user id in the input box:
                _a.sent();
                // Focus on the password input field:
                return [4 /*yield*/, page.focus("#password_nm")];
            case 18:
                // Focus on the password input field:
                _a.sent();
                // Insert password in the input box:
                return [4 /*yield*/, page.keyboard.type(password)];
            case 19:
                // Insert password in the input box:
                _a.sent();
                return [4 /*yield*/, page.$('button[type="submit"]')];
            case 20:
                loginButton = _a.sent();
                if (!loginButton) {
                    // something to stop the code and try again
                    return [2 /*return*/];
                }
                // Press the login button
                return [4 /*yield*/, loginButton.click()];
            case 21:
                // Press the login button
                _a.sent();
                // Wait for page to load:
                return [4 /*yield*/, page.waitForNavigation({ waitUntil: 'load' })];
            case 22:
                // Wait for page to load:
                _a.sent();
                accessibilityIconXPath = "/html/body/div/div/div[1]/i";
                return [4 /*yield*/, page.waitForXPath(accessibilityIconXPath, { visible: true, timeout: 10000 })];
            case 23:
                _a.sent();
                // another safety layer:
                return [4 /*yield*/, page.waitForSelector(".fh-report-1", { timeout: 10000 })];
            case 24:
                // another safety layer:
                _a.sent();
                reportXPath = "/html/body/h-root/h-main-layout/div[2]/h-home/h-app-component-layout/div[2]/div/div[1]/div/div/div[1]/h-home-header/div/div/div/div[2]/div/div/div/div[2]/div/div[1]";
                return [4 /*yield*/, page.waitForXPath(reportXPath, { visible: true, timeout: 10000 })];
            case 25:
                _a.sent();
                // Wait for three seconds before continuing
                return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, 500); })];
            case 26:
                // Wait for three seconds before continuing
                _a.sent();
                return [4 /*yield*/, page.waitForSelector(".fh-report-1")];
            case 27:
                reportButton = _a.sent();
                return [4 /*yield*/, reportButton.click()];
            case 28:
                _a.sent();
                // Wait for page to load:
                return [4 /*yield*/, page.waitForNavigation({ waitUntil: 'load' })];
            case 29:
                // Wait for page to load:
                _a.sent();
                errorDaysXpath = "/html/body/form/div[3]/div[4]/div/div[1]/div[1]/div/div[1]/div[2]/div/span/div/div[4]/input";
                // Wait for that X Path to appear:
                return [4 /*yield*/, page.waitForXPath(errorDaysXpath, { visible: true, timeout: 30000 })];
            case 30:
                // Wait for that X Path to appear:
                _a.sent();
                return [4 /*yield*/, page.$x(errorDaysXpath)];
            case 31:
                wrongDaysButton = _a.sent();
                // If no button is found:
                if (!wrongDaysButton) {
                    console.log("no button");
                    // Something to stop the code
                    return [2 /*return*/];
                }
                // If there is a button:
                return [4 /*yield*/, wrongDaysButton[0].click()];
            case 32:
                // If there is a button:
                _a.sent();
                wrongDaysPath = "/html/body/form/div[3]/div[4]/div/div[2]/div/div/div/div[3]/div/div[1]/table/tbody/tr[2]/td/div[1]/div/table/tbody/tr[2]/td[2]/table/tbody/tr/td[1]/input";
                _a.label = 33;
            case 33:
                _a.trys.push([33, 35, , 36]);
                // Wait for that X Path to be exist
                return [4 /*yield*/, page.waitForXPath(wrongDaysPath, { visible: true, timeout: 10000 })];
            case 34:
                // Wait for that X Path to be exist
                _a.sent();
                return [3 /*break*/, 36];
            case 35:
                err_1 = _a.sent();
                console.log(err_1);
                return [3 /*break*/, 36];
            case 36: return [4 /*yield*/, page.$$('.ControlLostFocus')];
            case 37:
                textInputArray = _a.sent();
                i = 0;
                _a.label = 38;
            case 38:
                if (!(i < textInputArray.length)) return [3 /*break*/, 43];
                if (!(i % 2 === 0)) return [3 /*break*/, 40];
                return [4 /*yield*/, textInputArray[i].type("0800")];
            case 39:
                _a.sent();
                return [3 /*break*/, 42];
            case 40: return [4 /*yield*/, textInputArray[i].type("1700")];
            case 41:
                _a.sent();
                _a.label = 42;
            case 42:
                i++;
                return [3 /*break*/, 38];
            case 43: return [4 /*yield*/, page.$$('select')];
            case 44:
                selectElements = _a.sent();
                i = 0;
                _a.label = 45;
            case 45:
                if (!(i < selectElements.length)) return [3 /*break*/, 49];
                return [4 /*yield*/, selectElements[i].$$eval('option', function (options) { return options.map(function (option) { return option.value; }); })];
            case 46:
                options = _a.sent();
                return [4 /*yield*/, selectElements[i].select(options[1])];
            case 47:
                _a.sent();
                _a.label = 48;
            case 48:
                i++;
                return [3 /*break*/, 45];
            case 49:
                console.log("finish");
                return [3 /*break*/, 51];
            case 50:
                err_2 = _a.sent();
                console.error(err_2.message);
                if (err_2.stack) {
                    console.log(err_2.stack);
                    return [2 /*return*/];
                }
                return [3 /*break*/, 51];
            case 51: return [2 /*return*/];
        }
    });
}); })();
