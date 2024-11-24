import { Tabs } from "expo-router";
import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { UpdateProvider } from "../../services/UpdateContext";


export default function RootLayout() {
    return (
        <UpdateProvider>
            <Tabs screenOptions={{
                headerShown: false, tabBarShowLabel: false
            }}>
                <Tabs.Screen
                    name="feedstuff"
                    options={{
                        tabBarIcon: ({ color, focused }) => (
                            <TabBarIcon name={focused ? 'home' : 'home-outline'} color={color} />
                        ),
                    }}
                />
                <Tabs.Screen
                    name="myprofile"
                    options={{
                        tabBarIcon: ({ color, focused }) => (
                            <TabBarIcon name={focused ? 'person-circle-sharp' : 'person-circle-outline'} color={color} />
                        ),
                    }}
                />
            </Tabs >
        </UpdateProvider>
    );
}
