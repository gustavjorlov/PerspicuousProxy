# PrettyProxy
Buzzword driven proxy for monitoring requests visually while getting the opportunity to interfere with the activity in a fun way

## Usage
1. Run `npm run build` (wait for ages, it will download a lot of stuff and build the application)
2. Run `npm start` (or run `npm run start:fiddler` to make the proxy send all requests to your fiddler at port 8888)

Now you are able to view the Pretty Proxy view in your browser at `http://localhost:9999`.
Use `http://localhost:3000` as proxy when making requests from your application / server.

Use the buttons to set the level of requests that should timeout (not get a response at all)

Watch the requests come and some stats about them. Enjoy!

## Todo
Implement more types of "failing" requests, both UI for it and also proxy logic for that.
