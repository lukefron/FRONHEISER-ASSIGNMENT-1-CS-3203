// import other routes
const tweetRoutes = require('./tweets');

const appRouter = (app, fs) => {

    // default route
    app.get('/', function(req, res) {
        res.sendFile('/Users/lukefronheiser/Desktop/CS-3203/testApp/html/index.html');
      });
    // // other routes
    tweetRoutes(app,fs);
};
module.exports = appRouter;