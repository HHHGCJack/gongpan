type DeviceNavigator = Pick<Navigator, 'userAgent' | 'platform' | 'maxTouchPoints'> & {
  userAgentData?: { mobile: boolean };
};

// Device identity stays the same when a desktop window is resized.
export function isMobileDevice(device: DeviceNavigator | undefined =
  typeof navigator === 'undefined' ? undefined : navigator
): boolean {
  if (!device) return false;

  if (/Android|iPhone|iPad|iPod|IEMobile|Windows Phone|BlackBerry|BB10|PlayBook|Silk|Kindle/i.test(device.userAgent)) {
    return true;
  }

  // iPadOS can identify itself as a Mac when requesting desktop websites.
  const isIPadDesktopMode = /Macintosh/i.test(device.userAgent) || device.platform === 'MacIntel';
  if (isIPadDesktopMode && device.maxTouchPoints > 1) return true;

  return device.userAgentData?.mobile === true;
}
