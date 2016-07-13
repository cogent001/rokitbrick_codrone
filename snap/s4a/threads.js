Process.prototype.buttonStat = {

  pushingNull:int = 0,
  pushingOK:int = 1,
  pushingCancel:int = 2

}

Process.prototype.connectingProcess = {

  waitingPortConnect:int = 0,
  successPortConnect:int = 1,
  successDroneDiscover:int = 2,
  searchingDrone:int = 10,
  successDroneConnect:int = 4,
  droneDisconnect:int = 5

};

Process.prototype.ModeLink = {

 linkMode_None:int = 0,
 linkMode_Boot:int = 1,
 linkMode_Ready:int = 2,
 linkMode_Connecting:int = 3,
 linkMode_Connected:int = 4,
 linkMode_Disconnecting:int = 5,
 linkMode_ReadyToReset:int = 6,
 linkMode_EndOfType:int = 7

};

Process.prototype.ModeLinkBroadcast = {

  LinkBroadcast_None:int = 0,
	LinkBroadcast_Mute:int = 1,
	LinkBroadcast_Active:int = 2,
  LinkBroadcast_Passive:int = 3,
	LinkBroadcast_EndOfType:int = 4

};

Process.prototype.EventLink = {

	linkEvent_None:int = 0,
	linkEvent_SystemReset:int = 1,
	linkEvent_Initialized:int = 2,
	linkEvent_Scanning:int = 3,
  linkEvent_ScanStop:int = 4,
	linkEvent_FoundDroneService:int = 5,
	linkEvent_Connecting:int = 6,
	linkEvent_Connected:int = 7,
	linkEvent_ConnectionFaild:int = 8,
	linkEvent_ConnectionFaildNoDevices:int = 9,
	linkEvent_ConnectionFaildNotReady:int = 10,
	linkEvent_PairingStart:int = 11,
	linkEvent_PairingSuccess:int = 12,
	linkEvent_PairingFaild:int = 13,
	linkEvent_BondingSuccess:int = 14,
	linkEvent_LookupAttribute:int = 15,
	linkEvent_RssiPollingStart:int = 16,
  linkEvent_RssiPollingStop:int = 17,
	linkEvent_DiscoverService:int = 18,
	linkEvent_DiscoverCharacteristic:int = 19,
	linkEvent_DiscoverCharacteristicDroneData:int = 20,
	linkEvent_DiscoverCharacteristicDroneConfig:int = 21,
	linkEvent_DiscoverCharacteristicUnknown:int = 22,
	linkEvent_DiscoverCCCD:int = 23,
	linkEvent_ReadyToControl:int = 24,
	linkEvent_Disconnecting:int = 25,
	linkEvent_Disconnected:int = 26,
	linkEvent_GapLinkParamUpdate:int = 27,
	linkEvent_RspReadError:int = 28,
	linkEvent_RspReadSuccess:int = 29,
	linkEvent_RspWriteError:int = 30,
	linkEvent_RspWriteSuccess:int = 31,
	linkEvent_SetNotify:int = 32,
	linkEvent_Write:int = 33,
	EndOfType:int = 34

	};


Process.prototype.DataType = {

  dType_None:int = 0,

	dType_Ping:int = 1,
	dType_Ack:int = 2,
	dType_Error:int = 3,
	dType_Request:int = 4,
	dType_DeviceName:int = 5,

	dType_Control:int = 0x10,
  dType_Command:int = 0x11,
	dType_Command2:int = 0x12,
	DType_Command3:int =0x13,

	dType_LedMode:int = 0x20,
	dType_LedMode2:int  = 0x21,
	dType_LedModeCommand:int = 0x22,
	dType_LedModeCommandIr:int = 0x23,
	dType_LedModeColor:int = 0x24,
	dType_LedModeColor2:int = 0x25,
	dType_LedEvent:int = 0x26,
	dType_LedEvent2:int = 0x27,
	dType_LedEventCommand:int = 0x28,
	dType_LedEventCommandIr:int = 0x29,
	dType_LedEventColor:int = 0x2A,
	dType_LedEventColor2:int = 0x2B,

	dType_Address:int = 0x30,
	dType_State:int = 0x31,
	dType_Attitude:int = 0x32,
	dType_GyroBias:int = 0x33,
	dType_TrimAll:int = 0x34,
	dType_TrimFlight:int = 0x35,
	dType_TrimDrive:int = 0x36,

	dType_IrMessage:int = 0x40,

	dType_ImuRawAndAngle:int = 0x50,
	dType_Pressure:int = 0x51,
	dType_ImageFlow:int = 0x52,
	dType_Button:int = 0x53,
	dType_Batery:int = 0x54,
	dType_Motor:int = 0x55,
	dType_Temperature:int = 0x56,

	dType_LinkState:int = 0xE0,
	dType_LinkEvent:int = 0xE1,
	dType_LinkEventAddress:int = 0xE2,
	dType_LinkRssi:int = 0xE3,
	dType_LinkDiscoveredDevice:int = 0xE4,
	dType_LinkPasscode:int = 0xE5,

  dType_StringMessage:int = 0xD0,
	dType_EndOfType:int = 0xD1

};

Process.prototype.CommandType = {

  cType_None:int = 0,

	cType_ModeDrone:int = 0x10,

	cType_Coordinate:int = 0x20,
	cType_Trim:int = 0x21,
	cType_FlightEvent:int = 0x22,
	cType_DriveEvent:int = 0x23,
	cType_Stop:int = 0x24,

	cType_ResetHeading:int = 0x50,
	cType_ClearGyroBiasAndTrim:int = 0x51,

	cType_PairingActivate:int = 0x80,
	cType_PairingDeactivate:int = 0x81,
	cType_TerminateConnection:int = 0x82,

	cType_Request:int = 0x90,

	cType_LinkModeBroadcast:int = 0xE0,
	cType_LinkSystemReset:int = 0xE1,
	cType_LinkDiscoverStart:int = 0xE2,
	cType_LinkDiscoverStop:int = 0xE3,
	cType_LinkConnect:int = 0xE4,
	cType_LinkDisconnect:int = 0xE5,
	cType_LinkRssiPollingStart:int = 0xE6,
	cType_LinkRssiPollingStop:int = 0xE7,

	cType_EndOfType:int = 0xE8
};


