/*
 * Please see the included README.md file for license terms and conditions.
 */


// This file is a suggested starting place for your code.
// It is completely optional and not required.
// Note the reference that includes it in the index.html file.


/*jslint browser:true, devel:true, white:true, vars:true */
/*global $:false, intel:false app:false, dev:false, cordova:false */



// This file contains your event handlers, the center of your application.
// NOTE: see app.initEvents() in init-app.js for event handler initialization code.

function myEventHandler() {
    "use strict";

    var ua = navigator.userAgent;
    var str;

    if (window.Cordova && dev.isDeviceReady.c_cordova_ready__) {
        str = "It worked! Cordova device ready detected at " + dev.isDeviceReady.c_cordova_ready__ + " milliseconds!";
    } else if (window.intel && intel.xdk && dev.isDeviceReady.d_xdk_ready______) {
        str = "It worked! Intel XDK device ready detected at " + dev.isDeviceReady.d_xdk_ready______ + " milliseconds!";
    } else {
        str = "Bad device ready, or none available because we're running in a browser.";
    }

    console.log(str);
}


// ...additional event handlers here...

function thirdPartyEmulator() {
    alert("This feature uses a third party barcode scanner plugin. Third party plugins are not supported on emulator or app preview. Please build app to test.");
}

function searchid() {
    
    var studentid = document.getElementById('id_txt').value;
    var ustudentid = studentid.toUpperCase();
    var regexp = "^[S][0-9]{8}$";
    if( ustudentid && ustudentid.match(regexp) ) {
        document.getElementById("content").innerHTML='<object type="text/html" data="https://sols1.usp.ac.fj/oreg/validateid.pl?id='+ustudentid+'" style="width: 90%; width: 90vw; height:90vh;"></object>';
        searchlogins(ustudentid);
    }else{
        alert('Please Enter Correct Student ID');
    }
    
    
}

function searchlogins(sid) {
    
    var deviceID = device.uuid;
    
    $.getJSON("https://sols1.usp.ac.fj/oreg/insertshistory.pl?id="+sid+"&uuid="+deviceID, function(data){
        console.log( data.a );
    });
    
}

function checkConnection() {
    var networkState = navigator.connection.type;

    var states = {};
    states[Connection.UNKNOWN]  = 'Unknown connection';
    states[Connection.ETHERNET] = 'Ethernet connection';
    states[Connection.WIFI]     = 'WiFi connection';
    states[Connection.CELL_2G]  = 'Cell 2G connection';
    states[Connection.CELL_3G]  = 'Cell 3G connection';
    states[Connection.CELL_4G]  = 'Cell 4G connection';
    states[Connection.CELL]     = 'Cell generic connection';
    states[Connection.NONE]     = 'No network connection';

    var clientip;
    $.getJSON("https://api.ipify.org/?format=json", function(e) {
        clientip = e.ip;
        
    });    
    
    alert(clientip.substring(0,7));
    if(states[networkState] != 'WiFi connection' || clientip.substring(0,7) != '144.120'){
        document.write("This app is not allowed on current network!!<br/><br/>Current Network: "+states[networkState]+"<br/><br/>IP Address: "+clientip);
    }
    
    var deviceID = device.uuid;
    
    $.getJSON("https://sols1.usp.ac.fj/oreg/getphonedetl.pl?id="+deviceID, function(data){
        if(data[0].phactive == '0'){
            document.write("Your phone is not authorised to access this app!!<br/><br/>Device ID: "+deviceID);
        }
    });
}

function scan() {
    
    
    "use strict";
    var fName = "scan():";
    console.log(fName, "entry");
    try {
        if (window.tinyHippos) {
            thirdPartyEmulator();
            console.log(fName, "emulator alert");
        } else {
            cordova.plugins.barcodeScanner.scan(
                function (result) {
                    console.log(fName, "Scanned result found!");
                    searchlogins(result.text);
                    document.getElementById("content").innerHTML='<object type="text/html" data="https://sols1.usp.ac.fj/oreg/validateid.pl?id='+result.text+'" style="width: 90%; width: 90vw; height:90vh;"></object>';
                },
                function (error) {
                    alert("Scanning failed: " + error);
                }
            );
        }
    } catch (e) {
        console.log(fName, "catch, failure");
    }

    console.log(fName, "exit");
}


