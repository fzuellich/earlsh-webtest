casper.options.timeout = 7000; // set timeout otherwise tests might not work

casper.test.begin('The Earlsh admin interface is reachable and protected', 1, function(test) {
    
    casper.start('http://earlsh.zuellich.de/admin/list', function() {
        test.assertHttpStatus(401, 'admin interface denies access without credentials');
    });

    casper.then(function() {
        test.done();
    });

});

casper.test.begin('The Earlsh admin interface does not use default credentials from github', 1, function(test) {
    
    casper.start(function() {
        casper.setHttpAuth('admin', 'somethingrandom');
    });

    casper.thenOpen('http://earlsh.zuellich.de/admin/list', function() {
        test.assertHttpStatus(401, 'admin interface denies access to github credentials');
    });

    casper.then(function() {
        test.done();
    });
});

casper.run();
