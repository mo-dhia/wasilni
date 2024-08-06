import { create } from 'zustand';

const updateState = (set, stateKey, value) => {
    set((state) => ({
        [stateKey]: typeof value === 'function' ? value(state[stateKey]) : value,
    }));
};
// chart: [],
// setChart: (v) => updateStateAndPersist(set, 'chart', v),

export default states = create((set) => ({
    VW: 0,
    setVW: (v) => set({ VW: v }),
    VH: 0,
    setVH: (v) => set({ VH: v }),
    topBAR: 0,
    setTOPBAR: (v) => set({ topBAR: v }),
    locations: [],
    setLocations: (v) => set({ locations: v }),
    activeInput: 0,
    setActiveInput: (v) => set({ activeInput: v }),
    departure: [],
    setDeparture: (v) => set({ departure: v }),
    destination: [],
    setDestination: (v) => set({ destination: v }),

}));


