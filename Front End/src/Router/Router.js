import HandleSingUp from '../components/QuanLyThuVien/handleSingUp/handleSingUp';
import HandleLogin from '../components/QuanLyThuVien/handleLogin/handleLogin';
import TabMenu from '../components/QuanLyThuVien/menuLibary/menu';
import MuonTra from '../components/QuanLyThuVien/QuanLyMuonTra/muontra'
import DocGia from '../components/QuanLyThuVien/QuanLyDocGia/docgia'
import Sinhvien from '../components/QuanLyThuVien/ThongTinSinhVien/sinhvien';
import QLSach from '../components/QuanLyThuVien/QuanLySach/sach'
import BaoCao from '../components/QuanLyThuVien/BaoCao/baocao'
import BienBan from '../components/QuanLyThuVien/QuanLyBienBan/bienban';
import TheThuVien from '../components/QuanLyThuVien/TheThuVien/TheThuVien';
import CheckThe from '../components/QuanLyThuVien/CheckTheThuVien/CheckThe.js';
import Home from '../components/Home/Home.js';

const RoutesLink = [
    { path: '/', component: Home},
    { path: '/loginThuVien',component: HandleLogin, },
    { path: '/singup', component: HandleSingUp},
    // { path: '/', component: TabMenu},
    { path: '/muontra', component: MuonTra},
    { path: '/docgia',component: DocGia},
    { path: '/sinhvien', component: Sinhvien},
    { path: '/sach',component: QLSach},
    { path: '/baocao', component: BaoCao},
    { path: '/bienban', component: BienBan},
    { path: '/thethuvien', component: TheThuVien},
    { path: '/checkthe', component: CheckThe},
];

export default RoutesLink;