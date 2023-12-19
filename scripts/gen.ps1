foreach ( $project in $args ) {
    # Generate gRPC and Protobuf code for ${PROJECT}/${PROJECT}.proto
    # (eg: greet/greet.proto)
    ./node_modules/.bin/grpc_tools_node_protoc -I $project/business.user.hour/proto                                       `
    --js_out=import_style=commonjs:$project/business.user.hour/proto                                  `
    --grpc_out=grpc_js:$project/business.user.hour/proto                                              `
    $project/business.user.hour/proto/businessuserhour.proto;
    # Generate only Protobuf code for all the other .proto files (if any)
    # (eg: calculator/sum.proto)
    Get-ChildItem -Filter *.proto -Recurse $project/business.user.hour/proto -Exclude $project/business.user.hour/.proto | ForEach-Object { `
        $file = "./$project/business.user.hour/proto/" + $_.Name;                                  `
        ./node_modules/.bin/grpc_tools_node_protoc -I $project/business.user.hour/proto                                    `
        --js_out=import_style=commonjs:$project/business.user.hour/proto                               `
        $file `
    }
}
# foreach ( $project in $args ) {
#     # Generate gRPC and Protobuf code for ${PROJECT}/${PROJECT}.proto
#     # (eg: greet/greet.proto)
#     ./node_modules/.bin/grpc_tools_node_protoc -I $project/proto                                       `
#     --js_out=import_style=commonjs:$project/proto                                  `
#     --grpc_out=grpc_js:$project/proto                                              `
#     $project/proto/business.user.hour.proto;
#     # Generate only Protobuf code for all the other .proto files (if any)
#     # (eg: calculator/sum.proto)
#     Get-ChildItem -Filter *.proto -Recurse $project/proto -Exclude $project.proto | ForEach-Object { `
#         $file = "./$project/proto/" + $_.Name;                                  `
#         ./node_modules/.bin/grpc_tools_node_protoc -I $project/proto                                    `
#         --js_out=import_style=commonjs:$project/proto                               `
#         $file `
#     }
# }