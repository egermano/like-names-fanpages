// App
var casper = require('casper').create({
    logLevel: "debug",              // Only "info" level messages will be logged
    onError: function(self, m) {   // Any "error" level message will be written
        console.log('FATAL:' + m); // on the console output and PhantomJS will
        self.exit();               // terminate
    },
    pageSettings: {
        loadImages:  false,        // The WebPage instance used by Casper will
        loadPlugins: false         // use these settings
    }
});

// User data
var fbCredentials = {
    email: casper.cli.get("email"),
    pass: casper.cli.get("pass"),
    pageID : casper.cli.get("page-id")
};
var likeNames = [];

casper.start('http://facebook.com/', function(){
    this.fill('form#login_form', {
        'email': fbCredentials.email,
        'pass' : fbCredentials.pass
    }, true);
});

casper.then(function() {
    this.open('https://www.facebook.com/browse/page_fans/?page_id=' + fbCredentials.pageID);
});

casper.then(function() {
    fbCredentials.fanpageName = this.evaluate(function(){return document.querySelector('h2.uiHeaderTitle').innerText;});
});

casper.then(function() {
    this.waitFor(function() {
        return casper.exists('#u_0_0 ul.uiList li.uiListItem div.uiProfileBlockContent a');
    }, function() {
        likeNames = casper.evaluate(function () {
            var links = document.querySelectorAll('#u_0_0 ul.uiList li.uiListItem div.uiProfileBlockContent a');
            // var links = document.querySelectorAll('a');
            return Array.prototype.map.call(links, function(e) {
                return {name: e.innerText, url: e.getAttribute('href')};
                // return e.getAttribute('href')
            });
        }); 
    });
})

casper.run(function() {
    this.echo(fbCredentials.fanpageName);
    
    for(var i = 0 in likeNames) {
        this.echo(likeNames[i].name+'\t'+likeNames[i].url);
    }

    this.exit();
});