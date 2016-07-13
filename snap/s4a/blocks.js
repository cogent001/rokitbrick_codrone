function pinsSettableToMode(aMode) {
    // Retrieve a list of pins that support a particular mode
    var sprite = world.children[0].currentSprite,
        board = sprite.arduino.board;

    var pinNumbers = {};
    var pins = board.pins;
    pins.forEach(
        function(each){
            if (each.supportedModes.indexOf(aMode) > -1) {
                var number = pins.indexOf(each).toString();
                pinNumbers[number] = number;
            }
        }
    );
    return pinNumbers;
}


// labelPart() proxy

SyntaxElementMorph.prototype.originalLabelPart = SyntaxElementMorph.prototype.labelPart;

SyntaxElementMorph.prototype.labelPart = function(spec) {
    var part;
    switch (spec) {

      case '%droneMode':
        part = new InputSlotMorph(
          null,
          false,
          {
            'FLIGHT':['FLIGHT'],
            'FLIGHT_NO_GUARD':['FLIGHT_NO_GUARD'],
            'FLIGHT_FPV':['FLIGHT_FPV'],
            'DRIVE':['DRIVE'],
            'DRIVE_FPV':['DRIVE_FPV'],
            'TEST':['TEST']
          },
          true
        );
      break;

      case '%sendMode':
        part = new InputSlotMorph(
          null,
          false,
          {
            'EYE_NONE':['EYE_NONE'],
            'EYE_HOLD':['EYE_HOLD'],
            'EYE_MIX':['EYE_MIX'],
            'EYE_FLICKER':['EYE_FLICKER'],
            'EYE_FLICKER_DOUBLE':['EYE_FLICKER_DOUBLE'],
            'EYE_DIMMING':['EYE_DIMMING'],
            'ARM_NONE':['ARM_NONE'],
            'ARM_HOLD':['ARM_HOLD'],
            'ARM_MIX':['ARM_MIX'],
            'ARM_FLICKER':['ARM_FLICKER'],
            'ARM_FLICKER_DOUBLE':['ARM_FLICKER_DOUBLE'],
            'ARM_DIMMING':['ARM_DIMMING'],
            'ARM_FLOW':['ARM_FLOW'],
            'ARM_FLOW_REVERSE':['ARM_FLOW_REVERSE']
          },
          true
        );
      break;

      case '%colorValue':
        part = new InputSlotMorph(
          null,
          false,
          {
            '(DIRECT_INPUT)':null,
            'BLUE':['BLUE'],
            'CORAL':['CORAL'],
            'CYAN':['CYAN'],
            'RED':['RED'],
            'GREEN':['GREEN'],
            'PINK':['PINK'],
            'LIME':['LIME'],
            'YELLOW':['YELLOW'],
            'LINEN':['LINEN'],
            'MAGENTA':['MAGENTA'],
            'GOLD':['GOLD'],
            'VIOLET':['VIOLET'],
            'WHITE':['WHITE'],
            'PURPLE':['PURPLE'],
            'IVORY':['IVORY'],
            'MINT_CREAM':['MINT_CREAM']
          }
        );
      break;

      case '%sendInterval':
          part = new InputSlotMorph(null, true);
      break;

      case '%throttleValue':
        part = new InputSlotMorph(null, true);
      break;
      case '%yawValue':
        part = new InputSlotMorph(null, true);
      break;
      case '%pitchValue':
        part = new InputSlotMorph(null, true);
      break;
      case '%rollValue':
        part = new InputSlotMorph(null, true);
      break;
      case '%eventName':
        part = new InputSlotMorph(
          null,
          false,
          {
            'NONE':['NONE'],
            'TAKE_OFF':['TAKE_OFF'],
            'FLIP_FRONT':['FLIP_FRONT'],
            'FLIP_REAR':['FLIP_REAR'],
            'FLIP_LEFT':['FLIP_LEFT'],
            'FLIP_RIGHT':['FLIP_RIGHT'],
            'STOP':['STOP'],
            'LANDING':['LANDING'],
            'TURNOVER':['TURNOVER'],
            'SHOT':['SHOT'],
            'UNDER_ATTACK':['UNDER_ATTACK'],
            'SQUARE':['SQUARE'],
            'CIRCLE_LEFT':['CIRCLE_LEFT'],
            'CIRCLE_RIGHT':['CIRCLE_RIGHT'],
            'ROTATE_180':['ROTATE_180'],
            'END_OF_TYPE':['END_OF_TYPE']
          },
          true
        );
      break;
      case '%requestType' :
      part = new InputSlotMorph(
        null,
        false,
        {
          'STATE_CODRONE' :['STATE_CODRONE'],
          'STATE_VEHICLE' :['STATE_VEHICLE'],
          'STATE_FLIGHT' :['STATE_FLIGHT'],
          'STATE_DRIVE' :['STATE_DRIVE'],
          'STATE_SENSOR_ORIENTATION' :['STATE_SENSOR_ORIENTATION'],
          'STATE_COORDINATE' :['STATE_COORDINATE'],
          'ATTITUDE_ROLL' :['ATTITUDE_ROLL'],
          'ATTITUDE_PITCH' :['ATTITUDE_PITCH'],
          'ATTITUDE_YAW' :['ATTITUDE_YAW'],
          'GYROBIAS_ROLL' :['GYROBIAS_ROLL'],
          'GYROBIAS_PITCH' :['GYROBIAS_PITCH'],
          'GYROBIAS_YAW' :['GYROBIAS_YAW'],
          'TRIM_FLIGHT_ROLL' :['TRIM_FLIGHT_ROLL'],
          'TRIM_FLIGHT_PITCH' :['TRIM_FLIGHT_PITCH'],
          'TRIM_FLIGHT_YAW' :['TRIM_FLIGHT_YAW'],
          'TRIM_FLIGHT_THROTTLE' :['TRIM_FLIGHT_THROTTLE'],
          'TRIM_DRIVE' :['TRIM_DRIVE'],
          'PRESSURE' :['PRESSURE'],
          'IMAGEFLOW_X' :['IMAGEFLOW_X'],
          'IMAGEFLOW_Y' :['IMAGEFLOW_Y'],
          'BUTTON' :['BUTTTON'],
          'BATTERY_PERCENT' :['BATTERY_PERCENT'],
          'BATTERY_VOLTAGE' :['BATTERY_VOLTAGE'],
          'MOTOR1' :['MOTOR1'],
          'MOTOR2' :['MOTOR2'],
          'MOTOR3' :['MOTOR3'],
          'MOTOR4' :['MOTOR4'],
          'TEMPERATURE_IMU' :['TEMPERATURE_IMU'],
          'TEMPARATURE_PRESSURE' :['TEMPARATURE_PRESSURE']
        },
        true
      );
      break;
      default:
        part = this.originalLabelPart(spec);
    }
    return part;
}

