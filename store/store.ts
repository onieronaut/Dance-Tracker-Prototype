import { DANCERS } from '@/constants/Dancers';
import { ROOMS } from '@/constants/Rooms';
import { create } from 'zustand';

interface ClubState {
	dancers: any;
	updateDancers: (newDancers: any) => void;
	rooms: any;
	updateRooms: (newDancers: any) => void;
}

export const useClubStore = create<ClubState>()((set) => ({
	dancers: DANCERS,
	updateDancers: (newDancers) => set({ dancers: newDancers }),
	rooms: ROOMS,
	updateRooms: (newRooms) => set({ rooms: newRooms }),
}));
