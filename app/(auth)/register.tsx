import {
    Keyboard,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View
} from "react-native"

import AsyncStorage from "@react-native-async-storage/async-storage"

import { router } from "expo-router"
import { useState } from "react"

interface User {
    email: string
    password: string
}

export default function RegisterScreen() {
    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const handleSignUp = async () => {
        if (!email || !password) return
        const userList = await AsyncStorage.getItem("user-list")
        if (userList) {
            const userArray: User[] = JSON.parse(userList)
            const existedUser = userArray.find(
                (user: User) => user.email === email
            )
            if (!existedUser) {
                const newUserArray = [...userArray, { email, password }]
                await AsyncStorage.setItem(
                    "user-list",
                    JSON.stringify(newUserArray)
                )
                setEmail("")
                setPassword("")
                router.back()
            }
        } else {
            await AsyncStorage.setItem(
                "user-list",
                JSON.stringify([{ email, password }])
            )
            setEmail("")
            setPassword("")
            router.back()
        }
    }

    const goToLoginScreen = () => {
        router.back()
    }

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.container}>
                <View style={styles.content}>
                    <View style={styles.loginForm}>
                        <Text style={styles.header}>Sign Up</Text>
                        <View style={styles.formItems}>
                            <TextInput
                                value={email}
                                onChangeText={setEmail}
                                style={styles.formItem}
                                placeholder="E-Mail"
                                placeholderTextColor="#FFFFFF"
                                showSoftInputOnFocus={true}
                                autoCapitalize="none"
                            />
                            <TextInput
                                value={password}
                                onChangeText={setPassword}
                                style={styles.formItem}
                                placeholder="Password"
                                placeholderTextColor="#FFFFFF"
                                showSoftInputOnFocus={true}
                                secureTextEntry={true}
                                autoCapitalize="none"
                            />
                        </View>
                    </View>
                    <View style={styles.buttonGroup}>
                        <TouchableOpacity
                            onPress={handleSignUp}
                            style={styles.button}
                        >
                            <Text style={styles.buttonText}>Sign Up</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={goToLoginScreen}
                            style={styles.button}
                        >
                            <Text style={styles.buttonText}>
                                Back to sign in
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#4B0082",
        height: "100%"
    },
    content: {
        height: "100%",
        width: "100%",
        paddingVertical: 64,
        paddingHorizontal: 16,
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center"
    },
    header: {
        color: "#FFFFFF",
        fontSize: 24,
        fontWeight: "bold"
    },
    loginForm: {
        width: "100%",
        flexDirection: "column",
        alignItems: "center",
        gap: 24
    },
    formItems: {
        width: "100%",
        flexDirection: "column",
        alignItems: "center",
        gap: 16,
        paddingHorizontal: 48
    },
    formItem: {
        width: "100%",
        height: 48,
        fontWeight: "bold",
        fontSize: 20,
        textAlign: "center",
        borderBottomColor: "rgba(255, 255, 255, 0.2)",
        borderBottomWidth: 1,
        color: "#FFFFFF"
    },
    buttonGroup: {
        flexDirection: "column",
        gap: 16,
        paddingHorizontal: 16
    },
    button: {
        alignItems: "center"
    },
    buttonText: {
        fontSize: 16,
        fontWeight: "600",
        color: "#FFFFFF"
    }
})
