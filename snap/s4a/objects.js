// init decorator

SpriteMorph.prototype.originalInit = SpriteMorph.prototype.init;
SpriteMorph.prototype.init = function(globals) {
    var myself = this;

    myself.originalInit(globals);

    myself.arduino = {
        board : undefined,	// Reference to arduino board - to be created by new firmata.Board()
        connecting : false,	// Flag to avoid multiple attempts to connect
        disconnecting : false,  // Flag to avoid serialport communication when it is being closed
        justConnected : false	// Flag to avoid double attempts
       //testValue:[0,1,2,3]
    };

    myself.codrone = {

       intervalTimer : int = 0,
       connectingStep : int  = -1,
       exConnectingStep : int = -1,
       selectedDeviceIndex : int = -1,
       msgBtnStatus : int = 0,
       sendPacketNumber : int = 0,
       receiveDtype : int = 0,
       receiveLength : int = 0,
       receiveLinkState : int = 0,
       receiveLinkMode : int = 0,
       receiveEventState : int = 0,
       devRssi0 : int = 0,
       devRssi1 : int = 0,
       devRssi2 : int = 0,
       devCount : int = 0,
       msgBtnExist : int = 0,
       alarmTxt : undefined,
       devAddress0 : new Buffer('utf8'),
       devAddress1 : new Buffer('utf8'),
       devAddress2 : new Buffer('utf8'),
       devName0 : new Buffer('utf8'),
       devName1 : new Buffer('utf8'),
       devName2 : new Buffer('utf8'),
       devFind : new Buffer('utf8'),
       recvData : new Buffer('utf8'),
       packetLength : int = 0,
       packetReceiving: false,
       packetMachine : undefined,
       categoryChange : false,

    };

    myself.arduino.disconnect = function(silent) {

        if (this.isBoardReady()) { // Prevent disconnection attempts before board is actually connected
            this.connecting = false;
            this.justConnected = false;
            myself.arduino.packetSender(false);
            myself.codrone.msgBtnStatus = 0;
            myself.codrone.intervalTimer = 0,
            myself.codrone.connectingStep  = -1,
            myself.codrone.exConnectingStep = -1,
            myself.codrone.selectedDeviceIndex  = -1,
            myself.codrone.msgBtnStatus  = 0,
            myself.codrone.sendPacketNumber = 0,
            this.board.close();
            this.closeHandler(silent);
        } else if (!this.board) {  // Don't send info message if the board has been connected
            if (!silent) {
                ide.inform(myself.name, localize('Board is not connected'))
            }
        }
    }

    // This should belong to the IDE
    myself.arduino.showMessage = function(msg) {
        if (!this.message) { this.message = new DialogBoxMorph() };

        var txt = new TextMorph(
                msg,
                this.fontSize,
                this.fontStyle,
                true,
                false,
                'center',
                null,
                null,
                MorphicPreferences.isFlat ? null : new Point(1, 1),
                new Color(255, 255, 255)
                );

        if (!this.message.key) { this.message.key = 'message' + myself.name + msg };

        this.message.labelString = myself.name;

        if(myself.codrone.msgBtnExist == 1) {
          this.message.addButton(
              function () {
                console.log("msgButton: OK");
                myself.codrone.msgBtnStatus = Process.prototype.buttonStat.pushingOK;
                myself.arduino.hideMessage();
              },
              'OK'
          );
        }
        else if(myself.codrone.msgBtnExist == 2) {
          this.message.addButton(
              function () {
                console.log("msgButton: OK");
                myself.codrone.msgBtnStatus = Process.prototype.buttonStat.pushingOK;
                myself.arduino.hideMessage();
              },
              'OK'
          );
          this.message.addButton(
              function () {
                console.log("msgButton: Cancel");
                myself.codrone.msgBtnStatus = Process.prototype.buttonStat.pushingCancel;
                myself.arduino.hideMessage();
              },
              'Cancel'
          );
        }

        this.message.createLabel();
        if (msg) { this.message.addBody(txt) };
        this.message.drawNew();
        this.message.fixLayout();
        this.message.popUp(world);
        this.message.setCenter(world.center());
        this.message.show();
    }

    myself.arduino.hideMessage = function() {
        if (this.message) {
            this.message.cancel();
            this.message = null;
        }
    }

    myself.arduino.attemptConnection = function() {

        if (!this.connecting) {
            //if (this.board === undefined) {
                // Get list of ports (Arduino compatible)
                var ports = world.Arduino.getSerialPorts(function(ports) {
                    // Check if there is at least one port on ports object (which for some reason was defined as an array)
                    if (Object.keys(ports).length == 0) {
                        ide.inform(myself.name, localize('Could not connect an device\nNo boards found'));
                        return;
                    } //else if (Object.keys(ports).length == 1) {
                        //myself.arduino.connect(ports[Object.keys(ports)[0]]);}
                      else if (Object.keys(ports).length >= 1) {
                        var portMenu = new MenuMorph(this, 'select a port');
                        Object.keys(ports).forEach(function(each) {
                            portMenu.addItem(each, function() {
                                myself.arduino.connect(each);
                            })
                        });
                        portMenu.popUpAtHand(world);
                    }
                });
        //    } else {
          //      ide.inform(myself.name, localize('There is already a board connected to this sprite'));
            //}
        }
        else {ide.inform(myself.name, localize('There is already a board connected to this sprite')); }

        if (this.justConnected) {
            this.justConnected = undefined;
            return;
        }

    }

    myself.arduino.closeHandler = function(silent) {

        var portName = 'unknown',
            thisArduino = myself.arduino;

        if (thisArduino.board) {
            portName = thisArduino.board.path;
            thisArduino.board = undefined;
        };

        world.Arduino.unlockPort(thisArduino.port);
        thisArduino.connecting = false;
        thisArduino.disconnecting = false;

        if (thisArduino.disconnected & !silent) {
            myself.arduino.hideMessage();
            ide.inform(myself.name, localize('Board was disconnected from port\n') + portName + '\n\nIt seems that someone pulled the cable!');
            thisArduino.disconnected = false;
        } else if (!silent) {
            myself.arduino.hideMessage();
            ide.inform(myself.name, localize(myself.codrone.alarmTxt + 'Board was disconnected from port\n') + portName);
        }
    }

    myself.arduino.disconnectHandler = function() {
        // This fires up when the cable is plugged, but only in recent versions of the serialport plugin
        myself.arduino.disconnected = true;
    }

    myself.arduino.errorHandler = function(err) {
        ide.inform(myself.name, localize('An error was detected on the board\n\n') + err, myself.arduino.disconnect(true));
    }

    myself.arduino.packetSender = function(stat) {
      var temp = 0;

      if(stat == true)  myself.codrone.packetMachine = setInterval(function() {

        Process.prototype.packetTable.loopExit = false;

        while(Process.prototype.packetTable.loopExit == false) {

          switch( Process.prototype.packetTable.sendCounter ) {

            case Process.prototype.packetTable.control :
            if( Process.prototype.packetTable.controlSendEn > 0) {
                Process.prototype.packetTable.controlSendEn--;
                myself.arduino.board.write( Process.prototype.Packets.controlPacket, function() {
                myself.arduino.board.drain();
              });
            Process.prototype.packetTable.loopExit = true;
            }
            break;

            case Process.prototype.packetTable.flight :
            if( Process.prototype.packetTable.flightSendEn > 0 ) {
                Process.prototype.packetTable.flightSendEn--;
                myself.arduino.board.write( Process.prototype.Packets.flightPacket, function() {
                myself.arduino.board.drain();
              });
            Process.prototype.packetTable.loopExit = true;
            }
            break;

            case Process.prototype.packetTable.state :
            if( Process.prototype.packetTable.stateSendEn > 0 ) {
                Process.prototype.packetTable.stateSendEn--;
                myself.arduino.board.write( Process.prototype.Packets.statePacket, function() {
                myself.arduino.board.drain();
              });
            Process.prototype.packetTable.loopExit = true;
            }
            break;

            case Process.prototype.packetTable.attitude :
            if( Process.prototype.packetTable.attitudeSendEn > 0 ) {
                console.log("attitude packet send: "+ Process.prototype.packetTable.sendCounter + " " + temp);
                temp++;
                Process.prototype.packetTable.attitudeSendEn--;
                myself.arduino.board.write( Process.prototype.Packets.attitudePacket, function() {
                myself.arduino.board.drain();
              });
            Process.prototype.packetTable.loopExit = true;
            }
            break;

            case Process.prototype.packetTable.gyroBias :
            if( Process.prototype.packetTable.gyroBiasSendEn > 0 ) {
                Process.prototype.packetTable.gyroBiasSendEn--;
                myself.arduino.board.write( Process.prototype.Packets.gyroBiasPacket, function() {
                myself.arduino.board.drain();
              });
            Process.prototype.packetTable.loopExit = true;
            }
            break;

            case Process.prototype.packetTable.trimAll :
            break;

            case Process.prototype.packetTable.trimFlight :
            if( Process.prototype.packetTable.trimFlightSendEn > 0 ) {
                Process.prototype.packetTable.trimFlightSendEn--;
                myself.arduino.board.write( Process.prototype.Packets.trimFlightPacket, function() {
                myself.arduino.board.drain();
              });
            Process.prototype.packetTable.loopExit = true;
            }
            break;

            case Process.prototype.packetTable.trimDrive :
            if( Process.prototype.packetTable.trimDriveSendEn > 0 ) {
                  Process.prototype.packetTable.trimDriveSendEn--;
                myself.arduino.board.write( Process.prototype.Packets.trimDrivePacket, function() {
                myself.arduino.board.drain();
              });
            Process.prototype.packetTable.loopExit = true;
            }
            break;

            case Process.prototype.packetTable.ImuRawAndAngle :
            break;

            case Process.prototype.packetTable.pressure :
            if( Process.prototype.packetTable.pressureSendEn > 0 ) {
                Process.prototype.packetTable.pressureSendEn--;
                myself.arduino.board.write( Process.prototype.Packets.pressurePacket, function() {
                myself.arduino.board.drain();
              });
            Process.prototype.packetTable.loopExit = true;
            }
            break;

            case Process.prototype.packetTable.imageFlow :
            if( Process.prototype.packetTable.imageFlowSendEn > 0 ) {
                Process.prototype.packetTable.imageFlowSendEn--;
                myself.arduino.board.write( Process.prototype.Packets.imageFlowPacket, function() {
                myself.arduino.board.drain();
              });
            Process.prototype.packetTable.loopExit = true;
            }
            break;

            case Process.prototype.packetTable.button :
            if( Process.prototype.packetTable.buttonSendEn > 0 ) {
                  Process.prototype.packetTable.buttonSendEn--;
                myself.arduino.board.write( Process.prototype.Packets.buttonPacket, function() {
                myself.arduino.board.drain();
              });
            Process.prototype.packetTable.loopExit = true;
            }
            break;

            case Process.prototype.packetTable.battery :
            if( Process.prototype.packetTable.batterySendEn > 0 ) {
                Process.prototype.packetTable.batterySendEn--;
                myself.arduino.board.write( Process.prototype.Packets.batteryPacket, function() {
                myself.arduino.board.drain();
              });
            Process.prototype.packetTable.loopExit = true;
            }
            break;

            case Process.prototype.packetTable.motor :
            if( Process.prototype.packetTable.motorSendEn > 0 ) {
                console.log("motor packet send: " + Process.prototype.packetTable.sendCounter + " " + temp);
                temp++;
                Process.prototype.packetTable.motorSendEn--;
                myself.arduino.board.write( Process.prototype.Packets.motorPacket, function() {
                myself.arduino.board.drain();
              });
            Process.prototype.packetTable.loopExit = true;
            }
            break;

            case Process.prototype.packetTable.temperature :
            if( Process.prototype.packetTable.temperatureSendEn > 0 ) {
                Process.prototype.packetTable.temperatureSendEn--;
                myself.arduino.board.write( Process.prototype.Packets.temperaturePacket, function() {
                myself.arduino.board.drain();
              });
            Process.prototype.packetTable.loopExit = true;
            }
            break;

            case Process.prototype.packetTable.LEDControl :
            if( Process.prototype.packetTable.LEDControlSendEn > 0 ) {
                Process.prototype.packetTable.LEDControlSendEn--;
                myself.arduino.board.write( Process.prototype.Packets.LEDControlPacket, function() {
                myself.arduino.board.drain();
              });
            Process.prototype.packetTable.loopExit = true;
            }
            break;

            case Process.prototype.packetTable.droneMode :
            if( Process.prototype.packetTable.droneModeSendEn > 0 ) {
                Process.prototype.packetTable.droneModeSendEn--;
                myself.arduino.board.write( Process.prototype.Packets.modePacket, function() {
                myself.arduino.board.drain();
              });
            Process.prototype.packetTable.loopExit = true;
            }
            break;
          }

          temp = 0;
          Process.prototype.packetTable.sendCounter++;
          if(Process.prototype.packetTable.sendCounter  > 16)  { Process.prototype.packetTable.sendCounter = 0; Process.prototype.packetTable.loopExit = true; }
        }
      }, 50);
      else if(stat == false) clearInterval(myself.codrone.packetMachine);
    }

    myself.arduino.connect = function(port) {
        var SerialPort = require("serialport").SerialPort;
        var parsers = require('serialport').parsers;
        myself.codrone.connectingStep = Process.prototype.connectingProcess.waitingPortConnect;
        Process.prototype.exDataInit();
        //for ( var j = 0; j < 100; j++) myself.codrone.recvData[j] = 0x00;

        var ProcessInspector = setInterval(function(){
          console.log('C:' + myself.codrone.connectingStep + ' EX: ' + myself.codrone.exConnectingStep);
          if(myself.codrone.connectingStep != myself.codrone.exConnectingStep) {

            if(myself.codrone.connectingStep == Process.prototype.connectingProcess.waitingPortConnect) {
              console.log("wait port Connecting...");
              myself.codrone.msgBtnExist = 0;
              myself.codrone.msgBtnStatus = Process.prototype.buttonStat.pushingNull;
              myself.codrone.exConnectingStep = myself.codrone.connectingStep;
              myself.arduino.hideMessage();
              this.showMessage(localize('Connecting board at port\n') + port);

            }
            else if (myself.codrone.connectingStep == Process.prototype.connectingProcess.successPortConnect) {
              console.log("success port connecting!");
              myself.codrone.msgBtnExist = 1;
              myself.codrone.msgBtnStatus = Process.prototype.buttonStat.pushingNull;
              myself.arduino.hideMessage();
              myself.arduino.showMessage(localize('Board has been connected at port \n') + port);
              myself.codrone.msgBtnExist = 0;
              myself.codrone.exConnectingStep = myself.codrone.connectingStep;
            }
            else if (myself.codrone.connectingStep == Process.prototype.connectingProcess.successDroneDiscover) {
              console.log("discover drone!");
              if(myself.codrone.selectedDeviceIndex == 0 ) {
                //var add;
                //for(var j = 0; j < 6; j++) {add =+ (myself.codrone.devAddress0[j].toString() + ' '); }
                 myself.codrone.alarmTxt = 'the following device has been discovered.\n\n' +  'NAME:' + myself.codrone.devName0.toString() +'\n' + 'ADDRESS:' + myself.codrone.devAddress0.toString('hex') + '\n\n'
                 + 'Would you like to connect this device?';
              }
              else if(myself.codrone.selectedDeviceIndex == 1 ) {
                 myself.codrone.alarmTxt = 'the following device has been discovered.\n\n' +  'NAME:' + myself.codrone.devName1.toString() +'\n' + 'ADDRESS:' + myself.codrone.devAddress1.toString('hex') + '\n\n'
                 + 'Would you like to connect this device?';
              }
              else if(myself.codrone.selectedDeviceIndex == 2 ) {
                 myself.codrone.alarmTxt = 'the following device has been discovered.\n\n' +  'NAME:' + myself.codrone.devName2.toString() +'\n' + 'ADDRESS:' + myself.codrone.devAddress2.toString('hex') + '\n\n'
                 + 'Would you like to connect this device?';
              }

              myself.codrone.msgBtnStatus = Process.prototype.buttonStat.pushingNull;

              setTimeout( function() {
                myself.arduino.hideMessage();
                myself.codrone.msgBtnExist = 2;
                myself.arduino.showMessage(localize(myself.codrone.alarmTxt));
                myself.codrone.msgBtnExist = 0;
                myself.codrone.exConnectingStep = myself.codrone.connectingStep;

              } , 1500);
            }
            else if ((myself.codrone.connectingStep == Process.prototype.connectingProcess.successDroneConnect)&&(myself.codrone.msgBtnStatus == Process.prototype.buttonStat.pushingOK)) {
              console.log("connect drone!");

              if(myself.codrone.selectedDeviceIndex == 0 ) {
                 myself.codrone.alarmTxt = 'It was connected with the following device.\n\n' +  'NAME:' + myself.codrone.devName0.toString() +'\n' + 'ADDRESS:' + myself.codrone.devAddress0.toString('hex');
              }
              else if(myself.codrone.selectedDeviceIndex == 1 ) {
                 myself.codrone.alarmTxt = 'It was connected with the following device.\n\n' +  'NAME:' + myself.codrone.devName1.toString() +'\n' + 'ADDRESS:' + myself.codrone.devAddress1.toString('hex');
              }
              else if(myself.codrone.selectedDeviceIndex == 2 ) {
                 myself.codrone.alarmTxt = 'It was connected with the following device.\n\n' +  'NAME:' + myself.codrone.devName2.toString() +'\n' + 'ADDRESS:' + myself.codrone.devAddress2.toString('hex');
              }
              myself.codrone.msgBtnExist = 1;
              myself.codrone.msgBtnStatus = Process.prototype.buttonStat.pushingNull;
              myself.arduino.hideMessage();
              myself.arduino.showMessage(localize(myself.codrone.alarmTxt));
              myself.codrone.msgBtnExist = 0;
              myself.codrone.exConnectingStep = myself.codrone.connectingStep;
              myself.codrone.alarmTxt = "";
              myself.codrone.categoryChange = true;

            }
          }

////////////////////////////////////////////////////////////////

          if((myself.codrone.connectingStep == Process.prototype.connectingProcess.successPortConnect)&&(myself.codrone.msgBtnStatus == Process.prototype.buttonStat.pushingOK)) {
            if(myself.codrone.sendPacketNumber < 10)  {
              myself.arduino.discoverStart(); myself.codrone.sendPacketNumber++;
              myself.codrone.msgBtnExist = 0;
              myself.arduino.hideMessage();
              myself.arduino.showMessage(localize('Searching the device...'));
            }
            else {
              myself.codrone.sendPacketNumber = 0;
              myself.codrone.connectingStep = -1; myself.codrone.exConnectingStep = -1;
              myself.codrone.alarmTxt = 'Unable to find the device.\n\n';
              myself.arduino.disconnect();
              myself.codrone.alarmTxt = "";
              clearInterval(ProcessInspector);
           }
         }
          if((myself.codrone.connectingStep == Process.prototype.connectingProcess.successDroneDiscover)&&(myself.codrone.msgBtnStatus == Process.prototype.buttonStat.pushingOK)) {
            if(myself.codrone.selectedDeviceIndex == 0 ) myself.arduino.connectIndex(0x00);
            else if(myself.codrone.selectedDeviceIndex == 1 ) myself.arduino.connectIndex(0x01);
            else if(myself.codrone.selectedDeviceIndex == 2 ) myself.arduino.connectIndex(0x02);
            myself.codrone.connectingStep = Process.prototype.connectingProcess.searchingDrone;
            myself.codrone.msgBtnExist = 0;
            myself.arduino.hideMessage();
            myself.arduino.showMessage(localize('Connecting to the device...'));
          }
          else if ((myself.codrone.connectingStep == Process.prototype.connectingProcess.successDroneDiscover)&&(myself.codrone.msgBtnStatus == Process.prototype.buttonStat.pushingCancel)) {
            myself.codrone.connectingStep = -1; myself.codrone.exConnectingStep = -1;
            myself.codrone.msgBtnStatus = Process.prototype.buttonStat.pushingNull;
            myself.codrone.msgBtnExist = 0;
            myself.arduino.hideMessage();
            myself.codrone.alarmTxt = '';
            myself.arduino.disconnect();
            clearInterval(ProcessInspector);
          }
          if((myself.codrone.connectingStep == Process.prototype.connectingProcess.successDroneConnect)&&(myself.codrone.msgBtnStatus == Process.prototype.buttonStat.pushingOK)) {
            myself.codrone.connectingStep = -1;
          }
          if((myself.codrone.connectingStep == Process.prototype.connectingProcess.searchingDrone)&&(myself.codrone.msgBtnStatus == Process.prototype.buttonStat.pushingOK)) {
            myself.codrone.intervalTimer++;
            if(myself.codrone.intervalTimer > 20) {
                myself.codrone.intervalTimer = 0;
                myself.codrone.connectingStep = -1; myself.codrone.exConnectingStep = -1;
                myself.arduino.hideMessage();
                myself.codrone.alarmTxt = 'Unable to find the device.\n\n';
                myself.arduino.disconnect();
                myself.codrone.alarmTxt = "";
                clearInterval(ProcessInspector);
            }
          }

        }, 500);

        //this.board = new SerialPort(port, {baudrate:115200, parser: parsers.readline('\n')});
        this.board = new SerialPort(port, {baudrate:115200});
        this.disconnecting = false;
        this.connecting = true;
        this.justConnected = true;
        this.port = port;

        world.Arduino.lockPort(port);

        myself.arduino.board.on('close', function() { console.log('serialport closed'); });
        myself.arduino.board.on('error', function(error) {
           console.log('error' + error );
           world.Arduino.unlockPort(port);
           this.connecting = false;
           this.justConnected = false;
           myself.codrone.alarmTxt = 'Unable to open the port.\n\n';
           myself.arduino.closeHandler();
           myself.arduino.hideMessage();
           //ide.inform(myself.name, localize(' Cannot find the Board. try again! \n') + port);
        });

        this.board.on("open", function (err) {
           if (err) {
              console.log('serialport error');
              world.Arduino.unlockPort(port);
          }
          else {
              console.log('serialport open');
              myself.codrone.connectingStep = Process.prototype.connectingProcess.successPortConnect;
              this.connecting = false;
              myself.arduino.disconnectDrone();
              myself.arduino.packetSender(true);

              myself.arduino.board.on('data', function(data) {
                var dronePacket = new Buffer(data, 'utf8');
                var netData = new Buffer('utf8');
                var complete = false;

                if(dronePacket.length >= 6) {
                  if((dronePacket[2] == 0x0A)&&(dronePacket[3] == 0x55)) {
                    myself.codrone.packetReceiving = true;
                    myself.codrone.recvData = dronePacket;
                    myself.codrone.packetLength = dronePacket.length;
                    console.log("packet receiving start!" + myself.codrone.packetLength);
                    //netData = myself.codrone.recvData.slice(6, myself.codrone.recvData.length - 2);
                    netData = myself.codrone.recvData.slice(6, myself.codrone.recvData[5] + 6);
                    console.log('Originalpacket : ' + myself.codrone.recvData.toString('hex') + '\n');
                    //console.log('data : ' + netData.toString('hex') + '\n');
                    if(myself.codrone.recvData[5] == netData.length) {complete = true; myself.codrone.packetReceiving = false;   console.log("packet receiving finished1!");}
                    console.log("LENGTH:" + myself.codrone.recvData[5] + " " + netData.length);
                  }
                  else {
                    if(myself.codrone.packetReceiving == true) {
                      //for(var k = 0; k < dronePacket.length; k++) { myself.codrone.recvData[myself.codrone.packetLength + k] = dronePacket[k]; console.log("recvData: " + myself.codrone.recvData[ myself.codrone.packetLength + k] + " dronePacket: " + dronePacket[k]);}
                      //myself.codrone.recvData2 = myself.codrone.recvData.concat(dronePacket);
                      //myself.codrone.recvData += dronePacket;
                      //dronePacket.copy(myself.codrone.recvData, myself.codrone.recvData.length);
                      myself.codrone.recvData = Buffer.concat([myself.codrone.recvData, dronePacket]);
                      //netData = myself.codrone.recvData.slice(6, myself.codrone.recvData.length - 2);
                      netData = myself.codrone.recvData.slice(6, myself.codrone.recvData[5] + 6);
                      if(myself.codrone.recvData[5] == netData.length) {complete = true; myself.codrone.packetReceiving = false; }
                      console.log('remnants:' + dronePacket.toString('hex') + '\n');
                      console.log('packet : ' + myself.codrone.recvData.toString('hex') + '\n');
                      console.log('data : ' + netData.toString('hex') + '\n');
                      console.log("packet receiving finished! " + complete);
                    }
                  }
                }
                else {
                  if(myself.codrone.packetReceiving == true) {
                    //for(var k = 0; k < dronePacket.length; k++) { myself.codrone.recvData[myself.codrone.packetLength + k] = dronePacket[k]; console.log("recvData: " + myself.codrone.recvData[myself.codrone.packetLength + k] + " dronePacket: " + dronePacket[k]);}
                    //dronePacket.copy(myself.codrone.recvData, myself.codrone.recvData.length);
                    //myself.codrone.recvData2 = myself.codrone.recvData.concat(dronePacket);
                    //myself.codrone.recvData += dronePacket;
                    myself.codrone.recvData = Buffer.concat([myself.codrone.recvData, dronePacket]);
                    //netData = myself.codrone.recvData.slice(6, myself.codrone.recvData.length - 2);
                    netData = myself.codrone.recvData.slice(6, myself.codrone.recvData[5] + 6);
                    if(myself.codrone.recvData[5] == netData.length) {complete = true; myself.codrone.packetReceiving = false; }
                    console.log('remnants:' + dronePacket.toString('hex') + '\n');
                    console.log('packet : ' + myself.codrone.recvData.toString('hex') + '\n');
                    console.log('data : ' + netData.toString('hex') + '\n');
                    console.log("packet receiving finished! " + complete);
                  }
                }


                if(complete == true) {
                  netData = myself.codrone.recvData.slice(4, myself.codrone.recvData.length - 2);
                  var crc = require('crc');
                  var crc16Val = crc.crc16xmodem(netData);
                  var crc16RecvVal = (myself.codrone.recvData[myself.codrone.recvData.length - 1] << 8) + (dronePacket[myself.codrone.recvData.length - 2] & 0x00FF);
                  crc16Val = crc16RecvVal;
                  console.log('netDatapacket : ' + netData.toString('hex') + '\n');
                  console.log("comCRC:" + crc16Val + " recvCRC: " + crc16RecvVal );
                  //console.log('packet : ' + myself.codrone.recvData.toString('hex') + '\n');
                  //console.log('data : ' + netData.toString('hex') + '\n');
                  //if(crc16Val == crc16RecvVal) console.log('Right CRC!');
                  //console.log("byte: " + rData[5].toString(16) + '\n');
                  //console.log("length: " + rData.length);

                  if(crc16Val == crc16RecvVal) {
                    console.log('Right CRC!\n');
                    myself.codrone.receiveDtype = netData[0];  myself.codrone.receiveLength = netData[1];

                    if(myself.codrone.receiveDtype == Process.prototype.DataType.dType_LinkState) {
                      myself.codrone.receiveLinkState = netData[2];
                      myself.codrone.receiveLikMode = netData[3];
                    }
                    else if (myself.codrone.receiveDtype == Process.prototype.DataType.dType_LinkEvent)  {

                      myself.codrone.receiveEventState = netData[2];
                      if (  myself.codrone.receiveEventState ==  Process.prototype.EventLink.linkEvent_None) {  console.log(" : linkEvent - None"); }
                      else if (  myself.codrone.receiveEventState ==  Process.prototype.EventLink.linkEvent_SystemReset) { console.log(" : linkEvent - SystemReset"); }
                      else if (  myself.codrone.receiveEventState ==  Process.prototype.EventLink.linkEvent_Initialized) { console.log(" : linkEvent - Initialized"); }
                      else if (  myself.codrone.receiveEventState ==  Process.prototype.EventLink.linkEvent_Scanning) { console.log(" : linkEvent - Scanning"); }
                      else if (  myself.codrone.receiveEventState ==  Process.prototype.EventLink.linkEvent_ScanStop) {	console.log(" : linkEvent - ScanStop"); }
                      else if (  myself.codrone.receiveEventState ==  Process.prototype.EventLink.linkEvent_FoundDroneService) { console.log(" : linkEvent - FoundDroneService"); }
                      else if (  myself.codrone.receiveEventState ==  Process.prototype.EventLink.linkEvent_Connecting) {	console.log(" : linkEvent - Connecting");}
                      else if (  myself.codrone.receiveEventState ==  Process.prototype.EventLink.linkEvent_Connected) { console.log(" : linkEvent - Connected"); }
                      else if (  myself.codrone.receiveEventState ==  Process.prototype.EventLink.linkEvent_ConnectionFaild) { console.log(" : linkEvent - ConnectionFaild"); }
                      else if (  myself.codrone.receiveEventState ==  Process.prototype.EventLink.linkEvent_ConnectionFaildNoDevices) { console.log(" : linkEvent - ConnectionFaildNoDevices");}
                      else if (  myself.codrone.receiveEventState ==  Process.prototype.EventLink.linkEvent_ConnectionFaildNotReady) { console.log(" : linkEvent - ConnectionFaildNotReady");}
                      else if (  myself.codrone.receiveEventState ==  Process.prototype.EventLink.linkEvent_PairingStart) { console.log(" : linkEvent - PairingStart");}
                      else if (  myself.codrone.receiveEventState ==  Process.prototype.EventLink.linkEvent_PairingSuccess) {	console.log(" : linkEvent - PairingSuccess"); }
                      else if (  myself.codrone.receiveEventState ==  Process.prototype.EventLink.linkEvent_PairingFaild) {	console.log(" : linkEvent - PairingFaild"); }
                      else if (  myself.codrone.receiveEventState ==  Process.prototype.EventLink.linkEvent_BondingSuccess) { console.log(" : linkEvent - BondingSuccess"); }
                      else if (  myself.codrone.receiveEventState ==  Process.prototype.EventLink.linkEvent_LookupAttribute) { console.log(" : linkEvent - LookupAttribute"); }
                      else if (  myself.codrone.receiveEventState ==  Process.prototype.EventLink.linkEvent_RssiPollingStart) { console.log(" : linkEvent - RssiPollingStart"); }
                      else if (  myself.codrone.receiveEventState ==  Process.prototype.EventLink.linkEvent_RssiPollingStop) { console.log(" : linkEvent - RssiPollingStop"); }
                      else if (  myself.codrone.receiveEventState ==  Process.prototype.EventLink.linkEvent_DiscoverService) { console.log(" : linkEvent - DiscoverService"); }
                      else if (  myself.codrone.receiveEventState ==  Process.prototype.EventLink.linkEvent_DiscoverCharacteristic) { console.log(" : linkEvent - DiscoverCharacteristic"); }
                      else if (  myself.codrone.receiveEventState ==  Process.prototype.EventLink.linkEvent_DiscoverCharacteristicDroneData) { console.log(" : linkEvent - DiscoverCharacteristicDroneData");}
                      else if (  myself.codrone.receiveEventState ==  Process.prototype.EventLink.linkEvent_DiscoverCharacteristicDroneConfig) {
                        console.log(" : linkEvent - DiscoverCharacteristicDroneConfig");
                        myself.codrone.connectingStep = Process.prototype.connectingProcess.successDroneConnect;
                      }
                      else if (  myself.codrone.receiveEventState ==  Process.prototype.EventLink.linkEvent_DiscoverCharacteristicUnknown) { console.log(" : linkEvent - DiscoverCharacteristicUnknown"); }
                      else if (  myself.codrone.receiveEventState ==  Process.prototype.EventLink.linkEvent_DiscoverCCCD) { console.log(" : linkEvent - DiscoverCCCD"); }
                      else if (  myself.codrone.receiveEventState ==  Process.prototype.EventLink.linkEvent_ReadyToControl) {
                        console.log(" : linkEvent - ReadyToControl");
                        myself.codrone.connectingStep = Process.prototype.connectingProcess.successDroneConnect;
                      }
                      else if (  myself.codrone.receiveEventState ==  Process.prototype.EventLink.linkEvent_Disconnecting) { console.log(" : linkEvent - Disconnecting"); }
                      else if (  myself.codrone.receiveEventState ==  Process.prototype.EventLink.linkEvent_Disconnected) {
                        console.log(" : linkEvent - Disconnected");
                        //myself.codrone.connectingStep = -1;
                      }
                      else if (  myself.codrone.receiveEventState ==  Process.prototype.EventLink.linkEvent_GapLinkParamUpdate) { console.log(" : linkEvent - GapLinkParamUpdate"); }
                      else if (  myself.codrone.receiveEventState ==  Process.prototype.EventLink.linkEvent_RspReadError) { console.log(" : linkEvent - RspReadError"); }
                      else if (  myself.codrone.receiveEventState ==  Process.prototype.EventLink.linkEvent_RspReadSuccess) {  console.log(" : linkEvent - RspReadSuccess"); }
                      else if (  myself.codrone.receiveEventState ==  Process.prototype.EventLink.linkEvent_RspWriteError) { console.log(" : linkEvent - RspWriteError"); }
                      else if (  myself.codrone.receiveEventState ==  Process.prototype.EventLink.linkEvent_RspWriteSuccess) { console.log(" : linkEvent - RspWriteSuccess"); }
                      else if (  myself.codrone.receiveEventState ==  Process.prototype.EventLink.linkEvent_SetNotify) { console.log(" : linkEvent - SetNotify"); }
                      else if (  myself.codrone.receiveEventState ==  Process.prototype.EventLink.linkEvent_Write) { console.log(" : linkEvent - Write");}

                    }
                    else if (myself.codrone.receiveDtype == Process.prototype.DataType.dType_State)   Process.prototype.Packets.droneState = netData.slice(2, netData.length);                         //7th u8 : battery
                    else if (myself.codrone.receiveDtype == Process.prototype.DataType.dType_Attitude) { Process.prototype.Packets.droneAttitude = netData.slice(2, netData.length); console.log('Attitude: ' + Process.prototype.Packets.droneAttitude.toString('hex') + '\n'); }
                    else if (myself.codrone.receiveDtype == Process.prototype.DataType.dType_GyroBias) Process.prototype.Packets.droneGyroBias = netData.slice(2,netData.length);		               //dron Attitude
                    else if (myself.codrone.receiveDtype == Process.prototype.DataType.dType_TrimAll)	Process.prototype.Packets.droneTrimAll = netData.slice(2,netData.length);
                    else if (myself.codrone.receiveDtype == Process.prototype.DataType.dType_TrimFlight)	Process.prototype.Packets.droneTrimFlight = netData.slice(2,netData.length);
                    else if (myself.codrone.receiveDtype == Process.prototype.DataType.dType_TrimDrive)	Process.prototype.Packets.droneTrimDrive = netData.slice(2,netData.length);		             //dron TrimDrive
                    else if (myself.codrone.receiveDtype == Process.prototype.DataType.dType_ImuRawAndAngle) Process.prototype.Packets.droneImuRawAndAngle = netData.slice(2,netData.length);       //dron ImuRawAndAngle
                    else if (myself.codrone.receiveDtype == Process.prototype.DataType.dType_Pressure) Process.prototype.Packets.dronePressure = netData.slice(2,netData.length);                   //dron Pressure
                    else if (myself.codrone.receiveDtype == Process.prototype.DataType.dType_ImageFlow) Process.prototype.Packets.droneImageFlow = netData.slice(2,netData.length);                 //dron ImageFlow
                    else if (myself.codrone.receiveDtype == Process.prototype.DataType.dType_Button)  Process.prototype.Packets.droneButton[0] = netData[2];                                       //dron Button
                    else if (myself.codrone.receiveDtype == Process.prototype.DataType.dType_Batery)  Process.prototype.Packets.droneBattery = netData.slice(2,netData.length);                    //dron Batery
                    else if (myself.codrone.receiveDtype == Process.prototype.DataType.dType_Motor)   Process.prototype.Packets.droneMotor = netData.slice(2,netData.length);                      //dron Motor
                    else if (myself.codrone.receiveDtype == Process.prototype.DataType.dType_Temperature) Process.prototype.Packets.droneTemperature = netData.slice(2,netData.length);            //dron Temperature
                    else if (myself.codrone.receiveDtype == Process.prototype.DataType.dType_LinkDiscoveredDevice) {
                      var devIndex = netData[2];
                      if(devIndex == 0)  {
                        myself.codrone.devAddress0 = netData.slice(3, 8);
                        myself.codrone.devName0 = netData.slice(9, 28);
                        myself.codrone.devRssi0 = netData[29];
                        myself.codrone.devFind[0] = 1;
                        console.log('index0:' + ' ADD: ' + myself.codrone.devAddress0.toString('hex') + ' Name: ' + myself.codrone.devName0.toString() + ' Rssi: ' + myself.codrone.devRssi0 + '\n');
                      }
                      else if(devIndex == 1) {
                        myself.codrone.devAddress1 = netData.slice(3, 8);
                        myself.codrone.devName1 = netData.slice(9, 28);
                        myself.codrone.devRssi1 = netData[29];
                        myself.codrone.devFind[1] = 1;
                        console.log('index1:' + ' ADD: ' + myself.codrone.devAddress1.toString('hex') + ' Name: ' + myself.codrone.devName1.toString() + ' Rssi: ' + myself.codrone.devRssi1 + '\n');
                      }
                      else if(devIndex == 2) {
                        myself.codrone.devAddress2 = netData.slice(3, 8);
                        myself.codrone.devName2 = netData.slice(9, 28);
                        myself.codrone.devRssi2 = netData[29];
                        myself.codrone.devFind[2] = 1;
                        console.log('index2:' + ' ADD: ' + myself.codrone.devAddress2.toString('hex') + ' Name: ' + myself.codrone.devName2.toString() + ' Rssi: ' + myself.codrone.devRssi2 + '\n');
                       }
                       myself.codrone.devCount = myself.codrone.devFind[0] + myself.codrone.devFind[1] + myself.codrone.devFind[2];
                       if (myself.codrone.devCount > 0) {
                          if (myself.codrone.devRssi0 > myself.codrone.devRssi1) { if (myself.codrone.devRssi0 > myself.codrone.devRssi2)  myself.codrone.selectedDeviceIndex = 0; else  myself.codrone.selectedDeviceIndex = 2; }
                          else { if (myself.codrone.devRssi1 > myself.codrone.devRssi2)	 myself.codrone.selectedDeviceIndex = 1;   else	myself.codrone.selectedDeviceIndex = 2; }
                       }
                       myself.codrone.connectingStep = Process.prototype.connectingProcess.successDroneDiscover;
                    }
                 }
                 complete = false;

                }
            });

            //ide.inform(myself.name, localize(' Board has been connected at port \n') + port);
          }
       });
        // Set timeout to check if device does not speak firmata (in such case new Board callback was never called, but board object exists)
        return;
    }

    myself.arduino.isBoardReady = function() {
        return ((this.board !== undefined)
              //  && (this.board.pins.length>0)
                && (!this.disconnecting));
    }

    myself.arduino.discoverStart = function() {
        if(myself.arduino.isBoardReady()) {
          myself.arduino.board.write( new Buffer([0x0A, 0x55, 0x11, 0x02, 0xE2, 0x00, 0xA3, 0x75]), function() {
          myself.arduino.board.drain();
          //myself.codrone.droneState[0] = 0x0B;
          //myself.codrone.droneTrimDrive[3] = 0x08
          //console.log("val: " + myself.codrone.droneState[0] + " " + myself.codrone.droneTrimDrive[3] );
         });
        }
        else {
           throw new Error(localize("Board not connected"));
       }
    }

    myself.arduino.connectIndex = function(index) {
        if(myself.arduino.isBoardReady()) {
          if(index == 0x00) myself.arduino.board.write( new Buffer([0x0A, 0x55, 0x11, 0x02, 0xE4, 0x00, 0x05, 0xDF]), function() { myself.arduino.board.drain(); } );
          else if(index == 0x01) myself.arduino.board.write( new Buffer([0x0A, 0x55, 0x11, 0x02, 0xE4, 0x01, 0x24, 0xCF]), function() { myself.arduino.board.drain(); } );
          else if(index == 0x02) myself.arduino.board.write( new Buffer([0x0A, 0x55, 0x11, 0x02, 0xE4, 0x02, 0x47, 0xFF]), function() { myself.arduino.board.drain(); } );
        }
        else {
           throw new Error(localize("Board not connected"));
       }
    }

    myself.arduino.disconnectDrone =  function() {
        if(myself.arduino.isBoardReady()) {
          myself.arduino.board.write( new Buffer([0x0A, 0x55, 0x11, 0x02, 0xE5, 0x00, 0x34, 0xEC]), function() {
          myself.arduino.board.drain();
         });
        }
        else {
           throw new Error(localize("Board not connected"));
       }
    }

    myself.arduino.requestAttitude =  function() {
        if(myself.arduino.isBoardReady()) {
          myself.arduino.board.write( new Buffer([0x0A, 0x55, 0x11, 0x02, 0x90, 0x32, 0x89, 0x0D]), function() {
          myself.arduino.board.drain();
         });
        }
        else {
           throw new Error(localize("Board not connected"));
       }
    }

    myself.arduino.dimmingRed =  function() {
        if(myself.arduino.isBoardReady()) {
          myself.arduino.board.write( new Buffer([0x0A, 0x55, 0x20, 0x03, 0x45, 0x72, 0x07, 0xE9, 0x7B]), function() {
          myself.arduino.board.drain();
         });
        }
        else {
           throw new Error(localize("Board not connected"));
       }
    }

    myself.arduino.dimmingCyan =  function() {
        if(myself.arduino.isBoardReady()) {
          myself.arduino.board.write( new Buffer([0x0A, 0x55, 0x20, 0x03, 0x45, 0x14, 0x07, 0x65, 0xDA]), function() {
          myself.arduino.board.drain();
         });
        }
        else {
           throw new Error(localize("Board not connected"));
       }
    }

    myself.arduino.stopDrone =  function() {
        //myself.arduino.packetSender(false);
        //clearInterval(myself.arduino.packetSender.packetMachine);
        if(myself.arduino.isBoardReady()) {
          myself.arduino.board.write( new Buffer([0x0A, 0x55, 0x11, 0x02, 0x24, 0x00, 0x51, 0xC9]), function() {
          myself.arduino.board.drain();
         });
        }
        else {
           throw new Error(localize("Board not connected"));
       }
    }

}