Process.prototype.ModeDrone = {

	dMode_None:int = 0,

	dMode_Flight:int = 0x10,
	dMode_FlightNoGuard:int = 0x11,
	dMode_FlightFPV:int = 0x12,

	dMode_Drive:int = 0x20,
	dMode_DriveFPV:int = 0x21,

	dMode_Test:int = 0x30,
	dMode_EndOfType:int = 0x31

};

Process.prototype.ModeVehicle = {

	vMode_None:int = 0,
	vMode_Boot:int = 1,
	vMode_Wait:int = 2,
	vMode_Ready:int = 3,
	vMode_Running:int = 4,
	vMode_Update:int = 5,
	vMode_UpdateComplete:int = 6,
	vMode_Error:int = 7,
	vMode_EndOfType:int = 8

};

Process.prototype.ModeFlight = {

  fMode_None:int = 0,
	fMode_Ready:int = 1,
	fMode_TakeOff:int = 2,
	fMode_Flight:int = 3,
	fMode_Flip:int = 4,
	fMode_Stop:int = 5,
	fMode_Landing:int = 6,
	fMode_Reverse:int = 7,
	fMode_Accident:int = 8,
	fMode_Error:int = 9,
	fMode_EndOfType:int = 10

};

Process.prototype.ModeDrive = {

  dvMode_None:int = 0,
	dvMode_Ready:int = 1,
	dvMode_Start:int = 2,
	dvMode_Drive:int = 3,
	dvMode_Stop:int = 4,
	dvMode_Accident:int = 5,
	dvMode_Error:int = 6,
	dvMode_EndOfType:int = 7

};

Process.prototype.SensorOrientation = {

  senOri_None:int = 0,
	senOri_Normal:int = 1,
	senOri_ReverseStart:int = 2,
	senOri_Reverse:int = 3,
	senOri_EndOfType:int = 4

};

Process.prototype.Coordinate = {

  cSet_None:int = 0,
	cSet_Absolute:int = 1,
	cSet_Relative:int = 2,
	cSet_EndOfType:int = 3

};

Process.prototype.Trim = {

  trim_None:int = 0,
	trim_RollIncrease:int = 1,
	trim_RollDecrease:int = 2,
	trim_PitchIncrease:int = 3,
	trim_PitchDecrease:int = 4,
	trim_YawIncrease:int = 5,
	trim_YawDecrease:int = 6,
	trim_ThrottleIncrease:int = 7,
	trim_ThrottleDecrease:int = 8,
	trim_EndOfType:int = 9

};

Process.prototype.FlightEvent = {

  fEvent_None:int = 0,
	fEvent_TakeOff:int = 1,
	fEvent_FlipFront:int = 2,
	fEvent_FlipRear:int = 3,
	fEvent_flipLeft:int = 4,
	fEvent_FlipRight:int = 5,
	fEvent_Stop:int = 6,
	fEvent_Landing:int = 7,
	fEvent_TurnOver:int = 8,
	fEvent_Shot:int = 9,
	fEvent_UnderAttack:int = 10,
	fEvent_Square:int = 11,
	fEvent_CircleLeft:int = 12,
	fEvent_CircleRight:int = 13,
	fEvent_Rotate180:int = 14,
	fEvent_EndOfType:int = 15

};

Process.prototype.DriveEvent = {

  dEvent_None:int = 0,
	dEvent_Ready:int = 1,
	dEvent_Start:int = 2,
	dEvent_Drive:int = 3,
	dEvent_Stop:int = 4,
	dEvent_Accident:int = 5,
	dEvent_Error:int = 6,
  dEvent_EndOfType:int = 7

};

Process.prototype.Request = {

	Req_Address:int = 0x30,
	Req_State:int = 0x31,
	Req_Attitude:int = 0x32,
	Req_GyroBias:int = 0x33,
	Req_TrimAll:int = 0x34,
	Req_TrimFlight:int = 0x35,
	Req_TrimDrive:int = 0x36,


	Req_ImuRawAndAngle:int = 0x50,
	Req_Pressure:int = 0x51,
	Req_ImageFlow:int = 0x52,
	Req_Button:int = 0x53,
	Req_Battery:int = 0x54,
	Req_Motor:int = 0x55,
	Req_Temperature:int = 0x56,
	Req_EndOfType:int = 0x57

};

Process.prototype.ModeLight = {

  Light_None:int = 0,
  WaitingForConnect:int = 1,
  Connected:int = 2,

  EyeNone:int = 0x10,
  EyeHold:int = 0x11,
  EyeMix:int = 0x12,
  EyeFlicker:int = 0x13,
  EyeFlickerDouble:int = 0x14,
  EyeDimming:int = 0x15,

  ArmNone:int = 0x40,
  ArmHold:int = 0x41,
  ArmMix:int = 0x42,
  ArmFlicker:int = 0x43,
  ArmFlickerDouble:int = 0x44,
  ArmDimming:int = 0x45,
  ArmFlow:int = 0x46,
  ArmFlowReverse:int = 0x47,
  EndOfLedMode:int = 0x48

};

