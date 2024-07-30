import GearIcon from '@/icons/Gear.svg';
import UserIcon from '@/icons/User.svg';
import {
  useLocalParticipantPermissions,
  useMaybeLayoutContext,
  usePersistentUserChoices
} from '@livekit/components-react';
import { Track } from 'livekit-client';
import React from 'react';
import TrackToggle from '../../../prejoin/_components/TrackToggle';
import { useMediaQuery } from '../../_hooks/useMediaQuery';
import { supportsScreenSharing } from '../../_utils/supportsScreenSharing';

export type ControlBarControls = {
  microphone?: boolean;
  camera?: boolean;
  chat?: boolean;
  screenShare?: boolean;
  leave?: boolean;
  settings?: boolean;
};

export interface ControlBarProps extends React.HTMLAttributes<HTMLDivElement> {
  variation?: 'minimal' | 'verbose' | 'textOnly';
  controls?: ControlBarControls;
  /**
   * If `true`, the user's device choices will be persisted.
   * This will enables the user to have the same device choices when they rejoin the room.
   * @defaultValue true
   * @alpha
   */
  saveUserChoices?: boolean;
}

const BottomControlBar = ({ variation, controls, saveUserChoices = true, ...props }: ControlBarProps) => {
  const [isChatOpen, setIsChatOpen] = React.useState(false);
  const layoutContext = useMaybeLayoutContext();
  React.useEffect(() => {
    if (layoutContext?.widget.state?.showChat !== undefined) {
      setIsChatOpen(layoutContext?.widget.state?.showChat);
    }
  }, [layoutContext?.widget.state?.showChat]);
  const isTooLittleSpace = useMediaQuery(`(max-width: ${isChatOpen ? 1000 : 760}px)`);

  const defaultVariation = isTooLittleSpace ? 'minimal' : 'verbose';
  variation ??= defaultVariation;

  const visibleControls = { leave: true, ...controls };

  const localPermissions = useLocalParticipantPermissions();

  if (!localPermissions) {
    visibleControls.camera = false;
    visibleControls.chat = false;
    visibleControls.microphone = false;
    visibleControls.screenShare = false;
  } else {
    visibleControls.camera ??= localPermissions.canPublish;
    visibleControls.microphone ??= localPermissions.canPublish;
    visibleControls.screenShare ??= localPermissions.canPublish;
    visibleControls.chat ??= localPermissions.canPublishData && controls?.chat;
  }

  const showIcon = React.useMemo(() => variation === 'minimal' || variation === 'verbose', [variation]);
  const showText = React.useMemo(() => variation === 'textOnly' || variation === 'verbose', [variation]);

  const browserSupportsScreenSharing = supportsScreenSharing();

  const [isScreenShareEnabled, setIsScreenShareEnabled] = React.useState(false);

  const onScreenShareChange = React.useCallback(
    (enabled: boolean) => {
      setIsScreenShareEnabled(enabled);
    },
    [setIsScreenShareEnabled]
  );

  const { saveAudioInputEnabled, saveVideoInputEnabled, saveAudioInputDeviceId, saveVideoInputDeviceId } =
    usePersistentUserChoices({ preventSave: !saveUserChoices });

  const microphoneOnChange = React.useCallback(
    (enabled: boolean, isUserInitiated: boolean) => (isUserInitiated ? saveAudioInputEnabled(enabled) : null),
    [saveAudioInputEnabled]
  );

  const cameraOnChange = React.useCallback(
    (enabled: boolean, isUserInitiated: boolean) => (isUserInitiated ? saveVideoInputEnabled(enabled) : null),
    [saveVideoInputEnabled]
  );

  return (
    <div className="flex border-t-2  justify-between mx-4 p-4 fixed bottom-0 right-0 left-0  ">
      {visibleControls.microphone && (
        <div className="">
          <TrackToggle source={Track.Source.Microphone} showIcon={showIcon} onChange={microphoneOnChange}></TrackToggle>
          {/* <div className="">
            <MediaDeviceMenu
              kind="audioinput"
              onActiveDeviceChange={(_kind, deviceId) => saveAudioInputDeviceId(deviceId ?? '')}
            />
          </div> */}
        </div>
      )}
      {visibleControls.camera && (
        <div className="">
          <TrackToggle source={Track.Source.Camera} showIcon={showIcon} onChange={cameraOnChange}></TrackToggle>
          {/* <div className="">
            <MediaDeviceMenu
              kind="videoinput"
              onActiveDeviceChange={(_kind, deviceId) => saveVideoInputDeviceId(deviceId ?? '')}
            />
          </div> */}
        </div>
      )}
      {visibleControls.screenShare && browserSupportsScreenSharing && (
        <TrackToggle
          source={Track.Source.ScreenShare}
          captureOptions={{ audio: true, selfBrowserSurface: 'include' }}
          showIcon={showIcon}
          onChange={onScreenShareChange}
        >
          {showText && (isScreenShareEnabled ? 'Stop screen share' : '')}
        </TrackToggle>
      )}
      <button className="w-12 h-6 flex justify-center">
        <UserIcon />
      </button>
      <button className="w-12 h-6 flex justify-center">
        <GearIcon />
      </button>
      {/* {visibleControls.leave && (
        <DisconnectButton>
          {showIcon && <LeaveIcon />}
          {showText && 'Leave'}
        </DisconnectButton>
      )} */}
    </div>
  );
};
export default BottomControlBar;