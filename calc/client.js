const grpc = require("@grpc/grpc-js");
const prompt = require("prompt-sync")({ sigint: true });
const protoLoader = require("@grpc/proto-loader");
const PROTO_PATH = __dirname + "/protos/sum.proto";
const protoSum = require("./protos/sum_pb.js");

// Suggested options for similarity to existing grpc.load behavior
const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});

const calcProto = grpc.loadPackageDefinition(packageDefinition);

const client = new calcProto.Sum(
  "localhost:50051",
  grpc.credentials.createInsecure()
);

const runSummationSerive = () => {
  //With readline
  let num1 = prompt("Enter Num1? ").trim();
  let num2 = prompt("Enter Num2? ").trim();

  num1 = Number(num1) ? Number(num1) : 0;
  num2 = Number(num2) ? Number(num2) : 0;

  const request = new protoSum.Request();
  request.setNum1(num1);
  request.setNum2(num2);

  client.sum(request.toObject(), function (err, response) {
    console.log("Summation is", response.sum);
  });
};

runSummationSerive();
