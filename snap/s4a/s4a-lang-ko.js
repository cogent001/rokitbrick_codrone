s4aTempDict = {

    /*
       Special characters: (see <http://0xcc.net/jsescape/>)

       Ä, ä   \u00c4, \u00e4
       Ö, ö   \u00d6, \u00f6
       Ü, ü   \u00dc, \u00fc
       ß      \u00df
       */
    // primitive blocks:

    /*
       Attention Translators:
       ----------------------
       At this time your translation of block specs will only work
       correctly, if the order of formal parameters and their types
       are unchanged. Placeholders for inputs (formal parameters) are
       indicated by a preceding % prefix and followed by a type
       abbreviation.

       For example:

       'say %s for %n secs'

       can currently not be changed into

       'say %n secs long %s'

       and still work as intended.

       Similarly

       'point towards %dst'

       cannot be changed into

       'point towards %cst'

       without breaking its functionality.
       */

    // arduino:

    'Codrone':
        '코드론',

    'drone mode %droneMode':
        '드론 모드 %droneMode',

    'Disconnect board':
        '보드와 연결끊기',

    'Connect board':
        '보드와 연결하기',

    'LED Control %sendMode %colorValue time %sendInterval':
        'LED 제어 %sendMode %colorValue 주기 %sendInterval',

    'request %requestType':
        '요청하기 %requestType',

    'flight event %eventName':
        '비행 동작 %eventName',

    'sending Command':
        '명령 내리기',

    'stop':
      ' 강제 멈춤 ',

    'throttle %throttleValue':
        'throttle 입력 %throttleValue',

    'yaw %yawValue':
        'yaw 입력 %yawValue',

    'pitch %pitchValue':
        'pitch 입력 %pitchValue',

    'roll %rollValue':
        'roll 입력 %rollValue',

    'TAKE_OFF':
        '이륙하기',

    'STOP':
        '멈춤',

    'LANDING':
        '착륙',

    'TURNOVER':
        '뒤집기',

    'SHOT':
      '발사',

    'FLIP_FRONT':
      '앞으로 회전',

    'FLIP_REAR':
      '뒤로 회전',

    'FLIP_LEFT':
      '왼쪽 회전',

    'FLIP_RIGHT':
      '오른쪽 회전',

    'UNDER_ATTACK':
        '공격 회피',

    'SQUARE':
        '사각 비행',

    'CIRCLE_LEFT':
        '왼쪽 원 비행',

    'CIRCLE_RIGHT':
        '오른쪽 원 비행',

    'ROTATE_180':
        '180도 회전',

    'EYE_NONE':
        '눈 조명 없음',

    'EYE_HOLD':
        '눈 조명 유지하기',

    'EYE_MIX':
        '눈 조명 다양한 효과주기',

    'EYE_FLICKER':
        '눈 조명 깜빡이기',

    'EYE_FLICKER_DOUBLE':
        '눈 조명 두번 깜빡이기',

    'EYE_DIMMING':
        '눈 조명 밝기 변화하기',

    'ARM_NONE':
        '팔 조명 없음',

    'ARM_HOLD':
        '팔 조명 유지하기',

    'ARM_MIX':
        '팔 조명 여러가지 효과주기',

    'ARM_FLICKER':
        '팔 조명 깜빡이기',

    'ARM_FLICKER_DOUBLE':
        '팔 조명 두번 깜빡이기',

    'ARM_DIMMING':
         '팔 조명 밝기 변화하기',

    'ARM_FLOW':
          '팔 조명 이동하기',

    'ARM_FLOW_REVERSE':
          '팔 조명 거꾸로 이동하기',

    'BLUE':
        '파랑',

    'CORAL':
        '산호',

    'CYAN':
        '옥색',

    'RED':
        '빨강',

    'GREEN':
        '초록',

    'PINK':
        '핑크',

    'LIME':
        '라임',

    'YELLOW':
        '노랑',

    'LINEN':
        '린넨',

    'MAGENTA':
        '자홍',

    'GOLD':
        '금색',

    'VIOLET':
        '자주',

    'WHITE':
        '흰색',

    'PURPLE':
        '보라',

    'IVORY':
        '미색',

    'MINT_CREAM':
        '밝은 민트',

    'FLIGHT':
        '비행 모드',

    'FLIGHT_NO_GUARD':
        '비행 모드(가드없음)',

    'FLIGHT_FPV':
        '비행모드(FPV)',

    'DRIVE':
        '드라이브',

    'DRIVE_FPV':
        '드라이브(FPV)',

    'STATE_CODRONE':
        '코드론 상태',

    'STATE_VEHICLE':
        '기체 상태',

    'STATE_FLIGHT':
        '비행 상태',

    'STATE_DRIVE':
        '드라이브 상태',

    'STATE_SENSOR_ORIENTATION':
        '센서 기준 상태',

    'STATE_COORDINATE':
        '좌표 상태',

    'ATTITUDE_ROLL':
        'ROLL 각도',

    'ATTITUDE_YAW':
        'YAW 각도',

    'ATTITUDE_PITCH':
        'PITCH 각도',

    'GYROBIAS_ROLL':
        'ROLL 자이로편향값',

    'GYROBIAS_YAW':
        'YAW 자이로편향값',

    'GYROBIAS_PITCH':
        'PITCH 자이로편향값',

    'TRIM_FLIGHT_ROLL':
        'ROLL 미세 조종값',

    'TRIM_FLIGHT_YAW':
        'YAW 미세 조종값',

    'TRIM_FLIGHT_PITCH':
        'PITCH 미세 조종값',

    'TRIM_FLIGHT_THROTTLE':
        'THROTTLE 미세 조종값',

    'TRIM_DRIVE':
        'DRIVE 미세 조종값',

    'PRESSURE':
        '압력 센서값',

    'IMAGEFLOW_X':
        '영상 흐름 X',

    'IMAGEFLOW_Y':
        '영상 흐름 Y',

    'BUTTON':
        '버튼 입력',

    'BATTERY_PERCENT':
        '배터리 잔량(퍼센트)',

    'BATTERY_VOLTAGE':
        '배터리 잔량(전압)',

    'MOTOR1':
        '모터1',

    'MOTOR2':
        '모터2',

    'MOTOR3':
        '모터3',

    'MOTOR4':
        '모터4',

    'TEMPERATURE_IMU':
        'IMU 온도값',

    'TEMPARATURE_PRESSURE':
        '드론 온도값',

    'the following device has been discovered.\n\n':
        '다음 장치에 연결되었습니다.\n\n',

    'NAME:':
        '이름:',

    'ADDRESS:':
        '주소',

    'NONE':
        '없음',

    'BOOT':
        '부팅',

    'WAIT':
        '대기',

    'READY':
        '준비완료',

    'RUNNING':
        '주행중',

    'UPDATE':
        '업데이트',

    'UPDATE_COMPLETE':
        '업데이트 완료',

    'ERROR':
        '오류',

    'REVERSE':
        '거꾸로',

    'ACCIDENT':
        '사고',

    'NORMAL':
        '정상',

    'REVERSE_START':
        '거꾸로 출발',

    'ABSOLUTE':
        '절대',

    'RELATIVE':
        '상대',

    'Would you like to connect this device?':
        '이 장치에 연결하시겠습니까?',

    'It was connected with the following device.\n\n':
        '다음 장치에 연결되었습니다',

    'Searching the device...':
        '장치를 검색합니다...',

    'Unable to find the device.\n\n':
        '장치를 발견할 수 없습니다',

    'Connecting to the device...':
        '장치와 연결중입니다...',

    'Unable to open the port.\n\n':
        '포트에 연결할 수 없습니다',

    'Could not connect an device\nNo boards found':
        '장치에 연결할 수 없습니다.\n보드 발견 못함',

    'select a port':
        '포트 선택',

    'Board is not connected':
        '보드에 연결되지 않았습니다.',

    'There is already a board connected to this sprite':
        '이미 이 스프라이트에 보드가 연결되어 있습니다.',

    'Board was disconnected from port\n':
        '보드 연결이 끊어졌습니다\n',

    'Connecting board at port\n':
        '포트에 연결중입니다.\n',

    'Board has been connected at port \n':
        '포트에 보드가 연결되었습니다.\n',

    'It seems that someone pulled the cable!':
        '선 연결이 끊어진것 같습니다!',

    'Error connecting the board.':
        '보드와의 연결에 문제가 있습니다.',

    'An error was detected on the board\n\n':
        '동작에 문제가 있습니다.\n\n',

    'Board not connected':
        '보드와 연결 안됨',

    'There is a problem with communication.\nIt is recommended to disconnect and check the problem.':
         '보드와 통신이 원활하지 않습니다.\n\n연결을 해제하고 문제점을 확인하세요.',

    'Try the following.\n':
          '다음 사항들을 확인해 보세요.\n',

    '1)Check to see if the board is powered on.     ':
          '1)보드에 전원이 켜져 있는지 확인하세요.',

    ' 2)Check if your board is connected other port.' :
          '2)보드가 다른 포트와 연결되어 있는 것은 아닌지 확인하세요.',

    '3)Check if the board does not supported.       ':
          '3)지원되지 않는 장치를 연결한 것은 아닌 지 확인하세요',

    'Except for the first case,':
          '1)번의 경우를 제외하고',

    'It is recommend to diconnect with the device and Check the problem.':
          '포트 연결을 해제하고 문제를 확인하시기 바랍니다.',

};

// Add attributes to original SnapTranslator.dict.ca
for (var attrname in s4aTempDict) { SnapTranslator.dict.ko[attrname] = s4aTempDict[attrname]; }
