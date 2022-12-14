import { useContext, useMemo } from 'react';

import { CommsContext } from '../providers/CommsProvider';
import type { UseRecording } from '../types/recording';

import useSession from './useSession';

const useRecording: UseRecording = () => {
  const {
    startRecording,
    stopRecording,
    recordingData,
    resetRecordingData,
    setRecordingErrors,
    recordingErrorMessages: errorMessages,
  } = useContext(CommsContext);
  const { ownerId, timestamp, status, isRecordingModeActive } = recordingData;
  const { user } = useSession();

  const isLocalUserRecordingOwner = useMemo(() => {
    return ownerId === user?.id;
  }, [ownerId, user]);

  return {
    startRecording,
    stopRecording,
    ownerId,
    timestamp,
    isLocalUserRecordingOwner,
    status,
    resetRecordingData,
    isRecordingModeActive,
    setRecordingErrors,
    isError: errorMessages.length > 0,
  };
};

export default useRecording;
