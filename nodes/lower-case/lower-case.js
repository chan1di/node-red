module.exports = function(RED) {
    function LowerCaseNode(config) {
        RED.nodes.createNode(this,config);
        var node = this;
        this.on('input', function(msg) {
            msg.payload = msg.payload.toLowerCase();
            node.send(msg);
        });
    }
    RED.nodes.registerType("lower-case",LowerCaseNode);
}

//RED.nodes.createNode = To create node;
//input = event called whenever a message arrives at the node;
//node.send(msg)= To pass the message on in the flow
//RED.nodes.registerType("lower-case",LowerCaseNode) = To register node--> first para indicates the name of the node and second one function 