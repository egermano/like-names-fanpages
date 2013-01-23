Like Names FB Fanpage
===================

Export names of likers a fanpage that you are administrator.

Instalation
-----------
Instalation for macosx, for other OS access [instalation page](http://casperjs.org/installation.html) of [CasperJS](http://casperjs.org/index.html).

    $ brew install casperjs
    $ git clone git@github.com:egermano/like-names-fanpages.git

Usage
----------

You will need pass for the script your email and password of facebook account and the ID of fanpage.
The execution of script looks like this:

    $ casperjs like-name.js --email=your@email.com --pass=yourpass --page-id=999999999999


To export results into a text file you can run like these:

    $ casperjs like-name.js --email=your@email.com --pass=yourpass --page-id=999999999999 >> likers.txt


I hope I helped in something.
