import { createNavigationContainerRef } from "@react-navigation/native";

export const navigationRef = createNavigationContainerRef();

export const navigationHomeRef = createNavigationContainerRef();

export function navigate(name, params) {
  if (navigationRef.isReady()) {
    navigationRef.navigate(name, params);
  }
}

export function navigateHome(name, params) {
  if (navigationHomeRef.isReady()) {
    navigationHomeRef.navigate(name, params);
  }
}
