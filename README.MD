# Desbot Structure

## Description
So what I'm trying to do is structure a project that will have a Client and Server that builds with different settings.
1. Client: Runs in the browser and/or a browser source in OBS, so target: `ES2019` and module: `ESNext`
2. Server: Runs in Node.js, so target: `ESNext` and module: `NodeNext`

Both of these projects rely on a shared folder of classes that should be built twice, once for each target.

I'm trying to do this with a single tsconfig file, so that it will work smoothly with JetBrains IDEs, at least this is what I think will make it work.

## Current state
The problem I have is that I get this error from running just `tsc` in `/app`: 
```
error TS6305: Output file 'D:/apps/desbot_structure/app/types/server/Shared/Utils.d.ts' has not been built from source file 'D:/apps/desbot_structure/app/src/Shared/Utils.ts'.
  The file is in the program because:
    Matched by default include pattern '**/*'
```
I've tried a bunch of things to resolve this which is why the declarations are written to `/types`, even then it gives me the above error. 
I'm starting to think it is due to the `Shared` folder building twice with the `composite` option enabled, required when using `references`, which will write `tsconfig.*.tsbuildinfo` files, and I believe they are cross-referenced for the same source file to cause this error.

## Steps to reproduce
To experience the error, navigate to /app and run `tsc` and it should throw the aforementioned error.

To build the referenced configs, run the below, and it should output files successfully:
```
tsc --project .\src\tsconfig.client.json
tsc --project .\src\tsconfig.server.json
```

## Help

This is the fourth attempt at making a structure that will work for porting a sizeable project to run in Node.js while also hosting a browser based component, and I'm running out of sanity to get this to work.

I'll add more real code to the sample classes soon, so the server actually hosts something that runs the client code. In the end I might just end up making a build script and scrap the singular `tsconfig.json` concept.