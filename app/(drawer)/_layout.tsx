import { useAuth, useUser } from '@clerk/clerk-expo';
import {
	DrawerContentScrollView,
	DrawerItem,
	DrawerItemList,
} from '@react-navigation/drawer';
import { Redirect, useRouter } from 'expo-router';
import { Drawer } from 'expo-router/drawer';
import { View } from 'tamagui';

export default function DrawerLayout() {
	const { isSignedIn, signOut } = useAuth();
	const { user } = useUser();
	const role = user?.publicMetadata?.role;
	const router = useRouter();

	const AuthRoutes = (props) => {
		return (
			<DrawerContentScrollView {...props} contentContainerStyle={{ flex: 1 }}>
				<View style={{ flex: 1 }}>
					<DrawerItemList {...props} />
				</View>

				<DrawerItem label={'Sign Out'} onPress={() => signOut()} />
			</DrawerContentScrollView>
		);
	};

	const checkRole = (route: string) => {
		const routePermissions = {
			rotation: ['dj', 'admin', 'manager'],
			rooms: ['admin', 'manager'],
			create_user: ['admin', 'manager'],
			create_room: ['admin'],
		};

		const allowedRoles = routePermissions[route];

		return !allowedRoles.includes(role);
	};

	if (!isSignedIn) return <Redirect href='/sign-in' />;

	return (
		<Drawer drawerContent={(props) => <AuthRoutes {...props} />}>
			<Drawer.Screen
				name='index'
				options={{
					drawerLabel: 'Dashboard',
					title: 'Dashboard',
				}}
			/>
			<Drawer.Screen
				name='create-user'
				options={{
					drawerLabel: 'Create User',
					title: 'Create User',
				}}
				redirect={checkRole('create_user')}
			/>
			<Drawer.Screen
				name='create-room'
				options={{
					drawerLabel: 'Create Room',
				}}
				redirect={checkRole('create_room')}
			/>
			<Drawer.Screen
				name='rotation'
				options={{
					drawerLabel: 'Rotation',
					headerTitle: 'DJ Rotation',
				}}
				redirect={checkRole('rotation')}
			/>
			<Drawer.Screen
				name='rooms'
				options={{
					drawerLabel: 'Rooms',
					headerTitle: 'VIP Rooms',
				}}
				redirect={checkRole('rooms')}
			/>
			<Drawer.Screen
				name='profile'
				options={{
					drawerLabel: 'Profile',
					headerTitle: 'Profile',
				}}
			/>
		</Drawer>
	);
}
