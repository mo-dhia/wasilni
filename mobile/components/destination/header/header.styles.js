import { locations } from "../../store";

const { activeInput } = locations
export default styles = (vw, vh) => ({
    header_wrapper: { width: '100%', height: activeInput.current ? 0 :  vh * 0.1, borderTopLeftRadius: vw * 0.04, borderTopRightRadius: vw * 0.04, overflow: 'hidden', marginTop:'15%' },
    header_container: { height: '80%', width: '100%', display: 'flex', flexDirection: 'row', overflow: 'hidden', alignItems: 'center' },
    header_imgContainer: { height: vh * 0.063, width: vh * 0.063, backgroundColor: '#c4c4c4', borderRadius: vw * 0.04 },
    header_textContainer: { flex: 1, paddingHorizontal: '5%' },
    header_cheer: { color: '#c4c4c4', fontSize: vw * 0.029, fontWeight: 700, fontFamily: 'Montserrat', paddingBottom: '1%' },
    header_howru: { fontWeight: 900, fontSize: vw * 0.033, fontFamily: 'Montserrat', },
    header_btn: { height: vh * 0.063, width: vh * 0.063, backgroundColor: '#efefef', borderRadius: vw * 0.04 },
});