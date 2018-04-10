var express  = require('express');
var path = require('path');
express = require('express');

var NodeAE = require('./sdk/iot-application-services-sdk-nodejs-master');
var nodeAE = new NodeAE();
nodeAE.setBaseURI('appiot-mds');
var app = express();
app.listen(process.env.PORT || 8051, function () {
    console.log('philipslightning app is listening on port 8050!');
  });
  var NodeAE = require('./sdk/iot-application-services-sdk-nodejs-master');
  var nodeAE = new NodeAE();
  nodeAE.setBaseURI('appiot-mds');
  const cron = require('cron');
  
  // set the base URI for the NodeWrapper
  //nodeAE.setBaseURI('appiot-mds'); // 'appiot-mds' = the app of the API we will use in the following
  
  //=============== cronJobForDemo1Device1 =========================
  var cronJobForDemo1Device1 = cron.job("*/60 * * * * *", function () {
      var sThingId = "6CD8528F892641C7997C8BB8A2A5722D";
      var sCurrentTimeStampInMS = (new Date()).getTime();
      var sTimeFromMS = sCurrentTimeStampInMS - (2 * 60000);//"2018-04-01T00:00:30.000Z";
      var sTimeToMS = sCurrentTimeStampInMS - (1 * 60000); //"2018-04-01T07:00:00.000Z";
      var sTimeFrom = (new Date(sTimeFromMS)).toISOString();
      var sTimeTo = (new Date(sTimeToMS)).toISOString();
      var sURL = "/Things('" + sThingId + "')/hcl.mlai.rhlighttest1:pldemoscreenfields/RHHueLight?timerange=" + sTimeFrom + "-" + sTimeTo + "&$orderby=_time";
     // console.log("Device 1 - URL to fetch TimeSeries data = " + sURL);
      var loadingThings = nodeAE.get(sURL);
      loadingThings.then(
          function success(oResponse) {
              var oParsedBodyResponse = JSON.parse(oResponse.body);
              //console.log(oParsedBodyResponse);
              var oDate = new Date();
             // console.info('Device 1 - cron job completed at time = ' + oDate + " & Total records found are = " + oParsedBodyResponse.value.length);
  
              // Condition: If no records: inject a dummy one
              if (oParsedBodyResponse.value.length === 0) {
                  var toBeInsertedTimeFrom = (new Date(sTimeFromMS + 5000)).toISOString();
                  var toBeInsertedTimeTo = (new Date(sTimeToMS - 5000)).toISOString();
                 // console.log("Device 1 - PI is off; Scheduler go and insert the data !")
                  var oDefaultPayload = {
                      "value": [
                          {
                              "_time": toBeInsertedTimeFrom,
                              "connected": false,
                              "rhtest1lighttemp": 0,
                              "brightness": 0,
                              "status": false
                          },
                          {
                              "_time": toBeInsertedTimeTo,
                              "connected": false,
                              "rhtest1lighttemp": 0,
                              "brightness": 0,
                              "status": false
                          }
                      ]
  
                  };
  
                  var sURLForCreate = "/Things('" + sThingId + "')/hcl.mlai.rhlighttest1:pldemoscreenfields/RHHueLight";
                  var insertMissingTimeStamp = nodeAE.put(sURLForCreate, oDefaultPayload);
                  insertMissingTimeStamp.then(
                      function success(oResponse) {
                        //  console.log("Device 1 -Default record inserted; Booyah !!!!s");
                      },
                      function error(err) {
                        //  console.log("Device 1 -Error In Default record insertion;  super crap!!!");
  
                      }
                  );
              } else {
                 // console.log("Device 1 -Scheduler you rest, let PI take care of data ;) !")
              }
  
          },
          function error(oError) {
              //throw oError;
              console.log("Device 1 -Error in Outer method.")
              console.log(oError);
          }
      );
  });
  
  //=============== cronJobForDemo1Device2 =========================
  var cronJobForDemo1Device2 = cron.job("*/60 * * * * *", function () {
      var sThingId = "C3549205A6224B28B2F9C74ABBB74F1F";
      var sCurrentTimeStampInMS = (new Date()).getTime();
      var sTimeFromMS = sCurrentTimeStampInMS - (2 * 60000);//"2018-04-01T00:00:30.000Z";
      var sTimeToMS = sCurrentTimeStampInMS - (1 * 60000); //"2018-04-01T07:00:00.000Z";
      var sTimeFrom = (new Date(sTimeFromMS)).toISOString();
      var sTimeTo = (new Date(sTimeToMS)).toISOString();
      var sURL = "/Things('" + sThingId + "')/hcl.mlai.rhlighttest1:pldemoscreenfields/RHHueLight?timerange=" + sTimeFrom + "-" + sTimeTo + "&$orderby=_time";
      //console.log("Device 2 -URL to fetch TimeSeries data = " + sURL);
      var loadingThings = nodeAE.get(sURL);
      loadingThings.then(
          function success(oResponse) {
              var oParsedBodyResponse = JSON.parse(oResponse.body);
              //console.log(oParsedBodyResponse);
              var oDate = new Date();
            //  console.info('Device 2 -cron job completed at time = ' + oDate + " & Total records found are = " + oParsedBodyResponse.value.length);
  
              // Condition: If no records: inject a dummy one
              if (oParsedBodyResponse.value.length === 0) {
                  var toBeInsertedTimeFrom = (new Date(sTimeFromMS + 5000)).toISOString();
                  var toBeInsertedTimeTo = (new Date(sTimeToMS - 5000)).toISOString();
               //   console.log("Device 2 -PI is off; Scheduler go and insert the data !")
                  var oDefaultPayload = {
                      "value": [
                          {
                              "_time": toBeInsertedTimeFrom,
                              "connected": false,
                              "rhtest1lighttemp": 0,
                              "brightness": 0,
                              "status": false
                          },
                          {
                              "_time": toBeInsertedTimeTo,
                              "connected": false,
                              "rhtest1lighttemp": 0,
                              "brightness": 0,
                              "status": false
                          }
                      ]
  
                  };
  
                  var sURLForCreate = "/Things('" + sThingId + "')/hcl.mlai.rhlighttest1:pldemoscreenfields/RHHueLight";
                  var insertMissingTimeStamp = nodeAE.put(sURLForCreate, oDefaultPayload);
                  insertMissingTimeStamp.then(
                      function success(oResponse) {
                        //  console.log("Device 2 -Default record inserted; Booyah !!!!s");
                      },
                      function error(err) {
                        //  console.log("Device 2 -Error In Default record insertion;  super crap!!!");
  
                      }
                  );
              } else {
                //  console.log("Device 2 -Scheduler you rest, let PI take care of data ;) !")
              }
  
          },
          function error(oError) {
              //throw oError;
              console.log("Device 2 -Error in Outer method.")
              console.log(oError);
          }
      );
  });
  
  //=============== cronJobForDemo1Device3 =========================
  var cronJobForDemo1Device3 = cron.job("*/60 * * * * *", function () {
      var sThingId = "F0FBD353DA874A04920B53390EF5E885";
      var sCurrentTimeStampInMS = (new Date()).getTime();
      var sTimeFromMS = sCurrentTimeStampInMS - (2 * 60000);//"2018-04-01T00:00:30.000Z";
      var sTimeToMS = sCurrentTimeStampInMS - (1 * 60000); //"2018-04-01T07:00:00.000Z";
      var sTimeFrom = (new Date(sTimeFromMS)).toISOString();
      var sTimeTo = (new Date(sTimeToMS)).toISOString();
      var sURL = "/Things('" + sThingId + "')/hcl.mlai.rhlighttest1:pldemoscreenfields/RHHueLight?timerange=" + sTimeFrom + "-" + sTimeTo + "&$orderby=_time";
      //console.log("Device 3 -URL to fetch TimeSeries data = " + sURL);
      var loadingThings = nodeAE.get(sURL);
      loadingThings.then(
          function success(oResponse) {
              var oParsedBodyResponse = JSON.parse(oResponse.body);
              //console.log(oParsedBodyResponse);
              var oDate = new Date();
              //console.info('Device 3 -cron job completed at time = ' + oDate + " & Total records found are = " + oParsedBodyResponse.value.length);
  
              // Condition: If no records: inject a dummy one
              if (oParsedBodyResponse.value.length === 0) {
                  var toBeInsertedTimeFrom = (new Date(sTimeFromMS + 5000)).toISOString();
                  var toBeInsertedTimeTo = (new Date(sTimeToMS - 5000)).toISOString();
                  //console.log("Device 3 -PI is off; Scheduler  go and insert the data !")
                  var oDefaultPayload = {
                      "value": [
                          {
                              "_time": toBeInsertedTimeFrom,
                              "connected": false,
                              "rhtest1lighttemp": 0,
                              "brightness": 0,
                              "status": false
                          },
                          {
                              "_time": toBeInsertedTimeTo,
                              "connected": false,
                              "rhtest1lighttemp": 0,
                              "brightness": 0,
                              "status": false
                          }
                      ]
  
                  };
  
                  var sURLForCreate = "/Things('" + sThingId + "')/hcl.mlai.rhlighttest1:pldemoscreenfields/RHHueLight";
                  var insertMissingTimeStamp = nodeAE.put(sURLForCreate, oDefaultPayload);
                  insertMissingTimeStamp.then(
                      function success(oResponse) {
                        //  console.log("Device 3 -Default record inserted; Booyah !!!!s");
                      },
                      function error(err) {
                        //  console.log("Device 3 -Error In Default record insertion;  super crap!!!");
  
                      }
                  );
              } else {
                //  console.log("Device 3 -Scheduler you rest, let PI take care of data ;) !")
              }
  
          },
          function error(oError) {
              //throw oError;
              //console.log("Device 3 -Error in Outer method.")
              console.log(oError);
          }
      );
  });
  cronJobForDemo1Device1.start();
  cronJobForDemo1Device2.start();
  cronJobForDemo1Device3.start();
  