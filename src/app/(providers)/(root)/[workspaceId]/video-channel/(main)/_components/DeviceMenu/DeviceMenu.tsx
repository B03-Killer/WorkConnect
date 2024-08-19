'use client';
import Button from '@/components/Button';
import Typography from '@/components/Typography';
import SpeakerIcon from '@/icons/Volume2.svg';
import SpeakerMuteIcon from '@/icons/VolumeX.svg';
import { useState } from 'react';
import useAudioOutput from '../../../_hooks/useAudioOutput';

type DeviceMenueProps = {
  onClose: () => void;
};

const DeviceMenu = ({ onClose }: DeviceMenueProps) => {
  const { devices, setAudioOutputDevice, toggleMute, isMuted } = useAudioOutput();
  const [selectedDeviceId, setSelectedDeviceId] = useState<string | null>(null);

  const handleDeviceChange = (deviceId: string) => {
    setAudioOutputDevice(deviceId);
    setSelectedDeviceId(deviceId);
  };
  return (
    <div className="h-[33vh] relative overflow-hidden ">
      <Typography variant="Title18px" color="grey700Black">
        오디오 장치 선택
      </Typography>

      <ul className="h-[75%] overflow-auto scroll-container">
        {devices.length === 0 && <li>오디오를 찾을 수 없습니다.</li>}
        {devices.map((device) => (
          <li
            key={device.deviceId}
            onClick={() => handleDeviceChange(device.deviceId)}
            className={`cursor-pointer hover:bg-gray-200 p-2 rounded flex items-center gap-3 ${
              selectedDeviceId === device.deviceId ? 'bg-blue-100' : ''
            }`}
          >
            <SpeakerIcon className="w-[22px]" />
            <Typography variant="Body14px" color="grey600">
              {device.label || `Device ${device.deviceId}`}
            </Typography>
          </li>
        ))}
        <li onClick={toggleMute} className="cursor-pointer rounded flex items-center gap-3 p-2 hover:bg-gray-200">
          <SpeakerMuteIcon className="w-[22px]" />
          <Typography variant="Body14px" color="grey600">
            오디오 끔
          </Typography>
        </li>
      </ul>

      <div className="absolute w-full bottom-0">
        <Button theme="primary" isFullWidth className="mt-3" onClick={onClose}>
          확인
        </Button>
      </div>
    </div>
  );
};

export default DeviceMenu;