Process.prototype.Colors = {

	AliceBlue:int = 0, AntiqueWhite:int = 1, Aqua:int = 2,
	Aquamarine:int = 3, Azure:int = 4, Beige:int = 5,
	Bisque:int = 6, Black:int = 7, BlanchedAlmond:int = 8,
	Blue:int = 9, BlueViolet:int = 10, Brown:int = 11,
	BurlyWood:int = 12, CadetBlue:int = 13, Chartreuse:int = 14,
	Chocolate:int = 15, Coral:int = 16, CornflowerBlue:int = 17,
	Cornsilk:int = 18, Crimson:int = 19, Cyan:int = 20,
	DarkBlue:int = 21, DarkCyan:int = 22, DarkGoldenRod:int = 23,
	DarkGray:int = 24, DarkGreen:int = 25, DarkKhaki:int = 26,
	DarkMagenta:int = 27, DarkOliveGreen:int = 28, DarkOrange:int = 29,
	DarkOrchid:int = 30, DarkRed:int = 31, DarkSalmon:int = 32,
	DarkSeaGreen:int = 33, DarkSlateBlue:int = 34, DarkSlateGray:int = 35,
	DarkTurquoise:int = 36, DarkViolet:int = 37, DeepPink:int = 38,
	DeepSkyBlue:int = 39, DimGray:int = 40, DodgerBlue:int = 41,
	FireBrick:int = 42, FloralWhite:int = 43, ForestGreen:int = 44,
	Fuchsia:int = 45, Gainsboro:int = 46, GhostWhite:int = 47,
	Gold:int = 48, GoldenRod:int = 49, Gray:int = 50,
	Green:int = 51, GreenYellow:int = 52, HoneyDew:int = 53,
	HotPink:int = 54, IndianRed:int = 55, Indigo:int = 56,
	Ivory:int = 57, Khaki:int = 58, Lavender:int = 59,
	LavenderBlush:int = 60, LawnGreen:int = 61, LemonChiffon:int = 62,
	LightBlue:int = 63, LightCoral:int = 64, LightCyan:int = 65,
	LightGoldenRodYellow:int = 66, LightGray:int = 67, LightGreen:int = 68,
	LightPink:int = 69, LightSalmon:int = 70, LightSeaGreen:int = 71,
	LightSkyBlue:int = 72, LightSlateGray:int = 73, LightSteelBlue:int = 74,
	LightYellow:int = 75, Lime:int = 76, LimeGreen:int = 77,
	Linen:int = 78, Magenta:int = 79, Maroon:int = 80,
	MediumAquaMarine:int = 81, MediumBlue:int = 82, MediumOrchid:int = 83,
	MediumPurple:int = 84, MediumSeaGreen:int = 85, MediumSlateBlue:int = 86,
	MediumSpringGreen:int = 87, MediumTurquoise:int = 88, MediumVioletRed:int =89,
	MidnightBlue:int = 90, MintCream:int = 91, MistyRose:int = 92,
	Moccasin:int = 93, NavajoWhite:int = 94, Navy:int = 95,
	OldLace:int = 96, Olive:int = 97, OliveDrab:int = 98,
	Orange:int = 99, OrangeRed:int = 100, Orchid:int = 101,
	PaleGoldenRod:int = 102, PaleGreen:int = 103, PaleTurquoise:int = 104,
	PaleVioletRed:int = 105, PapayaWhip:int = 106, PeachPuff:int = 107,
	Peru:int = 108, Pink:int = 109, Plum:innt = 110,
	PowderBlue:int = 111, Purple:int = 112, RebeccaPurple:int = 113,
	Red:int = 114, RosyBrown:int = 115, RoyalBlue:int = 116,
	SaddleBrown:int = 117, Salmon:int = 118, SandyBrown:int = 119,
	SeaGreen:int = 120, SeaShell:int = 121, Sienna:int = 122,
	Silver:int = 123, SkyBlue:int = 124, SlateBlue:int = 125,
	SlateGray:int = 126, Snow:int = 127, SpringGreen:int = 128,
	SteelBlue:int = 129, Tan:int = 130, Teal:int = 131,
	Thistle:int = 132, Tomato:int = 133, Turquoise:int = 134,
	Violet:int = 135, Wheat:int = 136, White:int = 137,
	WhiteSmoke:int = 138, Yellow:int = 139, YellowGreen:int = 140,
	EndOfColor:int = 141

};

Process.prototype.Packets = {

  //sending packet
  controlPacket : new Buffer(10,'utf8'),
  flightPacket : new Buffer(8,'utf8'),
  modePacket: new Buffer(8, 'utf8'),
  requestPacket: new Buffer(8, 'utf8'),
  LEDControlPacket: new Buffer(9,'utf8'),


  statePacket : new Buffer(8, 'utf8'),
  attitudePacket : new Buffer(8, 'utf8'),
  gyroBiasPacket : new Buffer(8, 'utf8'),
  trimAllPacket : new Buffer(8, 'utf8'),
  trimFlightPacket : new Buffer(8, 'utf8'),
  trimDrivePacket : new Buffer(8, 'utf8'),
  ImuRawAndAnglePacket : new Buffer(8, 'utf8'),
  pressurePacket : new Buffer(8, 'utf8'),
  imageFlowPacket : new Buffer(8, 'utf8'),
  buttonPacket : new Buffer(8, 'utf8'),
  batteryPacket : new Buffer(8, 'utf8'),
  motorPacket : new Buffer(8, 'utf8'),
  temparaturePacket : new Buffer(8, 'utf8'),

  //receiving packet
  droneState : new Buffer(7, 'utf8'),
  droneAttitude : new Buffer(6, 'utf8'),
  droneGyroBias : new Buffer(6, 'utf8'),
  droneTrimAll : new Buffer(10, 'utf8'),
  droneTrimFlight : new Buffer(8, 'utf8'),
  droneTrimDrive : new Buffer(2, 'utf8'),
  droneImuRawAndAngle : new Buffer(9, 'utf8'),
  dronePressure : new Buffer(16, 'utf8'),
  droneImageFlow : new Buffer(8, 'utf8'),
  droneButton : new Buffer(1, 'utf8'),
  droneBattery : new Buffer(16, 'utf8'),
  droneMotor : new Buffer(16, 'utf8'),
  droneTemperature : new Buffer(8, 'utf8'),

}

Process.prototype.packetTable = {

  sendCounter : int = 0,
  loopExit : false,

  //relate to sendCounter
  control : int = 0,
  flight : int = 1,

  state : int = 2,
  attitude : int = 3,
  gyroBias : int = 4,
  trimAll : int = 5,
  trimFlight : int = 6,
  trimDrive : int = 7,
  ImuRawAndAngle : int = 8,
  pressure : int = 9,
  imageFlow : int = 10,
  button : int = 11,
  battery : int = 12,
  motor : int = 13,
  temperature : int = 14,
  LEDControl : int = 15,
  droneMode : int = 16,

  endOfInterval : int = 20,

  controlSendEn : int = 0,
  flightSendEn : int = 0,
  LEDControlSendEn : int = 0,
  stateSendEn : int = 0,
  attitudeSendEn : int = 0,
  gyroBiasSendEn : int = 0,
  trimAllSendEn : int = 0,
  trimFlightSendEn : int = 0,
  trimDriveSendEn : int = 0,
  ImuRawAndAngleSendEn : int = 0,
  pressureSendEn : int = 0,
  imageFlowSendEn : int = 0,
  buttonSendEn : int = 0,
  batterySendEn : int = 0,
  motorSendEn : int = 0,
  temperatureSendEn : int = 0,
  droneModeSendEn : int = 0,
  enableNum_1 : int = 1,
  enableNum_2 : int = 2,
  enableNum_3 : int = 3,
  enableNum_4 : int = 4,
  enableNum_5 : int = 5,
}

