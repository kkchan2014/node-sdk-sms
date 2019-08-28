/*---------------------------------------------------------------------------------------------
 *  Copyright (c) kkChan(694643393@qq.com). All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

'use strict'

const request = require('request');

class webchinese {
    constructor(options) {
        this.options = options;
    }

    send(phone, message) {
        return new Promise((resolve, reject) => {
            this._get(`http://utf8.api.smschinese.cn/?Uid=${this.options.uid}&Key=${this.options.key}&smsMob=${phone}&smsText=${encodeURI(message)}`).then(result => {
                resolve(result);
            }).catch(err => {
                reject(err);
            });
        });
    }

    count() {
        return new Promise((resolve, reject) => {
            this._get(`http://www.smschinese.cn/web_api/SMS/?Action=SMS_Num&Uid=${this.options.uid}&Key=${this.options.key}`).then(result => {
                resolve(Number(result) || 0);
            }).catch(err => {
                resolve(0);
            });
        });
    }

    _get(url) {
        return this._request({
            method: 'GET',
            url: url
        });
    }

    _request(options) {
        return new Promise((resolve, reject) => {
            request(options, function (err, res, body) {
                if (err) {
                    reject(err)
                } else {
                    resolve(body);
                }
            });
        });
    }
}

module.exports = webchinese;