import { createRef } from "react";
import { create } from 'zustand';

const updateState = (set, stateKey, value) => {
    set((state) => ({
        [stateKey]: typeof value === 'function' ? value(state[stateKey]) : value,
    }));
};

const locations_refs = () => {
    const from = createRef();
    const to = createRef();
    const activeInput = createRef()
    const map = createRef()
    return { from, to, activeInput, map };
};
export const locations = locations_refs();


export const states = create((set) => ({
    view: 0,
    setView: (v) => updateState(set, 'view', v),
    vw: 0,
    setVW: (v) => updateState(set, 'vw', v),
    vh: 0,
    setVH: (v) => updateState(set, 'vh', v),
    inputRerender: false,
    setInputRender: (v) => updateState(set, 'inputRerender', v),
    search: [],
    setSearch: (v) => updateState(set, 'search', v),
    origin: null,
    setOrigin: (v) => updateState(set, 'origin', v),
    destination: null,
    setDestination: (v) => updateState(set, 'destination', v),
    routeCoordinates: [],
    setRouteCoordinates: (v) => updateState(set, 'routeCoordinates', v),
}));

