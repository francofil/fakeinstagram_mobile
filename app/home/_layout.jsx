import { Tabs } from "expo-router";
import { TabBarIcon } from '@/components/navigation/TabBarIcon';


export default function RootLayout() {
    return (
        <Tabs screenOptions={{
            headerShown: false, tabBarShowLabel: false
        }}>
            <Tabs.Screen
                name="feed"
                options={{
                    tabBarIcon: ({ color, focused }) => (
                        <TabBarIcon name={focused ? 'home' : 'home-outline'} color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="profile"
                options={{
                    tabBarIcon: ({ color, focused }) => (
                        <TabBarIcon name={focused ? 'person-circle-sharp' : 'person-circle-outline'} color={color} />
                    ),
                }}
            />
        </Tabs >
    );
}
