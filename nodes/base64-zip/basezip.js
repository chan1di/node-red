module.exports = function(RED) {
    "use strict";


    var compression = require('compression');
    var zip = new require('node-zip')();
    var connect = require('connect');
    var fs = require("fs");
    var express = require('express');
    var path = require('path');


    function Base64Node(n) {
        RED.nodes.createNode(this, n);
        var node = this;
        this.on("input", function(msg) {
            if (msg.hasOwnProperty("payload")) {
                if (Buffer.isBuffer(msg.payload)) {
                    // Take binary buffer and make into a base64 string
                     msg.lara = {};
                    msg.lara.name = msg.payload.name;


                    // Take binary buffer and make into a base64 string
                    msg.lara.name = msg.payload.toString('base64');


                    // Make a ZIP file 
                    var fs = require("fs");
                    zip.file('chandresh.txt', msg.lara.name);
                    var data = zip.generate({
                        base64: false,
                        compression: 'DEFLATE'
                    });
                    msg.lara.zipped = data;
                    node.warn(msg.lara.zipped, "done.........................");
                    fs.writeFileSync('chandresh.zip', data, 'binary');

                    // var zip = new require('node-zip')(msg.lara.zipped, {base64: false, checkCRC32: true});
                    // msg.lara.unzipped = zip;
                    // node.warn(msg.lara.unzipped);
                    // node.warn(msg.lara.unzipped.files['test.file']); // hello there


                    node.warn(msg.lara.name);
                    node.send(msg);
                } else if (typeof msg.payload === "string") {
                    // Take base64 string and make into binary buffer
                    var regexp = new RegExp('^[A-Za-z0-9+\/=]*$');
                    if (regexp.test(msg.payload) && (msg.payload.length % 4 === 0)) {
                        msg.payload = new Buffer(msg.payload, 'base64');
                        node.send(msg);
                    }
                    // else {
                    //     //node.log("Not a Base64 string - maybe we should encode it...");
                    //     msg.payload = (new Buffer(msg.payload,"binary")).toString('base64');
                    //     node.send(msg);
                    // }
                } else {
                    node.warn("This node only handles strings or buffers.");
                }
            } else {
                node.warn("No payload found to process");
            }
        });
    }
    RED.nodes.registerType("Base64zip", Base64Node);
}
