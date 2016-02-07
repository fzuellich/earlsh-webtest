casper.test.begin('The Earlsh admin interface does not use default credentials from github', 1, function(test) {
    casper.start().then(function() {
        casper.setHttpAuth('admin', 'somethingrandom');
    }).thenOpen('http://earlsh.zuellich.de/admin/list', function() {
        test.assertHttpStatus(401, 'admin interface denies access without credentials');
    }).run(function() {
        test.done();
    });
});