Process.prototype.exDataInit = function() {
  var myself = this;
  var j = 0;
  console.log("into exData!");
  for ( j = 0; j < 10; j++)  myself.Packets.controlPacket[j] = 0x00;
  for ( j = 0; j < 8; j++)   myself.Packets.flightPacket[j] = 0x00;
  for ( j = 0; j < 8; j++)   myself.Packets.modePacket[j] = 0x00;

  for ( j = 0; j < 7; j++) myself.Packets.droneState[j] = 0x00;
  for ( j = 0; j < 6; j++) myself.Packets.droneAttitude[j] = 0x00;
  for ( j = 0; j < 6; j++) myself.Packets.droneGyroBias[j] = 0x00;
  for ( j = 0; j < 10; j++) myself.Packets.droneTrimAll[j] = 0x00;
  for ( j = 0; j < 8; j++) myself.Packets.droneTrimFlight[j] = 0x00;
  for ( j = 0; j < 2; j++) myself.Packets.droneTrimDrive[j] = 0x00;
  for ( j = 0; j < 9; j++) myself.Packets.droneImuRawAndAngle[j] = 0x00;
  for ( j = 0; j < 16; j++) myself.Packets.dronePressure[j] = 0x00;
  for ( j = 0; j < 8; j++) myself.Packets.droneImageFlow[j] = 0x00;
  for ( j = 0; j < 1; j++) myself.Packets.droneButton[j] = 0x00;
  for ( j = 0; j < 16; j++) myself.Packets.droneBattery[j] = 0x00;
  for ( j = 0; j < 4; j++) myself.Packets.droneMotor[j] = 0x00;
  for ( j = 0; j < 8; j++) myself.Packets.droneTemperature[j] = 0x00;
}

Process.prototype.droneMode = function(mode) {
  var myself = this;
  var sprite = this.homeContext.receiver;
  var netData = new Buffer('utf8');
  var val = new Int8Array(1);
  var num  = 0;
  var packetLength = 8;

  if (sprite.arduino.isBoardReady()) {
      switch(mode[0]) {
        case 'FLIGHT': val[0] = 0x10; break;
        case 'FLIGHT_NO_GUARD': val[0] = 0x11; break;
        case 'FLIGHT_FPV': val[0] = 0x12; break;
        case 'DRIVE': val[0] = 0x20; break;
        case 'DRIVE_FPV': val[0] = 0x21; break;
        case 'TEST': val[0] = 0x30; break;
       }

       myself.Packets.modePacket[0] = 0x0A;
       myself.Packets.modePacket[1] = 0x55;
       myself.Packets.modePacket[2] = myself.DataType.dType_Command;
       myself.Packets.modePacket[3] = packetLength - 6;
       myself.Packets.modePacket[4] = myself.CommandType.cType_ModeDrone;

       myself.Packets.modePacket[5] = val[0];
       netData = myself.Packets.modePacket.slice(2, packetLength - 2);

       var crc = require('crc');
       var crc16Val = crc.crc16xmodem(netData);
       myself.Packets.modePacket[packetLength - 1] = (crc16Val >> 8) & 0xFF;
       myself.Packets.modePacket[packetLength - 2] = crc16Val & 0xFF;

       myself.packetTable.droneModeSendEn = myself.packetTable.enableNum_3;

  } else {
      throw new Error(localize("Board not connected"));
  }
}

Process.prototype.LEDControl = function(mode, color, interval) {
  var myself = this;
  var sprite = this.homeContext.receiver;
  var netData = new Buffer('utf8');
  var val = new Int8Array(1);
  var packetLength = 9;
  var i = 0;

  if (sprite.arduino.isBoardReady()) {

    myself.Packets.LEDControlPacket[0] = 0x0A;
    myself.Packets.LEDControlPacket[1] = 0x55;
    myself.Packets.LEDControlPacket[2] = myself.DataType.dType_LedMode;
    myself.Packets.LEDControlPacket[3] = packetLength - 6;

    val[0] = 0;
    switch(mode[0]) {
      case 'EYE_NONE': val[0] = 0x10; break;
      case 'EYE_HOLD':val[0] = 0x11; break;
      case 'EYE_MIX':val[0] = 0x12; break;
      case 'EYE_FLICKER':val[0] = 0x13; break;
      case 'EYE_FLICKER_DOUBLE':val[0] = 0x14; break;
      case 'EYE_DIMMING':val[0] = 0x15; break;
      case 'ARM_NONE': val[0] = 0x40; break;
      case 'ARM_HOLD':val[0] = 0x41; break;
      case 'ARM_MIX':val[0] = 0x42; break;
      case 'ARM_FLICKER':val[0] = 0x43; break;
      case 'ARM_FLICKER_DOUBLE':val[0] = 0x44; break;
      case 'ARM_DIMMING':val[0] = 0x45; break;
      case 'ARM_FLOW':val[0] = 0x46; break;
      case 'ARM_FLOW_REVERSE':val[0] = 0x47; break;
    }
    myself.Packets.LEDControlPacket[4] = val[0];

    val[0] = 0;
    if(isNaN(color) == true) {
      switch(color[0]) {
        case 'BLUE': val[0] = 9; break;
        case 'CORAL':val[0] = 16; break;
        case 'CYAN':val[0] = 20; break;
        case 'RED':val[0] = 114; break;
        case 'GREEN':val[0] = 51; break;
        case 'PINK':val[0] = 109; break;
        case 'LIME': val[0] = 76; break;
        case 'YELLOW':val[0] = 139; break;
        case 'LINEN':val[0] = 78; break;
        case 'MAGENTA':val[0] = 79; break;
        case 'GOLD':val[0] = 48; break;
        case 'VIOLET':val[0] = 135; break;
        case 'WHITE':val[0] = 137; break;
        case 'PURPLE':val[0] = 112; break;
        case 'IVORY':val[0] = 57; break;
        case 'MINT_CREAM':val[0] = 91; break;
      }
    }
    else {
      val[0] = color;
      if((val[0] < 0) && (val[0] > 140)) val[0] = 0;
    }
    myself.Packets.LEDControlPacket[5] = val[0];

    val[0] = 0x00;
    if((interval < 0) && (interval > 255)) val[0] = 0;
    else val[0] = interval;
    myself.Packets.LEDControlPacket[6] = val[0];

    netData = myself.Packets.LEDControlPacket.slice(2, packetLength - 2);

    console.log("send data!");
    var crc = require('crc');
    var crc16Val = crc.crc16xmodem(netData);
    myself.Packets.LEDControlPacket[packetLength - 1] = (crc16Val >> 8) & 0xFF;
    myself.Packets.LEDControlPacket[packetLength - 2] = crc16Val & 0xFF;

    myself.packetTable.LEDControlSendEn = myself.packetTable.enableNum_3;

  //    console.log(myself.Packets.controlPacket[4]+ " " + myself.Packets.controlPacket[5] + " " + myself.Packets.controlPacket[6] + " " + myself.Packets.controlPacket[7] + " " + myself.Packets.controlPacket[8] + " " + myself.Packets.controlPacket[9]);
  //    console.log(myself.Packets.exControlPacket[4]+ " " + myself.Packets.exControlPacket[5] + " " + myself.Packets.exControlPacket[6] + " " + myself.Packets.exControlPacket[7] + " " + myself.Packets.exControlPacket[8] + " " + myself.Packets.exControlPacket[9]);
  } else {
      throw new Error(localize("Board not connected"));
  }
}

