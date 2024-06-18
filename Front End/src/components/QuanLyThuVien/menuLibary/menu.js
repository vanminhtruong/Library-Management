import React, { useEffect, useState } from 'react';
import { Navbar, Nav, Button } from 'react-bootstrap';
import styles from '../../../assets/styles/menu.module.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import { json, useNavigate } from 'react-router-dom';
const TabMenu = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    // Kiểm tra xem người dùng đã đăng nhập hay chưa
    const token = localStorage.getItem('token');
    if (token) {
      // Nếu có token trong localStorage, cập nhật trạng thái đăng nhập
      setIsLoggedIn(true);
    }

    window.addEventListener("scroll", handleScroll);

    // Cleanup function
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleScroll = () => {
    if (window.scrollY > 0) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  };

  const handleLogout = () => {
    // Xóa token từ localStorage và cập nhật trạng thái đăng nhập
    const confirmLogout = window.confirm('Bạn có chắc chắn muốn đăng xuất?');
    if (confirmLogout) {
      // Xóa token từ localStorage và cập nhật trạng thái đăng nhập
      localStorage.removeItem('token');
      setIsLoggedIn(false);
      alert("Logout successfully");
      navigate('/');
    }
  };

  const handleMenuClick = (eventKey) => {
    if (!isLoggedIn) {
      // Nếu chưa đăng nhập, hiển thị thông báo và ngăn chặn chuyển hướng
      alert('Bạn cần đăng nhập trước khi truy cập menu.');
      eventKey.preventDefault();
    }
  };

  return (
    <div>
      <Navbar bg={scrolled ? "white": "#081b29"} fixed="top" expand="lg" className={["mx-auto mb-8", styles.width]} style={{transition: 'background-color 0.5s ease' }}>
        <Navbar.Brand href="/" className={scrolled?'text-black':'text-white'}>TRANG CHỦ</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav"/>
        <Navbar.Collapse id="basic-navbar-nav">
          <div className={styles.text}>
            <Nav className="mr-auto">
              <Nav.Link href="/muontra" className={scrolled ? 'text-black':'text-white'} onClick={handleMenuClick}>Quản Lý Mượn Trả</Nav.Link>
              <Nav.Link href="/docgia" className={scrolled ? 'text-black':'text-white'} onClick={handleMenuClick}>Quản Lý Độc Giả</Nav.Link>
              <Nav.Link href="/sinhvien" className={scrolled ? 'text-black':'text-white'} onClick={handleMenuClick}>Thông Tin Sinh Viên</Nav.Link>
              <Nav.Link href="/sach" className={scrolled ? 'text-black':'text-white'} onClick={handleMenuClick}>Quản Lý Sách</Nav.Link>
              <Nav.Link href="/baocao" className={scrolled ? 'text-black':'text-white'} onClick={handleMenuClick}>Báo Cáo</Nav.Link>
              <Nav.Link href="/thethuvien" className={scrolled ? 'text-black':'text-white'} onClick={handleMenuClick}>Làm Thẻ Thư Viện</Nav.Link>
            </Nav>
          </div>
          {isLoggedIn ? (
            <Button variant="outline-primary" className={styles.left} onClick={handleLogout}>Đăng xuất</Button>
          ) : (
            <Button variant="outline-primary" className={styles.left} href='/loginThuVien'>Đăng Nhập</Button>
          )}
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
}

export default TabMenu;
