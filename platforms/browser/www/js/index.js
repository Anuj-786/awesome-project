/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
 var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
        this.contents={};
        this.pictureSource={};
        this.destinationType={};
        this.options = {
            quality:50,
            //destinationType: Camera.DestinationType.FILE_URI,
            //encodingType: Camera.EncodingType.JPEG,
            //mediaType: Camera.MediaType.PICTURE,
            allowEdit: false,
            correctOrientation: true,
            saveToPhotoAlbum: true,
        };
        this.qOptions = {
            "preferFrontCamera" : false,
            "showFlipCameraButton" : true,
            "orientation" : "landscape"
        };
    },
    // Bind Event Listeners
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        // receiving event receivedEvent
        app.receivedEvent('deviceready');
        // calling the html tag by using ID
        app.contents = document.getElementById("test");
        // Adding the event listener for batterystatus
        window.addEventListener("batteryStatus", app.onBatteryStatus, false);
        // adding the listener for camera
        navigator.camera.getPicture(app.onSuccess, app.onError, app.options);
        // Event for device status
        app.contents.innerHTML += "Your device is :" +device.cordova+ "  Your device model is :" +device.model+ "  Your device version is :" +device.version;
        // setting the picture sourece type for cammera
        pictureSource = navigator.camera.PictureSourceType;
        // setting the destination type for cammera
        destinationType = navigator.camera.DestinationType;  
        //cordova.plugins.BarcodeScanner.scan(app.scanCode, app.encodeData, app.qOptions);
        app.scanCode();
        app.encodeData();
        
    },
    scanCode: function(){
        cordova.plugins.barcodeScanner.scan(
            function(result){
                alert("Scanned Code: " + result.text 
                    + ". Format: " + result.format
                    + ". Cancelled: " + result.cancelled);
            }, 
            function(error){
                alert("Scan failed: " + error);
            }
            );
    },

    encodeData: function(){
        var data = document.getElementById("data").value;
        if (data != ''){
            cordova.plugins.barcodeScanner.encode(
                BarcodeScanner.Encode.TEXT_TYPE, data, 
                function(success){
                    alert("Encode success: " + success);
                }, 
                function(fail){
                    alert("Encoding failed: " + fail);
                }
                );
        }
        else{
            alert("Please enter some data.");
            return false;
        }
    },
    // defining the method o Success
    onSuccess: function(imageURI) {
        // storing the MyImage into image var
        var image = document.getElementById("myImage");
        // styling for image
        image.style.display = 'block';
        // image source
        image.src = imageURI;
        // printing the source of image for checking only
        console.log(image.src);
    },
    // defining error function for cammera 
    onError: function() {
        // print this error message when error in function onSuccess 
        console.log("failed to load camera");
    },
    // defining batterystatus method
    onBatteryStatus: function(status) {
        // printing the batter ystatus into html tag 
        app.contents.innerHTML +="Your Battery lavel is: " +" "+ +status.level+"%" +"Is Plugged: "+ +status.isPlugged;
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {

        var parentElement = document.getElementById(id);

        var listeningElement = parentElement.querySelector('.listening');

        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');

        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};

app.initialize();
