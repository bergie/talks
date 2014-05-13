---
title: Flow-Based Programming for JavaScript
location: Verona, Italy
---
Flow-Based Programming for JavaScript
=====================================

![NoFlo](../../assets/2013/noflo-white.svg)

## Call-Return

    var value = someFunction(param);
    // Here we wait until this completes

## Continuation Passing Style

    someFunction(param, function (value) {
      // Our callback gets called once the
      // function completes
    });

## Callback Christmas Tree

    asncFunction1(function(err, result) {
      asncFunction2(function(err, result) {
        asncFunction3(function(err, result) {
          asncFunction4(function(err, result) {
            asncFunction5(function(err, result) {
              // do something useful
            })
          })
        })
      })
    });

![Underground map](../../assets/2013/underground-map.png)

![J. Paul Morrison](../../assets/2013/paul-morrison.jpg)

![The FBP book](../../assets/2013/fbp-book.png)

![IBM Collator](../../assets/2014/collator.png)
![IBM flowcharts](../../assets/2014/flowchart.png)

![Alan Kay](../../assets/2013/alan-kay.png)

> I thought of objects being like biological cells and/or individual computers on a network, only able to communicate with messages

![Usenix](../../assets/2013/usenix.jpg)

> This is the Unix philosophy: 
Write programs that do one thing and do it well. 
Write programs to work together. 
Write programs to handle text streams, because that is a universal interface.
      
## Unix shell &#8594; FBP in 1D

    $ ps -ef | grep firefox \
      | grep -v grep \
      | awk '{print $2}' \
      | xargs kill -9

![NoFlo roadtrip](../../assets/2013/noflo-california-1.jpg)

![Jekyll built in NoFlo](../../assets/2014/noflo-jekyll.png)

![NoFlo Photobooth](../../assets/2014/noflo-photobooth.png)

![NoFlo Kickstarter](../../assets/2013/noflo-kickstarter-finished.png)

![NoFlo and GNOME](../../assets/2014/noflo-gnome-ui.png)
![MicroFlo simulator](../../assets/2014/microflo-sim1.gif)

![Ingress Table](../../assets/2014/ingress-table-render.jpg)
![Ingress Table debugging](../../assets/2014/ingress-table-test2.gif)

![Flowhub public beta](../../assets/2014/flowhub-beta.png)

* [noflojs.org](http://noflojs.org)
* [flowhub.io](http://flowhub.io)