Process.prototype.request = function(mode) {
  var sprite = this.homeContext.receiver;
  var myself = this;
  var netData = new Buffer('utf8');
  var val = new Int8Array(1);
  var num  = 0;
  var packetLength = 8;
  var i = 0;
  var returnValue;
  var test = "hello";

  if (sprite.arduino.isBoardReady()) {

    switch(mode[0]) {
      case 'STATE_CODRONE': val[0] = myself.Request.Req_State; num = 1; break;
      case 'STATE_VEHICLE':val[0] = myself.Request.Req_State; num = 2; break;
      case 'STATE_FLIGHT':val[0] = myself.Request.Req_State; num = 3; break;
      case 'STATE_DRIVE':val[0] = myself.Request.Req_State; num = 4; break;
      case 'STATE_SENSOR_ORIENTATION':val[0] = myself.Request.Req_State; num = 5; break;
      case 'STATE_COORDINATE':val[0] = myself.Request.Req_State; num = 6; break;
      case 'ATTITUDE_ROLL':val[0] = myself.Request.Req_Attitude; num = 7; break;
      case 'ATTITUDE_PITCH': val[0] = myself.Request.Req_Attitude; num = 8; break;
      case 'ATTITUDE_YAW':val[0] = myself.Request.Req_Attitude; num = 9; break;
      case 'GYROBIAS_ROLL':val[0] = myself.Request.Req_GyroBias; num = 10; break;
      case 'GYROBIAS_PITCH':val[0] = myself.Request.Req_GyroBias; num = 11; break;
      case 'GYROBIAS_YAW':val[0] = myself.Request.Req_GyroBias; num = 12; break;
      case 'TRIM_FLIGHT_ROLL':val[0] = myself.Request.Req_TrimFlight; num = 13; break;
      case 'TRIM_FLIGHT_PITCH':val[0] = myself.Request.Req_TrimFlight; num = 14; break;
      case 'TRIM_FLIGHT_YAW':val[0] = myself.Request.Req_TrimFlight; num = 15; break;
      case 'TRIM_FLIGHT_THROTTLE':val[0] = myself.Request.Req_TrimFlight; num = 16; break;
      case 'TRIM_DRIVE':val[0] = myself.Request.Req_TrimDrive; num = 17; break;
      case 'PRESSURE':val[0] = myself.Request.Req_Pressure; num = 18; break;
      case 'IMAGEFLOW_X':val[0] = myself.Request.Req_ImageFlow; num = 19; break;
      case 'IMAGEFLOW_Y':val[0] =  myself.Request.Req_ImageFlow; num = 20; break;
      case 'BUTTON':val[0] = myself.Request.Req_Button; num = 21; break;
      //case 'BATTERY_PERCENT':val[0] = myself.request.Req_Battery; num = 22; break;
      case 'BATTERY_PERCENT':val[0] = myself.Request.Req_State; num = 22; break;
      case 'BATTERY_VOLTAGE':val[0] = myself.Request.Req_Battery; num = 23; break;
      case 'MOTOR1':val[0] = myself.Request.Req_Motor; num = 24; break;
      case 'MOTOR2':val[0] = myself.Request.Req_Motor; num = 25; break;
      case 'MOTOR3':val[0] = myself.Request.Req_Motor; num = 26; break;
      case 'MOTOR4':val[0] = myself.Request.Req_Motor; num = 27; break;
      case 'TEMPERATURE_IMU':val[0] = myself.Request.Req_Temperature; num = 28; break;
      case 'TEMPARATURE_PRESSURE':val[0] =  myself.Request.Req_Temperature; num  = 29; break;
      default : val[0] = 0x00;
    }

    myself.Packets.requestPacket[0] = 0x0A;
    myself.Packets.requestPacket[1] = 0x55;
    myself.Packets.requestPacket[2] = myself.DataType.dType_Command;
    myself.Packets.requestPacket[3] = packetLength - 6;
    myself.Packets.requestPacket[4] = myself.CommandType.cType_Request;

    myself.Packets.requestPacket[5] = val[0];
    netData = myself.Packets.requestPacket.slice(2, packetLength - 2);

    //console.log("request!");
    var crc = require('crc');
    var crc16Val = crc.crc16xmodem(netData);
    myself.Packets.requestPacket[packetLength - 1] = (crc16Val >> 8) & 0xFF;
    myself.Packets.requestPacket[packetLength - 2] = crc16Val & 0xFF;

    if(val[0] == myself.Request.Req_State) {
      myself.Packets.statePacket = myself.Packets.requestPacket.slice(0, packetLength);
      myself.packetTable.stateSendEn = myself.packetTable.enableNum_3;
    }
    else if(val[0] == myself.Request.Req_Attitude) {
      myself.Packets.attitudePacket = myself.Packets.requestPacket.slice(0, packetLength);
      myself.packetTable.attitudeSendEn = myself.packetTable.enableNum_3;
      console.log("request attitude!");
    }
    else if(val[0] == myself.Request.Req_GyroBias) {
      myself.Packets.gyroBiasPacket = myself.Packets.requestPacket.slice(0, packetLength);
      myself.packetTable.gyroBiasSendEn = myself.packetTable.enableNum_3;
    }
    else if(val[0] == myself.Request.Req_TrimFlight) {
      myself.Packets.trimFlightPacket = myself.Packets.requestPacket.slice(0, packetLength);
      myself.packetTable.trimFlightSendEn = myself.packetTable.enableNum_3;
    }
    else if(val[0] == myself.Request.Req_TrimDrive) {
      myself.Packets.trimDrivePacket = myself.Packets.requestPacket.slice(0, packetLength);
      myself.packetTable.trimDriveSendEn = myself.packetTable.enableNum_3;
    }
    else if(val[0] == myself.Request.Req_Pressure) {
      myself.Packets.pressurePacket = myself.Packets.requestPacket.slice(0, packetLength);
      myself.packetTable.pressureSendEn = myself.packetTable.enableNum_3;
    }
    else if(val[0] == myself.Request.Req_ImageFlow) {
      myself.Packets.imageFlowPacket = myself.Packets.requestPacket.slice(0, packetLength);
      myself.packetTable.imageFlowSendEn = myself.packetTable.enableNum_3;
    }
    else if(val[0] == myself.Request.Req_Button) {
      myself.Packets.buttonPacket = myself.Packets.requestPacket.slice(0, packetLength);
      myself.packetTable.buttonSendEn = myself.packetTable.enableNum_3;
    }
    else if(val[0] == myself.Request.Req_Battery) {
      myself.Packets.batteryPacket = myself.Packets.requestPacket.slice(0, packetLength);
      myself.packetTable.batterySendEn = myself.packetTable.enableNum_3;
    }
    else if(val[0] == myself.Request.Req_Motor) {
      myself.Packets.motorPacket = myself.Packets.requestPacket.slice(0, packetLength);
      myself.packetTable.motorSendEn = myself.packetTable.enableNum_3;
      console.log("request motor!");
    }
    else if(val[0] == myself.Request.Req_Temperature) {
      myself.Packets.temperaturePacket = myself.Packets.requestPacket.slice(0, packetLength);
      myself.packetTable.temperatureSendEn = myself.packetTable.enableNum_3;
    }

    switch(num) {
      case 1:
      if(myself.Packets.droneState[0] == myself.ModeDrone.dMode_None) returnValue = 'NONE';
      else if(myself.Packets.droneState[0] == myself.ModeDrone.dMode_Flight) returnValue = 'FLIGHT';
      else if(myself.Packets.droneState[0] == myself.ModeDrone.dMode_FlightNoGuard) returnValue = 'FLIGHT_NO_GUARD';
      else if(myself.Packets.droneState[0] == myself.ModeDrone.dMode_FlightFPV) returnValue = 'FLIGHT_FPV';
      else if(myself.Packets.droneState[0] == myself.ModeDrone.dMode_Drive) returnValue = 'DRIVE';
      else if(myself.Packets.droneState[0] == myself.ModeDrone.dMode_DriveFPV) returnValue = 'DRIVE_FPV';
      else if(myself.Packets.droneState[0] == myself.ModeDrone.dMode_Test) returnValue = 'TEST';
      break;

      case 2:
      if(myself.Packets.droneState[1] == myself.ModeVehicle.vMode_None) returnValue = 'NONE';
      else if(myself.Packets.droneState[1] == myself.ModeVehicle.vMode_Boot) returnValue = 'BOOT';
      else if(myself.Packets.droneState[1] == myself.ModeVehicle.vMode_Wait) returnValue = 'WAIT';
      else if(myself.Packets.droneState[1] == myself.ModeVehicle.vMode_Ready) returnValue = 'READY';
      else if(myself.Packets.droneState[1] == myself.ModeVehicle.vMode_Running) returnValue = 'RUNNING';
      else if(myself.Packets.droneState[1] == myself.ModeVehicle.vMode_Update) returnValue = 'UPDATE';
      else if(myself.Packets.droneState[1] == myself.ModeVehicle.vMode_UpdateComplete) returnValue = 'UPDATE_COMPLETE';
      else if(myself.Packets.droneState[1] == myself.ModeVehicle.vMode_Error) returnValue = 'ERROR';
      break;

      case 3:
      if(myself.Packets.droneState[2] == myself.ModeFlight.fMode_None) returnValue = 'NONE';
      else if(myself.Packets.droneState[2] == myself.ModeFlight.fMode_Ready) returnValue = 'READY';
      else if(myself.Packets.droneState[2] == myself.ModeFlight.fMode_TakeOff) returnValue = 'TAKE_OFF';
      else if(myself.Packets.droneState[2] == myself.ModeFlight.fMode_Flight) returnValue = 'FLIGHT';
      else if(myself.Packets.droneState[2] == myself.ModeFlight.fMode_Flip) returnValue = 'FLIP';
      else if(myself.Packets.droneState[2] == myself.ModeFlight.fMode_Stop) returnValue = 'STOP';
      else if(myself.Packets.droneState[2] == myself.ModeFlight.fMode_Landing) returnValue = 'LANDING';
      else if(myself.Packets.droneState[2] == myself.ModeFlight.fMode_Reverse) returnValue = 'REVERSE';
      else if(myself.Packets.droneState[2] == myself.ModeFlight.fMode_Accident) returnValue = 'ACCIDENT';
      else if(myself.Packets.droneState[2] == myself.ModeFlight.fMode_Error) returnValue = 'ERROR';
      break;

      case 4:
      if(myself.Packets.droneState[3] == myself.ModeDrive.dvMode_None) returnValue = 'NONE';
      else if(myself.Packets.droneState[3] == myself.ModeDrive.dvMode_Ready) returnValue = 'READY';
      else if(myself.Packets.droneState[3] == myself.ModeDrive.dvMode_Start) returnValue = 'START';
      else if(myself.Packets.droneState[3] == myself.ModeDrive.dvMode_Drive) returnValue = 'DRIVE';
      else if(myself.Packets.droneState[3] == myself.ModeDrive.dvMode_Stop) returnValue = 'STOP';
      else if(myself.Packets.droneState[3] == myself.ModeDrive.dvMode_Accident) returnValue = 'ACCIDENT';
      else if(myself.Packets.droneState[3] == myself.ModeDrive.dvMode_Error) returnValue = 'ERROR';
      break;

      case 5:
      if(myself.Packets.droneState[4] == myself.SensorOrientation.senOri_None) returnValue = 'NONE';
      else if(myself.Packets.droneState[4] == myself.SensorOrientation.senOri_Normal) returnValue = 'NORMAL';
      else if(myself.Packets.droneState[4] == myself.SensorOrientation.senOri_ReverseStart) returnValue = 'REVERSE_START';
      else if(myself.Packets.droneState[4] == myself.SensorOrientation.senOri_Reverse) returnValue = 'REVERSE';
      break;

      case 6:
      if(myself.Packets.droneState[5] == myself.Coordinate.cSet_None) returnValue = 'NONE';
      else if(myself.Packets.droneState[5] == myself.Coordinate.cSet_Absolute) returnValue = 'ABSOLUTE';
      else if(myself.Packets.droneState[5] == myself.Coordinate.cSet_Relative) returnValue = 'RELATIVE';
      break;

      case 7:
      returnValue = ((myself.Packets.droneAttitude[1] << 8)|(myself.Packets.droneAttitude[0] & 0xFF));
      if(returnValue > 180) returnValue = returnValue - 65535;
      break;
      case 8:
      returnValue = ((myself.Packets.droneAttitude[3] << 8)|(myself.Packets.droneAttitude[2] & 0xFF));
      if(returnValue > 180) returnValue = returnValue - 65535;
      break;
      case 9:
      returnValue = ((myself.Packets.droneAttitude[5] << 8)|(myself.Packets.droneAttitude[4] & 0xFF));
      if(returnValue > 180) returnValue = 360 + (returnValue - 65535);
      break;

      case 10:
      returnValue = ((myself.Packets.droneGyroBias[1] << 8)|(myself.Packets.droneGyroBias[0] & 0xFF));
      if(returnValue > 180) returnValue = returnValue - 65535;
      break;
      case 11:
      returnValue = ((myself.Packets.droneGyroBias[3] << 8)|(myself.Packets.droneGyroBias[2] & 0xFF));
      if(returnValue > 180) returnValue = returnValue - 65535;
      break;

      case 12:
      returnValue = myself.Packets.droneGyroBias[4] & 0xFF;
      //if(returnValue > 180) returnValue = 360 + (returnValue - 65535);
      break;

      case 13:
      returnValue = ((myself.Packets.droneTrimFlight[1] << 8) | (myself.Packets.droneTrimFlight[0] & 0xFF));
      break;
      case 14:
      returnValue = ((myself.Packets.droneTrimFlight[3] << 8) | (myself.Packets.droneTrimFlight[2] & 0xFF));
      break;
      case 15:
      returnValue = ((myself.Packets.droneTrimFlight[5] << 8) | (myself.Packets.droneTrimFlight[4] & 0xFF));
      break;
      case 16:
      returnValue = ((myself.Packets.droneTrimFlight[7] << 8) | (myself.Packets.droneTrimFlight[6] & 0xFF));
      break;

      case 17:
      returnValue = ((myself.Packets.droneTrimDrive[1] << 8) | (myself.Packets.droneTrimDrive[0] & 0xFF));
      break;

      case 18:
      returnValue = ((myself.Packets.dronePressure[15] << 24) | (myself.Packets.dronePressure[14] << 16) | (myself.Packets.dronePressure[13] << 8) | (myself.Packets.dronePressure[12] & 0xFF));
      break;

      case 19:
      returnValue = ((myself.Packets.droneImageFlow[3] << 24) | (myself.Packets.droneImageFlow[2] << 16) | (myself.Packets.droneImageFlow[1] << 8) | (myself.Packets.droneImageFlow[0] & 0xFF));
      break;

      case 20:
      returnValue = ((myself.Packets.droneImageFlow[7] << 24) | (myself.Packets.droneImageFlow[6] << 16) | (myself.Packets.droneImageFlow[5] << 8) | (myself.Packets.droneImageFlow[4] & 0xFF));
      break;

      case 21:
      retrurnValue = myself.Packets.droneButton[0] & 0xFF;
      break;

      case 22:
      returnValue = myself.Packets.droneState[6] & 0xFF;
      break;

      case 23:
      returnValue = ((myself.Packets.droneBattery[15] << 8) | (myself.Packets.droneBattery[14] & 0XFF));
      break;

      case 24:
      var forward = ((myself.Packets.droneMotor[1] << 8) | (myself.Packets.droneMotor[0] & 0xFF));
      var reverse = ((myself.Packets.droneMotor[3] << 8) | (myself.Packets.droneMotor[2] & 0xFF));
      if(forward != 0) returnValue = forward;
      else  returnValue = -(reverse);
      break;

      case 25:
      var forward = ((myself.Packets.droneMotor[5] << 8) | (myself.Packets.droneMotor[4] & 0xFF));
      var reverse = ((myself.Packets.droneMotor[7] << 8) | (myself.Packets.droneMotor[6] & 0xFF));
      if(forward != 0) returnValue = forward;
      else  returnValue = -(reverse);
      break;

      case 26:
      var forward = ((myself.Packets.droneMotor[9] << 8) | (myself.Packets.droneMotor[8] & 0xFF));
      var reverse = ((myself.Packets.droneMotor[11] << 8) | (myself.Packets.droneMotor[10] & 0xFF));
      if(forward != 0) returnValue = forward;
      else  returnValue = -(reverse);
      break;

      case 27:
      var forward = ((myself.Packets.droneMotor[13] << 8) | (myself.Packets.droneMotor[12] & 0xFF));
      var reverse = ((myself.Packets.droneMotor[15] << 8) | (myself.Packets.droneMotor[14] & 0xFF));
      if(forward != 0) returnValue = forward;
      else returnValue = -(reverse);
      break;

      case 28:
      returnValue = ((myself.Packets.droneTemperature[3] << 24) | (myself.Packets.droneTemperature[2] << 16) | (myself.Packets.droneTemperature[1] << 8) | (myself.Packets.droneTemperature[0] & 0xFF));;
      break;

      case 29:
      returnValue = ((myself.Packets.droneTemperature[7] << 24) | (myself.Packets.droneTemperature[6] << 16) | (myself.Packets.droneTemperature[5] << 8) | (myself.Packets.droneTemperature[4] & 0xFF));;
      break;

      default: returnValue = 0;
    }
    return returnValue;
  }
  else {
  throw new Error(localize("Board not connected"));
  }
}

