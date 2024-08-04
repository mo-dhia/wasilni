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
}));


