import { locations } from "../components/store"

const { activeInput } = locations

export const handleInput = (setInputRender, current, data) => {
    activeInput.current = current
    setInputRender(p => !p)
    if (data) {
        console.log(data, 'azeaze');

    }
}