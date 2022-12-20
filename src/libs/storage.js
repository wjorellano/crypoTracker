import AsyncStorage from '@react-native-async-storage/async-storage';

class Storage {

//     static instance = new Storage();
 
//     store = async (key, value) => {
//         try {
//             await AsyncStorage.setItem(key, value);
//             return true;
//         } catch (err) {
//             console.log("storage err", err);
//             return false;
//         }
//     }

//     // obtener un favorito
//     get = async (key) => {
//         try {
//             return await AsyncStorage.getItem(key);
//         } catch (err) {
//             console.log("storage err", err);
//             return false;
//         }
//     }

//     // guardar varios favoritos
//     multiGet = async (keys) => {
//         try {
//             return await AsyncStorage.multiGet(keys);
//         } catch (err) {
//             console.log("storage err", err);
//             return false;
//         }
//     }

//     // obtener todos los favoritos
//     getAllKeys = async () => {
//         try {
//             const keys = await AsyncStorage.getAllKeys();
//             return await AsyncStorage.multiGet(keys);
//         } catch (err) {
//             console.log("storage err", err);
//             return false;
//         }
//     }

//     // eliminar un favorito
//     remove = async (key) => {
//         try {
//             await AsyncStorage.removeItem(key);
//             return true;
//         } catch (err) {
//             console.log("storage err", err);
//             return false;
//         }
//     }

//     // eliminar todos los favoritos
//     removeAll = async () => {
//         try {
//             await AsyncStorage.clear();
//             return true;
//         } catch (err) {
//             console.log("storage err", err);
//             return false;
//         }
//     }

// }


    static instance = new Storage();
    
    store = async (key, value) => {
        try {
            await AsyncStorage.setItem('key', 'value');
            return true;
        } catch (err) {
            console.log("storage err", err);
            return false;
        }
    }

    // obtener un favorito
    get = async (key) => {
        try {
            return await AsyncStorage.getItem('key');
        } catch (err) {
            console.log("storage err", err);
            return false;
        }
    }

    // guardar varios favoritos
    multiGet = async (keys) => {
        try {
            return await AsyncStorage.multiGet(keys);
        } catch (err) {
            console.log("storage err", err);
            return false;
        }
    }

    // obtener todos los favoritos
    getAllKeys = async () => {
        try {
            const keys = await AsyncStorage.getAllKeys();
            return await AsyncStorage.multiGet(keys);
        } catch (err) {
            console.log("storage err", err);
            return false;
        }
    }

    // remover favoritos
    remove = async (key) => {
        try {
            await AsyncStorage.removeItem('key');
            return true;
        } catch (err) {
            console.log("storage err", err);
            return false;
        }
    }
}

export default Storage;