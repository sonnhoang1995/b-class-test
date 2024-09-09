import { router } from "expo-router"
import { useEffect, useState } from "react"
import {
    FlatList,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from "react-native"

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

export default function UsersScreen() {
    const [loading, setLoading] = useState<boolean>(false)
    const [users, setUsers] = useState<User[]>([])

    useEffect(() => {
        getListUser()
    }, [])

    const getListUser = async () => {
        try {
            setLoading(true)
            const listUser: User[] = await fetch(
                "https://jsonplaceholder.typicode.com/users"
            ).then((res) => res.json())
            setUsers(listUser)
        } finally {
            setLoading(false)
        }
    }

    const handleShowUserDetail = (id: number) => {
        router.push(`/(users)/${id}`)
    }

    return (
        <FlatList
            refreshing={loading}
            onRefresh={getListUser}
            data={users}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
                <View style={styles.itemContainer}>
                    <TouchableOpacity
                        style={styles.itemWrapper}
                        onPress={() => handleShowUserDetail(item.id)}
                    >
                        <Text style={styles.itemText}>{item.name}</Text>
                        <Text style={styles.itemText}>{item.username}</Text>
                    </TouchableOpacity>
                </View>
            )}
        />
    )
}

const styles = StyleSheet.create({
    itemContainer: {
        width: "100%",
        padding: 24,
        borderBottomColor: "#000000",
        borderBottomWidth: 1
    },
    itemWrapper: {
        flexDirection: "row",
        width: "100%",
        justifyContent: "space-between",
        alignItems: "center"
    },
    itemText: {
        color: "#000000",
        fontSize: 16
    }
})
