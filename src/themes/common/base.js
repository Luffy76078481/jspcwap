
import React, { Component } from 'react';

export default class BaseRequirement {
    rs = {}
    roptions = {}
    get(name) {
        var v = this.rs[name];
        if (!v) {
            return null;
        }
        return v;
    }
    r(name, c, options) {
        this.rs[name] = c;
        this.roptions[name] = options || {};
        return this;
    }
    props(name) {
        return this.roptions[name] || {};
    }
}