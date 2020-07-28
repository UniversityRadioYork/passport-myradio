import * as Strategy from "passport-strategy";
import got from "got";

/// <reference types="express" />
import express = require('express');

import { MyRadioUser } from "./user";

interface MyRadioStrategyConfig {
    myradioBaseUrl: string;
    myradioApiBaseUrl: string;
    websiteBaseUrl: string;
    myradioApiKey: string;
    loginCallbackUrl: string;
    mixins?: Array<"officerships" | "all_officerships" | "personal_data" | "training" | "shows" | "payment">;
    userAgent?: string;
}

type VerifyFunc = (user: MyRadioUser, cb: (err?: Error, user?: any, info?: any) => void) => any;

class MyRadioStrategy extends Strategy.Strategy {
    constructor(private readonly conf: MyRadioStrategyConfig, private readonly verify?: VerifyFunc) {
        super();
    }

    async authenticate(req: express.Request, options: any) {
        if (!("cookie" in req.headers && (req.headers.cookie?.indexOf("PHPSESSID") || -1) > -1)) {
            this.redirect(this.conf.myradioBaseUrl + "/MyRadio/login?next=" + encodeURIComponent(this.conf.loginCallbackUrl));
            return;
        }

        // Forward the request to MyRadio, with cookies included
        const userInfo = await got.get(
            `${this.conf.myradioApiBaseUrl}/v2/user/currentuser?mixins=${this.conf.mixins?.join(",") || ""}&api_key=${this.conf.myradioApiKey}`,
            {
                responseType: "json",
                headers: {
                    Cookie: req.headers.cookie,
                    "User-Agent": this.conf.userAgent || `Passport-MyRadio/${require("../package.json").version}`
                }
            }
        ).json<{
            status: "OK",
            payload: MyRadioUser | null
        } | {
            status: "FAIL",
            payload: string
        }>();
        if (userInfo.status !== "OK") {
            this.error(new Error(userInfo.payload));
            return;
        }

        if (userInfo.payload === null) {
            this.redirect(this.conf.myradioBaseUrl + "/MyRadio/login?next=" + encodeURIComponent(this.conf.loginCallbackUrl));
            return;
        }

        const verifyCallback = (err?: Error | null, user?: any, info?: any) => {
            if (err) {
                this.error(err);
            } else {
                this.success(user, info);
            }
        }

        if (this.verify) {
            this.verify(userInfo.payload, verifyCallback);
        } else {
            verifyCallback(null, userInfo.payload);
        }
    }
}

export = MyRadioStrategy;
