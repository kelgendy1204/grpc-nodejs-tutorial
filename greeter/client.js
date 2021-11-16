var grpc = require("@grpc/grpc-js");
var protoLoader = require("@grpc/proto-loader");
const greet = require("./protos/greet_pb");

const request = new greet.HelloRequest();

var PROTO_PATH = __dirname + "/./protos/greet.proto";
var packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});
const protoDescriptor = grpc.loadPackageDefinition(packageDefinition);
// The protoDescriptor object has the full package hierarchy
// var routeguide = protoDescriptor.routeguide;

const client = new protoDescriptor.Greeter(
  "localhost:50051",
  grpc.credentials.createInsecure()
);

request.name = 'Khaled';
client.sayHello(request, function (_err, response) {
  console.log("Greeting:", response.message);
});

request.name = 'Khaled Saad';
client.sayHelloAgain(request, function (_err, response) {
  console.log("Greeting:", response.message);
});
