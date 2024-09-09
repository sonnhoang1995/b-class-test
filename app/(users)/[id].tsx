import { useLocalSearchParams } from "expo-router"
import { useEffect, useState } from "react"
import { StyleSheet, Text, View } from "react-native"

interface Geo {
    lat: string
    lng: string
}

interface Address {
    street: string
    suite: string
    city: string
    zipcode: string
    geo: Geo
}

interface Company {
    name: string
    catchPhrase: string
    bs: string
}

interface User {
    id: number
    name: string
    username: string
    email: string
    address: Address
    phone: string
    website: string
    company: Company
}

export default function UserDetailScreen() {
    const { id } = useLocalSearchParams()

    const [user, setUser] = useState<User | null>(null)

    useEffect(() => {
        getUser()
    }, [])

    const getUser = async () => {
        const user: User = await fetch(
            `https://jsonplaceholder.typicode.com/users/${id}`
        ).then((res) => res.json())
        if (user) {
            setUser(user)
        }
    }

    return user ? (
        <View style={styles.container}>
            <View style={styles.itemGroup}>
                <Text style={styles.itemProperty}>Name:</Text>
                <Text style={styles.itemValue}>{user.name}</Text>
            </View>
            <View style={styles.itemGroup}>
                <Text style={styles.itemProperty}>Username:</Text>
                <Text style={styles.itemValue}>{user.username}</Text>
            </View>
            <View style={styles.itemGroup}>
                <Text style={styles.itemProperty}>Email:</Text>
                <Text style={styles.itemValue}>{user.email}</Text>
            </View>
            <View style={styles.itemGroup}>
                <Text style={styles.itemProperty}>Address:</Text>
                <Text style={styles.itemValue}>
                    {user.address.suite} {user.address.street},{" "}
                    {user.address.city}
                </Text>
            </View>
            <View style={styles.itemGroup}>
                <Text style={styles.itemProperty}>Phone:</Text>
                <Text style={styles.itemValue}>{user.phone}</Text>
            </View>
            <View style={styles.itemGroup}>
                <Text style={styles.itemProperty}>Website:</Text>
                <Text style={styles.itemValue}>{user.website}</Text>
            </View>
            <View style={styles.itemGroup}>
                <Text style={styles.itemProperty}>Company:</Text>
                <Text style={styles.itemValue}>{user.company.name}</Text>
            </View>
        </View>
    ) : (
        <></>
    )
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        paddingHorizontal: 24,
        gap: 16
    },
    itemGroup: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        borderBottomColor: "#000000",
        borderBottomWidth: 1,
        paddingVertical: 8
    },
    itemProperty: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#000000"
    },
    itemValue: {
        fontSize: 16,
        fontWeight: "400",
        color: "#808080",
        flexWrap: "wrap",
        maxWidth: "70%"
    }
})
