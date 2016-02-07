// default timeout for earlsh related requests in ms
var EARLSH_TIMEOUT = 20000;

casper.test.begin('The Earlsh instance is reachable and the frontend looks as expected', 18, function(test) {
    casper.start('http://earlsh.zuellich.de/', function() {
        test.assertHttpStatus(200);
        test.assertTitleMatch(/^earlsh .*/, 'title contains earlsh');
    });

    casper.then(function() {
        test.comment('Checking frontend elements');
        test.assertVisible('img[alt="earlsh"]', 'earlsh logo is found');
        test.assertVisible('h2', 'headline is found');
        test.assertSelectorHasText('h2', 'Shorten an url', 'h2 has correct text');
        test.assertVisible('form#shorten-form', 'short url form is found');
        test.assertVisible('input#form_url', 'url input is found');
        test.assertVisible('button#form_save', 'save button is found');
        test.assertVisible('footer a', 'link in footer is found');
    });

    casper.then(function() {
        test.comment('Checking shorten function');
        casper.fillSelectors('form#shorten-form', {
            'input#form_url': 'http://www.google.com'
        }, true);

        casper.waitForUrl(/shorturl\/[a-z]?/, function() {
            test.assertHttpStatus(200);
            test.pass(casper.getCurrentUrl());
        }, EARLSH_TIMEOUT);
    });

    casper.then(function() {
        test.comment('Checking shorten result page');
        test.assertVisible('img[alt="earlsh"]', 'earlsh logo is found');
        test.assertVisible('h2', 'headline is found');
        test.assertSelectorHasText('h2', 'Your token', 'h2 has correct test');
        test.assertVisible('p.well i', 'token result is found');

        var shorturl = casper.fetchText('p.well i')
        test.assertMatch(shorturl, /\/r\/[a-z]+$/, 'shorturl reference looks good');
    });

    casper.then(function() {
        test.comment('Checking that shorturl reference resolves');
        
        var shorturl = casper.fetchText('p.well i')
        casper.open(shorturl).then(function() {
            test.assertHttpStatus(200, 'status code of reference url ok');
            casper.waitForUrl(/http:\/\/www\.google\..*/, function() {
                test.pass('shorturl reference resolves correctly');
                test.done();
            }, function() {
                test.fail('shorturl reference resolves wrongly. url is ' + casper.getCurrentUrl()); 
            }, EARLSH_TIMEOUT);
        });
    });
});
    
casper.run();
