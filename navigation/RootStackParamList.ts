type RootStackParamList = {
    Home: undefined;
    SignIn: { email?: string } | undefined;
    SignUp: { email?: string } | undefined;
    AddRecord: undefined;
    FindUser: { role: 'user' | 'doctor' }
};

export default RootStackParamList