BlockMorph.prototype.userMenu = function () {
    var menu = new MenuMorph(this),
        world = this.world(),
        myself = this,
        shiftClicked = world.currentKey === 16,
        alternatives,
        top,
        blck;

    menu.addItem(
        "help...",
        'showHelp'
    );
    if (shiftClicked) {
        top = this.topBlock();
        if (top instanceof ReporterBlockMorph) {
            menu.addItem(
                "script pic with result...",
                function () {
                    top.ExportResultPic();
                },
                'open a new window\n' +
                    'with a picture of both\nthis script and its result',
                new Color(100, 0, 0)
            );
        }
    }
    if (this.isTemplate) {
        if (!(this.parent instanceof SyntaxElementMorph)) {
            if (this.selector !== 'evaluateCustomBlock') {
                menu.addItem(
                    "hide",
                    'hidePrimitive'
                );
            }
        }
        return menu;
    }

    menu.addLine();
    if (this.selector === 'reportGetVar') {
        blck = this.fullCopy();
        blck.addShadow();
        menu.addItem(
            'rename...',
            function () {
                new DialogBoxMorph(
                    myself,
                    myself.setSpec,
                    myself
                ).prompt(
                    "Variable name",
                    myself.blockSpec,
                    world,
                    blck.fullImage(), // pic
                    InputSlotMorph.prototype.getVarNamesDict.call(myself)
                );
            }
        );
    } else if (SpriteMorph.prototype.blockAlternatives[this.selector]) {
        menu.addItem(
            'relabel...',
            function () {
                myself.relabel(
                    SpriteMorph.prototype.blockAlternatives[myself.selector]
                );
            }
        );
    } else if (this.definition && this.alternatives) { // custom block
        alternatives = this.alternatives();
        if (alternatives.length > 0) {
            menu.addItem(
                'relabel...',
                function () {myself.relabel(alternatives); }
            );
        }
    }

    menu.addItem(
        "duplicate",
        function () {
            var dup = myself.fullCopy(),
                ide = myself.parentThatIsA(IDE_Morph);
            dup.pickUp(world);
            if (ide) {
                world.hand.grabOrigin = {
                    origin: ide.palette,
                    position: ide.palette.center()
                };
            }
        },
        'make a copy\nand pick it up'
    );
    if (this instanceof CommandBlockMorph && this.nextBlock()) {
        menu.addItem(
            this.thumbnail(0.5, 60, false),
            function () {
                var cpy = this.fullCopy(),
                    nb = cpy.nextBlock(),
                    ide = myself.parentThatIsA(IDE_Morph);
                if (nb) {nb.destroy(); }
                cpy.pickUp(world);
                if (ide) {
                    world.hand.grabOrigin = {
                        origin: ide.palette,
                        position: ide.palette.center()
                    };
                }
            },
            'only duplicate this block'
        );
    }
    menu.addItem(
        "delete",
        'userDestroy'
    );
    menu.addItem(
        "script pic...",
        function () {
            window.open(myself.topBlock().fullImage().toDataURL());
        },
        'open a new window\nwith a picture of this script'
    );
    if (this.parentThatIsA(RingMorph)) {
        menu.addLine();
        menu.addItem("unringify", 'unringify');
        menu.addItem("ringify", 'ringify');
        return menu;
    }

    if (StageMorph.prototype.enableCodeMapping && this.selector == 'receiveGo') {
        menu.addLine();
        menu.addItem(
            'export as Arduino sketch...',
            'exportAsArduinoC'
        );
    }

    if (this.parent instanceof ReporterSlotMorph
            || (this.parent instanceof CommandSlotMorph)
            || (this instanceof HatBlockMorph)
            || (this instanceof CommandBlockMorph
                && (this.topBlock() instanceof HatBlockMorph))) {
        return menu;
    }
    menu.addLine();
    menu.addItem("ringify", 'ringify');

    return menu;
};

BlockMorph.prototype.exportAsArduinoC = function () {
    var fs = require('fs'),
        ide = this.parentThatIsA(IDE_Morph),
        fileName = homePath() + (ide.projectName ? ide.projectName.replace(/[^a-zA-Z]/g,'') : 'snap4arduino') + '.ino';

    try {
        fs.writeFileSync(fileName, this.world().Arduino.processC(this.mappedCode()));
        ide.showMessage('Exported as ' + fileName, 1);
    } catch (error) {
        ide.inform('Error exporting to Arduino sketch!', error.message)
    }
};
