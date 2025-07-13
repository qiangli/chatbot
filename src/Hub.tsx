import { useEffect } from 'react';
import wsManager from './ws/manager';

export type HubConfig = {
  url: string
  sender: string
};

const Hub: React.FC<HubConfig> = ({ url, sender }) => {
  useEffect(() => {
    wsManager.startHub(url, sender);
    return () => {
      wsManager.stopHub();
    };
  }, [url, sender]);

  return null;
};

export default Hub;
