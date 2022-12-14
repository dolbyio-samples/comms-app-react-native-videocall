import type { ConferenceCreateOptions } from '@dolbyio/comms-sdk-react-native/lib/typescript/services/conference/models';
import { useCallback, useContext } from 'react';
import { PermissionsAndroid, Platform } from 'react-native';

import { CommsContext } from '../providers/CommsProvider';
import conferenceService from '../services/conference';

const useConference = () => {
  const {
    createConference,
    joinConference,
    conference,
    leaveConference,
    micPermissions,
    setMicPermissions,
    cameraPermissions,
    setCameraPermissions,
    isPageMuted,
    toggleMuteParticipants,
    isConferenceOwner,
    setIsConferenceOwner,
  } = useContext(CommsContext);

  const requestPermissions = async () => {
    try {
      const cameraGranted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA);
      const micGranted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.RECORD_AUDIO);

      if (cameraGranted === PermissionsAndroid.RESULTS.GRANTED) {
        setCameraPermissions(true);
      }
      if (micGranted === PermissionsAndroid.RESULTS.GRANTED) {
        setMicPermissions(true);
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
  };

  const initialize = async () => {
    if (Platform.OS === 'android') {
      await requestPermissions();
    }
  };

  return {
    conference,
    joinConference,
    createConference,
    leaveConference,
    micPermissions,
    cameraPermissions,
    initialize,
    isPageMuted,
    toggleMuteParticipants,
    isConferenceOwner,
    setIsConferenceOwner,
  };
};

export default useConference;
