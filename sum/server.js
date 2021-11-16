const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");
const PROTO_PATH = __dirname + "/protos/sum.proto";
const protoSum = require('./protos/sum_pb.js');

// Suggested options for similarity to existing grpc.load behavior
const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true,
});

const sum_proto = grpc.loadPackageDefinition(packageDefinition);

function sum(call, callback) {
    const response = new protoSum.Response(); 
    response.setSum(call.request.num1 + call.request.num2);
    callback(null, response.toObject());
}

var server = new grpc.Server();

server.addService(sum_proto.Sum.service, {
    sum,
});

server.bindAsync(
    "0.0.0.0:50051",
    grpc.ServerCredentials.createInsecure(),
    () => {
        server.start();
    }
);
