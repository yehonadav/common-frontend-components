import { fetchInstallStore, useInstallStore } from './useStore'

export const useIsInstallDialogOpen = ():boolean => useInstallStore(fetchInstallStore.open);
export const useIsInstallDialogClicked = ():boolean => useInstallStore(fetchInstallStore.clicked);
