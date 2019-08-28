/*---------------------------------------------------------------------------------------------
 *  Copyright (c) kkChan(694643393@qq.com). All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

'use strict'

const webchinese = require('./sdk/webchinese');

class sms {
    constructor(type, options) {
        switch (this.type = type) {
            case 'webchinese':
            default:
                this.client = new webchinese(options);
                break;
        }
    }

    send(phone, content) {
        return new Promise((resolve, reject) => {
            this.client.send(phone, content).then(result => {
                switch (this.type = type) {
                    case 'webchinese':
                    default:
                        result = !isNaN(result) ? Number(result) : 0;

                        switch (result) {
                            case -4:
                                reject(new Error('Mobile number error'));
                                break;
                            default:
                                resolve(result > 0);
                                break;
                        }
                        break;
                }
            }).catch(err => {
                console.log(err.stack);

                reject(new Error('Failed to send'));
            });
        });
    }
}

module.exports = sms;