SpriteMorph.prototype.categories.push('Codrone');
SpriteMorph.prototype.blockColor['Codrone'] = new Color(73, 89, 105);

SpriteMorph.prototype.originalInitBlocks = SpriteMorph.prototype.initBlocks;
SpriteMorph.prototype.initArduinoBlocks = function() {

  this.blocks.droneMode =
  {
     only: SpriteMorph,
     type: 'command',
     category: 'Codrone',
     spec: 'drone mode %droneMode',
     defaults : [null],
     translatable: true
  };

  this.blocks.LEDControl =
  {
     only: SpriteMorph,
     type: 'command',
     category: 'Codrone',
     spec: 'LED Control %sendMode %colorValue time %sendInterval',
     defaults : [null,null,null],
     translatable: true
  };

  this.blocks.request =
  {
     only: SpriteMorph,
     type: 'reporter',
     category: 'Codrone',
     spec: 'request %requestType',
     defaults : [null],
     translatable: true
  };

    this.blocks.flightEvent =
    {
       only: SpriteMorph,
       type: 'command',
       category: 'Codrone',
       spec: 'flight event %eventName',
       defaults : [null],
       translatable: true
    };

    this.blocks.sendData =
    {
        only: SpriteMorph,
        type: 'command',
        category: 'Codrone',
        spec: 'sending Command',
        translatable: true
    };

    // Keeping this block spec, although it's not used anymore!
    this.blocks.throttle =
    {
        only: SpriteMorph,
        type: 'command',
        category: 'Codrone',
        spec: 'throttle %throttleValue',
        defaults: ['0'],
        translatable: true
    };

    this.blocks.yaw =
    {
        only: SpriteMorph,
        type: 'command',
        category: 'Codrone',
        spec: 'yaw %yawValue',
        defaults: ['0'],
        translatable: true
    };

    this.blocks.pitch =
    {
        only: SpriteMorph,
        type: 'command',
        category: 'Codrone',
        spec: 'pitch %pitchValue',
        defaults: ['0'],
        translatable: true
    };

    this.blocks.roll =
    {
        only: SpriteMorph,
        type: 'command',
        category: 'Codrone',
        spec: 'roll %rollValue',
        defaults: ['0'],
        translatable: true
    };


    // Ardui... nization?
    // Whatever, let's dumb this language down:

    this.blocks.receiveGo.translatable = true;
    this.blocks.doWait.translatable = true;
    this.blocks.doForever.translatable = true;
    this.blocks.doRepeat.translatable = true;
    this.blocks.doIf.translatable = true;
    this.blocks.doIfElse.translatable = true;
    this.blocks.reportSum.translatable = true;
    this.blocks.reportDifference.translatable = true;
    this.blocks.reportProduct.translatable = true;
    this.blocks.reportQuotient.translatable = true;
    this.blocks.reportModulus.translatable = true;
    this.blocks.reportMonadic.translatable = true;
    this.blocks.reportRandom.translatable = true;
    this.blocks.reportLessThan.translatable = true;
    this.blocks.reportEquals.translatable = true;
    this.blocks.reportGreaterThan.translatable = true;
    this.blocks.reportAnd.translatable = true;
    this.blocks.reportOr.translatable = true;
    this.blocks.reportNot.translatable = true;
    this.blocks.reportTrue.translatable = true;
    this.blocks.reportFalse.translatable = true;
    this.blocks.reportJoinWords.translatable = true;
    this.blocks.doSetVar.translatable = true;
    this.blocks.doChangeVar.translatable = true;
    this.blocks.doDeclareVariables.translatable = true;

    StageMorph.prototype.codeMappings['delim'] = ',';
    StageMorph.prototype.codeMappings['tempvars_delim'] = ',';
    StageMorph.prototype.codeMappings['string'] = '"<#1>"';

    StageMorph.prototype.codeMappings['doWait'] = 'delay(<#1> * 1000);';
    StageMorph.prototype.codeMappings['doForever'] = 'void loop() {\n  <#1>\n}';
    StageMorph.prototype.codeMappings['doRepeat'] = 'for (int i = 0; i < <#1>; i++) {\n  <#2>\n}';
    StageMorph.prototype.codeMappings['doIf'] = 'if (<#1>) {\n  <#2>\n}';
    StageMorph.prototype.codeMappings['doIfElse'] = 'if (<#1>) {\n  <#2>\n} else {\n  <#3>\n}';

    StageMorph.prototype.codeMappings['reportSum'] = '(<#1> + <#2>)';
    StageMorph.prototype.codeMappings['reportDifference'] = '(<#1> - <#2>)';
    StageMorph.prototype.codeMappings['reportProduct'] = '(<#1> * <#2>)';
    StageMorph.prototype.codeMappings['reportQuotient'] = '(<#1> / <#2>)';
    StageMorph.prototype.codeMappings['reportModulus'] = '(<#1> % <#2>)';
    StageMorph.prototype.codeMappings['reportMonadic'] = '<#1>(<#2>)';
    StageMorph.prototype.codeMappings['reportRandom'] = 'random(<#1>, <#2>)';
    StageMorph.prototype.codeMappings['reportLessThan'] = '(<#1> < <#2>)';
    StageMorph.prototype.codeMappings['reportEquals'] = '(<#1> == <#2>)';
    StageMorph.prototype.codeMappings['reportGreaterThan'] = '(<#1> > <#2>)';
    StageMorph.prototype.codeMappings['reportAnd'] = '(<#1> && <#2>)';
    StageMorph.prototype.codeMappings['reportOr'] = '(<#1> || <#2>)';
    StageMorph.prototype.codeMappings['reportNot'] = '!(<#1>)';
    StageMorph.prototype.codeMappings['reportTrue'] = 'true';
    StageMorph.prototype.codeMappings['reportFalse'] = 'false';

    StageMorph.prototype.codeMappings['doSetVar'] = '<#1> = <#2>;';
    StageMorph.prototype.codeMappings['doChangeVar'] = '<#1> += <#2>;';
    StageMorph.prototype.codeMappings['doDeclareVariables'] = 'int <#1>;'; // How do we deal with types? Damn types...

}