Process.prototype.sendData = function () {
    var myself = this;
    var sprite = this.homeContext.receiver;
    var netData = new Buffer('utf8');
    var packetLength = 10;
    var i = 0;

    if (sprite.arduino.isBoardReady()) {

      myself.Packets.controlPacket[0] = 0x0A;
      myself.Packets.controlPacket[1] = 0x55;
      myself.Packets.controlPacket[2] = myself.DataType.dType_Control;
      myself.Packets.controlPacket[3] = packetLength - 6;
      netData = myself.Packets.controlPacket.slice(2, packetLength - 2);

      console.log("sending command!");
      var crc = require('crc');
      var crc16Val = crc.crc16xmodem(netData);
      myself.Packets.controlPacket[packetLength - 1] = (crc16Val >> 8) & 0xFF;
      myself.Packets.controlPacket[packetLength - 2] = crc16Val & 0xFF;

      myself.packetTable.controlSendEn = myself.packetTable.enableNum_1;

    //    console.log(myself.Packets.controlPacket[4]+ " " + myself.Packets.controlPacket[5] + " " + myself.Packets.controlPacket[6] + " " + myself.Packets.controlPacket[7] + " " + myself.Packets.controlPacket[8] + " " + myself.Packets.controlPacket[9]);
    //    console.log(myself.Packets.exControlPacket[4]+ " " + myself.Packets.exControlPacket[5] + " " + myself.Packets.exControlPacket[6] + " " + myself.Packets.exControlPacket[7] + " " + myself.Packets.exControlPacket[8] + " " + myself.Packets.exControlPacket[9]);
    } else {
        throw new Error(localize("Board not connected"));
    }
}

