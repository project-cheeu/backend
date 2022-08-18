[
  //K => 카카오 비즈메시지 발송
  {
    code: 'K000',
    result: '',
    message: '카카오 비즈메시지 발송 성공',
  },
  {
    code: 'K101',
    result: 'NotAvailableSendMessage',
    message: '메시지를 전송할 수 없음',
  },
  {
    code: 'K102',
    result: 'InvalidPhoneNumber',
    message: '전화번호 오류',
  },
  {
    code: 'K103',
    result: 'OverLimitMessageLegth',
    message: '메시지 길이제한 오류',
  },
  {
    code: 'K104',
    result: 'TemplateNotFound',
    message: '템플릿을 찾을 수 없음',
  },
  {
    code: 'K105',
    result: 'NoMatchedTemplate',
    message: '메시지 내용이 템플릿과 일치하지 않음',
  },
  {
    code: 'K106',
    result: 'Invalidlmage',
    message: '첨부 이미지 URL 또는 링크 정보가 올바르지 않음',
  },
  {
    code: 'K107',
    result: 'SMSEmptyMessage',
    message:
      '카카오 발송 실패시 SMS 전환 발송을 하는 경우 SMS 메시지 내용이 없음',
  },
  {
    code: 'K108',
    result: 'NoMatchedTemplateButtonException',
    message: '메시지 버튼/바로연결이 템플릿과 일치하지 않음',
  },
  {
    code: 'K109',
    result: 'NoMatchedTemplateTitleException',
    message: '메시지 강조 표기 타이틀이 템플릿과 일치하지 않음',
  },
  {
    code: 'K110',
    result: 'ExceedMaxTitleLengthException',
    message: '메시지 강조 표기 타이틀 길이 제한',
  },
  {
    code: 'K201',
    result: 'DeleteSender',
    message: '삭제된 발신 프로필',
  },
  {
    code: 'K202',
    result: 'StoppedSender',
    message: '차단 상태의 발신프로필',
  },
  {
    code: 'K203',
    result: 'BlockedProfile',
    message: '차단 상태의 카카오톡 채널',
  },
  {
    code: 'K204',
    result: 'DeactivatedProfile',
    message: '닫힘 상태의 카카오톡 채널',
  },
  {
    code: 'K205',
    result: 'DeleteProfile',
    message: '삭제된 카카오톡 채널',
  },
  {
    code: 'K206',
    result: 'DeletingProfile',
    message: '삭제대기 상태의 카카오톡 채널',
  },
  {
    code: 'K207',
    result: 'SpammedProfile',
    message: '메시지차단 상태의 카카오톡 채널',
  },
  {
    code: 'K208',
    result: 'InvalidParameterException',
    message: '링크버튼 형식 오류',
  },
  {
    code: 'K301',
    result: 'FailedToSendMessageByNoFriendshipException',
    message: '메시지 전송 실패',
  },
  {
    code: 'K302',
    result: 'FailedToMatchTemplateException',
    message: '템플릿 일치 확인시 오류 발생',
  },
  {
    code: 'K303',
    result: 'NoSendAvailabletimeException',
    message: '메시지 발송 가능한 시간이 아님',
  },
  {
    code: 'K304',
    result: 'ExceedMaxVariableLengthException',
    message: '변수 글자수 제한 초과',
  },
  {
    code: 'K997',
    result: 'ResponseTimeoutException',
    message: '결과 대기시간 지남',
  },
  {
    code: 'K998',
    result: 'FailedToSendMessageException',
    message: '기타 오류로 메시지 전송 실패',
  },
  {
    code: 'K999',
    result: 'UnkownException',
    message: '시스템 오류',
  },
  //   E => 발송처리 오류
  {
    code: 'E101',
    result: 'InvalidData',
    message: 'Request 데이터 오류',
  },
  {
    code: 'E102',
    result: 'InvalidProfileKey',
    message: '발신 프로필 키가 없거나 유효하지 않음',
  },
  {
    code: 'E103',
    result: 'EmptyTemplateCode',
    message: '템플릿 코드가 없음',
  },
  {
    code: 'E104',
    result: 'InvalidPhoneNumber',
    message: '유효하지 않은 사용자 전화번호',
  },
  {
    code: 'E105',
    result: 'InvalidSenderNumber',
    message: '유효하지 않은 SMS 발신번호',
  },
  {
    code: 'E106',
    result: 'EmptyMessage',
    message: '메시지 내용이 없음',
  },
  {
    code: 'E107',
    result: 'SMSEmptyMessage',
    message:
      '카카오 발송 실패시 SMS 전환 발송을 하는 경우 SMS 메시지 내용이 없음',
  },
  {
    code: 'E108',
    result: 'InvalidReservationDate',
    message: '예약일지 이상',
  },
  {
    code: 'E109',
    result: 'DuplicatedMsgId',
    message: '중복된 MsgId 요청',
  },
  {
    code: 'E110',
    result: 'RequestMsgIdNotFound',
    message: 'MsgId 찾을 수 없음',
  },
  {
    code: 'E111',
    result: 'RequestImgNotFound',
    message: '첨부 이미지 URL 정보를 찾을 수 없음',
  },
  {
    code: 'E112',
    result: 'OverLimitMessageLength',
    message: '메시지 길이 제한',
  },
  {
    code: 'E113',
    result: 'OverLimitMsgIdLength',
    message: '메시지ID 길이 제한 오류',
  },
  {
    code: 'E114',
    result: 'DeleteSender',
    message: '삭제된 발신 프로필',
  },
  {
    code: 'E115',
    result: 'StoppedSender',
    message: '차단 상태의 발신 프로필',
  },
  {
    code: 'E116',
    result: 'BlockedProfile',
    message: '차단 상태의 카카오톡 채널',
  },
  {
    code: 'E117',
    result: 'DeactivatedProfile',
    message: '닫힘 상태의 카카ㅗ톡 채널',
  },
  {
    code: 'E118',
    result: 'DeleteProfile',
    message: '삭제된 카카오톡 채널',
  },
  {
    code: 'E119',
    result: 'DeletingProfile',
    message: '삭제 대기 상태의 카카오톡 채널',
  },
  {
    code: 'E998',
    result: 'OverLimitRequest',
    message: '최대 요청 수 초과',
  },
  {
    code: 'E999',
    result: 'UnkownException',
    message: '시스템 오류',
  },
  //   M => SMS/LMS 발송
  {
    code: 'M000',
    result: '',
    message: 'SMS/LMS 발송 성공',
  },
  {
    code: 'M001',
    result: 'NotAvailableSendMessage',
    message: '메시지를 전송할 수 없음',
  },
  {
    code: 'M101',
    result: 'NotAvailableSendMessage',
    message: '',
  },
  {
    code: 'M102',
    result: 'InvalidPhoneNumber',
    message: '전화번호 오류',
  },
  {
    code: 'M103',
    result: 'DoNotDistrub',
    message: '수신자 착신거부',
  },
  {
    code: 'M104',
    result: 'SpamMessage',
    message: '스팸 번호로 등록됨',
  },
  {
    code: 'M105',
    result: 'TurnOff',
    message: '수신자 단말기 전원 꺼짐',
  },
  {
    code: 'M106',
    result: 'OverLimitMessageLength',
    message: '메시지 길이 제한',
  },
  {
    code: 'M107',
    result: 'DeniedSenderNumber',
    message: '미등록된 SMS 발신번호',
  },
  {
    code: 'M108',
    result: 'InvalidImgUrl',
    message: '이미지 URL 누락',
  },
  {
    code: 'M998',
    result: 'ReportTimeoutException',
    message: '이동통신사 결과 수신 시간 초과',
  },
  {
    code: 'M999',
    result: 'UnkownException',
    message: '기타 시스템 오류',
  },
  //   R => 예약발송
  {
    code: 'R000',
    result: '',
    message: '발송 예약 성공',
  },
  {
    code: 'M109',
    result: 'DuplicatedMsgId',
    message: '중복된 MsgId 요청',
  },
];