SpriteMorph.prototype.initBlocks =  function() {
    this.originalInitBlocks();
    this.initArduinoBlocks();
}

SpriteMorph.prototype.initBlocks();

// blockTemplates decorator

SpriteMorph.prototype.originalBlockTemplates = SpriteMorph.prototype.blockTemplates;
SpriteMorph.prototype.blockTemplates = function(category) {
    var myself = this;

    var blocks = myself.originalBlockTemplates(category);

    //  Button that triggers a connection attempt
    var arduinoConnectButton = new PushButtonMorph(
            null,
            function () {
                myself.arduino.attemptConnection();
            },
            'Connect board'
            );
    //  Button that triggers a disconnection from board

    var arduinoDisconnectButton = new PushButtonMorph(
            null,
            function () {
                myself.arduino.disconnect();;
            },
            'Disconnect board'
            );

    var discoverStartButton = new PushButtonMorph(
            null,
            function () {
                  myself.arduino.discoverStart();
            },
            'discover start'
            );

    var connectIndexButton = new PushButtonMorph(
            null,
            function () {
                    myself.arduino.connectIndex(myself.codrone.selectedDeviceIndex);
            },
            'reconnect '
            );

      var disconnectDroneButton = new PushButtonMorph(
              null,
              function () {
                      myself.arduino.disconnectDrone();
              },
              'disconnect'
              );

    var requestAttitudeButton = new PushButtonMorph(
            null,
            function () {
                  myself.arduino.requestAttitude();
            },
            'request attitude'
            );

    var dimmingRedButton = new PushButtonMorph(
            null,
            function () {
                  myself.arduino.dimmingRed();
            },
            'dimming Red'
            );

    var dimmingCyanButton = new PushButtonMorph(
            null,
            function () {
                  myself.arduino.dimmingCyan();
            },
            'dimming Cyan'
            );

    var stopDroneButton = new PushButtonMorph(
            null,
            function () {
                   myself.arduino.stopDrone();
            },
            'stop'
            );


    function blockBySelector(selector) {
        var newBlock = SpriteMorph.prototype.blockForSelector(selector, true);
        newBlock.isTemplate = true;
        return newBlock;
    };

    if (category === 'Codrone') {
        blocks.push(arduinoConnectButton);
        blocks.push(arduinoDisconnectButton);
        //blocks.push(discoverStartButton);
        //blocks.push(connectIndexButton);
        //blocks.push(disconnectDroneButton);
        //blocks.push(requestAttitudeButton);
        //blocks.push(dimmingRedButton);
        //blocks.push(dimmingCyanButton);
        blocks.push(stopDroneButton);
        blocks.push('-');
        blocks.push(blockBySelector('roll'));
        blocks.push(blockBySelector('pitch'));
        blocks.push(blockBySelector('yaw'));
        blocks.push(blockBySelector('throttle'));
        blocks.push(blockBySelector('sendData'));
        blocks.push(blockBySelector('flightEvent'));
        blocks.push(blockBySelector('LEDControl'));
        blocks.push(blockBySelector('droneMode'));
        blocks.push(blockBySelector('request'));
    };

//	 if (category === 'Drone') {
      //blocks.push(DroneConnectButton);

//     };

    return blocks;
}
