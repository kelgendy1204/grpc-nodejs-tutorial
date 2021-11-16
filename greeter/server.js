const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");
const greet = require("./protos/greet_pb");

const reply = new greet.HelloReply();

const PROTO_PATH = __dirname + "/./protos/greet.proto";
const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});
const protoDescriptor = grpc.loadPackageDefinition(packageDefinition);

function sayHello(call, callback) {
  reply.message = "Hello " + call.request.name;
  callback(null, reply);
}

function sayHelloAgain(call, callback) {
  reply.message = "Hello again, " + call.request.name;
  callback(null, reply);
}

const server = new grpc.Server();
server.addService(protoDescriptor.Greeter.service, {
  sayHello,
  sayHelloAgain,
});
server.bindAsync(
  "0.0.0.0:50051",
  grpc.ServerCredentials.createInsecure(),
  () => {
    server.start();
  }
);
