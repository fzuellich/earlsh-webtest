casper.test.begin('The Earlsh admin interface is reachable and protected', 1, function(test) {
    
    casper.start('http://earlsh.zuellich.de/admin/list', function() {
        test.assertHttpStatus(401, 'admin interface denies access without credentials');
    }).run(function() {
        test.done();
    });
});

