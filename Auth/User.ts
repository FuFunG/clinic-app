import * as SecureStore from 'expo-secure-store';

const USER_INFO = 'MY_USER_INFO';
let userInfo: UserInfo | null;

export interface UserInfo {
    accessToken: string
    refreshToken: string
    userId: number
    role: string
}

export const getUserInfo = async () => {
    if (userInfo != null) {
        return Promise.resolve(userInfo);
    }

    const jsonString = await SecureStore.getItemAsync(USER_INFO);
    console.log('getUserInfo', jsonString)
    if (jsonString)
        userInfo = JSON.parse(jsonString)
    else
        userInfo = null;
    return userInfo;
};


export const setUserInfo = (newUserInfo: UserInfo) => {
    userInfo = newUserInfo;
    console.log('setUserInfo', newUserInfo)
    return SecureStore.setItemAsync(USER_INFO, JSON.stringify(newUserInfo));
};

export const removeUserInfo = () => {
    userInfo = null;
    return SecureStore.deleteItemAsync(USER_INFO);
};

export const fetchSignIn = async (email: string, password: string): Promise<any> => {
    const response = await fetch(`${process.env.URL}/user/login`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            email: email,
            password: password,
        }),
    });
    const responseJson = await response.json();
    return responseJson
};

export const fetchSignUp = async (email: string, password: string, name: string, clinic: string, phoneNumber: string, address: string): Promise<any> => {
    const response = await fetch(`${process.env.URL}/user/register`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
        name: name,
        clinic: clinic,
        phoneNumber: phoneNumber,
        address: address,
      }),
    });
    const responseJson = await response.json();
    return responseJson
};