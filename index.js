var npmWrapper = require("grunt-npm-helper/lib/npm-wrapper");
var jsonTransform = require('gulp-json-transform');
var gutil = require('gulp-util');
var gulp = require('gulp');
var publishDeps = [];
module.exports = function(config){
    config = config || {};
    config.user = config.user || undefined;
    config.password = config.password ||  undefined;
    config.buildVersion = config.buildVersion || undefined;
    config.email = config.email || undefined;
    config.strictSsl = config.strictSsl || true;
    config.registry = config.registry || "https://registry.npmjs.org/";
    config.npmObj = config.npmObj || {
                registry: config.registry ,
                "strict-ssl": config.strictSsl,
                username: config.user,
                "_password": config.password,
                loglevel: "http",
                email: config.email
            };

if(config.buildVersion){
    gulp.task('packageJson-mutateVersion', function() {
	gulp.src("./package.json")
	.pipe(jsonTransform((data)=> {
		data.version = config.buildVersion;
        return data;
	}))
	.pipe(gulp.dest('.'));
});    
publishDeps.push('packageJson-mutateVersion');
}
else{
    gutil.log('No build version passed, packageJson-mutateVersion task omitted')
}


gulp.task('npm-install', function(cb){
   
    npmWrapper(
            ["install"], 
            config.npmObj,
            cb);
   
    
});

gulp.task('npm-publish', publishDeps, (callback)=>{
     if(config.user && !config.password){
        gutil.log('username specified but no password specified');
        process.exit(1);
     }
     if(!config.password && config.user){
         gutil.log('password specified but no password specified');
        process.exit(1);
     }
     
     npmWrapper(
            ["publish"], 
            config.npmObj,
            callback
    );
});
    
    
}
