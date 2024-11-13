import * as SecureStore from 'expo-secure-store';

export async function saveOnSecureStore(key, value) {
    await SecureStore.setItemAsync(key, value);
}

export async function getFromSecureStore(key) {
    return await SecureStore.getItemAsync(key);
}
