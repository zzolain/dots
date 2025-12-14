'use client';

import { useEffect, useState } from 'react';
import { check } from '@tauri-apps/plugin-updater';
import { relaunch } from '@tauri-apps/plugin-process';

export function Updater() {
  const [updateAvailable, setUpdateAvailable] = useState(false);
  const [status, setStatus] = useState<string>('');

  useEffect(() => {
    const checkUpdate = async () => {
      try {
        console.log('[Updater] Checking for updates...');
        const update = await check();
        
        if (update?.available) {
          console.log(`[Updater] Update available: ${update.version}`);
          setStatus(`업데이트 다운로드 중... (${update.version})`);
          
          // 업데이트가 있으면 바로 다운로드 및 설치
          await update.downloadAndInstall((event) => {
            switch (event.event) {
              case 'Started':
                console.log(`[Updater] Download started: ${event.data.contentLength} bytes`);
                break;
              case 'Progress':
                console.log(`[Updater] Download progress: ${event.data.chunkLength} bytes`);
                break;
              case 'Finished':
                console.log('[Updater] Download finished');
                break;
            }
          });
          
          console.log('[Updater] Update installed, ready to relaunch');
          // 설치가 완료되면 재시작 버튼을 보여주기 위해 상태 업데이트
          setUpdateAvailable(true); 
          setStatus('업데이트 준비 완료');
        } else {
          console.log('[Updater] No update available');
        }
      } catch (error) {
        console.error('[Updater] Update check failed:', error);
        setStatus('업데이트 확인 실패');
      }
    };

    // 앱 시작 시 1회만 업데이트 확인
    checkUpdate();
  }, []);

  const handleRelaunch = async () => {
    await relaunch();
  };

  if (!updateAvailable) {
    return null;
  }

  return (
    <div style={{
      position: 'fixed',
      bottom: '20px',
      right: '20px',
      backgroundColor: '#333',
      color: 'white',
      padding: '10px 20px',
      borderRadius: '5px',
      zIndex: 1000,
      display: 'flex',
      alignItems: 'center',
      gap: '15px'
    }}>
      <span>{status || '새로운 버전이 준비되었습니다.'}</span>
      <button
        onClick={handleRelaunch}
        style={{
          padding: '5px 10px',
          border: 'none',
          borderRadius: '3px',
          backgroundColor: '#0070f3',
          color: 'white',
          cursor: 'pointer'
        }}
      >
        재시작하여 업데이트
      </button>
    </div>
  );
}
