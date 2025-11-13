import {create} from "zustand"

const authenticateStore = create ((set) => ({
    authenticate: false,
    user: {},
    login: () => set({authenticate: true}),
    logout: () => set({authenticate: false}),
    settingUser: (id, pw) => set({user: {id: id, pw: pw}})
}));

export default authenticateStore;