Process.prototype.throttle = function(val) {
  var sprite = this.homeContext.receiver;
  var myself = this;
  if (sprite.arduino.isBoardReady()) {
    if(val >= 100) myself.Packets.controlPacket[7] = 100;
    else if(val <= -100) myself.Packets.controlPacket[7] = -100;
    else myself.Packets.controlPacket[7] = val;
  }
  else {
    throw new Error(localize("Board not connected"));
  }
}

Process.prototype.yaw = function(val) {
  var sprite = this.homeContext.receiver;
  var myself = this;
  if (sprite.arduino.isBoardReady()) {
    if(val >= 100) myself.Packets.controlPacket[6] = 100;
    else if(val <= -100) myself.Packets.controlPacket[6] = -100;
    else myself.Packets.controlPacket[6] = val;
  }
  else {
    throw new Error(localize("Board not connected"));
  }
}

Process.prototype.pitch = function(val) {
  var sprite = this.homeContext.receiver;
  var myself = this;
  if (sprite.arduino.isBoardReady()) {
    if(val >= 100) myself.Packets.controlPacket[5] = 100;
    else if(val <= -100) myself.Packets.controlPacket[5] = -100;
    else myself.Packets.controlPacket[5] = val;
  }
  else {
    throw new Error(localize("Board not connected"));
  }
}

Process.prototype.roll = function(val) {
  var sprite = this.homeContext.receiver;
  var myself = this;
  if (sprite.arduino.isBoardReady()) {
    if(val >= 100) myself.Packets.controlPacket[4] = 100;
    else if(val <= -100) myself.Packets.controlPacket[4] = -100;
    else myself.Packets.controlPacket[4] = val;
  }
  else {
    throw new Error(localize("Board not connected"));
  }
}

Process.prototype.flightEvent = function(mode) {
  var sprite = this.homeContext.receiver;
  var myself = this;
  var netData = new Buffer('utf8');
  var val = new Int8Array(1);
  var packetLength = 8;
  var i = 0;

  if (sprite.arduino.isBoardReady()) {
    myself.Packets.flightPacket[0] = 0x0A;
    myself.Packets.flightPacket[1] = 0x55;
    myself.Packets.flightPacket[2] = myself.DataType.dType_Command;
    myself.Packets.flightPacket[3] = packetLength - 6;
    myself.Packets.flightPacket[4] = myself.CommandType.cType_FlightEvent;

    switch(mode[0]) {
      case 'NONE': val[0] = 0; break;
      case 'TAKE_OFF':val[0] = 1; break;
      case 'FLIP_FRONT':val[0] = 2; break;
      case 'FLIP_REAR':val[0] = 3; break;
      case 'FLIP_LEFT':val[0] = 4; break;
      case 'FLIP_RIGHT':val[0] = 5; break;
      case 'STOP': val[0] = 6; break;
      case 'LANDING':val[0] = 7; break;
      case 'TURNOVER':val[0] = 8; break;
      case 'SHOT':val[0] = 9; break;
      case 'UNDER_ATTACK':val[0] = 10; break;
      case 'SQUARE':val[0] = 11; break;
      case 'CIRCLE_LEFT':val[0] = 12; break;
      case 'CIRCLE_RIGHT':val[0] = 13; break;
      case 'ROTATE_180':val[0] = 14; break;
      case 'END_OF_TYPE':val[0] = 15; break;
    }
    myself.Packets.flightPacket[5] = val[0];
    if((myself.Packets.flightPacket[5] == 6)||(myself.Packets.flightPacket[5] == 7))   myself.packetTable.controlSendEn = false;

    netData = myself.Packets.flightPacket.slice(2, packetLength - 2);

    console.log("send data!");
    var crc = require('crc');
    var crc16Val = crc.crc16xmodem(netData);
    myself.Packets.flightPacket[packetLength - 1] = (crc16Val >> 8) & 0xFF;
    myself.Packets.flightPacket[packetLength - 2] = crc16Val & 0xFF;
    myself.packetTable.flightSendEn = myself.packetTable.enableNum_3;

        for(i = 0; i < packetLength; i++) {
          console.log(" " + myself.Packets.flightPacket[i]);
        }
        console.log("\n");

  }
  else {
    throw new Error(localize("Board not connected"));
  }
}
