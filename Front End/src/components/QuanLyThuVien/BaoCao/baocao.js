import React, { useState } from 'react';
import { Nav, Tab, Row, Col } from 'react-bootstrap';
import 'react-tabs/style/react-tabs.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import ThongKeMuon from './listThongKe/ThongKeMuon';
import MuonQuaHan from './listThongKe/MuonQuaHan';
import ThongKeViPham from './listThongKe/ThongKeViPham';
import styles from '../../../assets/styles/baocao.module.scss';

const BaoCao = () => {
    const [activeKey, setActiveKey] = useState('thongKeSachMuon');

  const handleSelect = (key) => {
    setActiveKey(key);
  };

  return (
    <div className={styles.top}>
      <Tab.Container activeKey={activeKey} onSelect={handleSelect} >
        <Row>
          <Col sm={3}>
            <Nav variant="pills" className="flex-column">
              <Nav.Item>
                <Nav.Link eventKey="thongKeSachMuon">Thống Kê Sách Mượn</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="muonQuaHan">Mượn Quá Hạn</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="thongKeViPham">Thống Kê Vi Phạm</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="thongKeSachChuaMuon">Thống Kê Sách Chưa Mượn</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="thongKeSinhVien">Thống Kê Sinh Viên Làm Thẻ</Nav.Link>
              </Nav.Item>
            </Nav>
          </Col>
          <Col sm={9}>
            <Tab.Content>
              <Tab.Pane eventKey="thongKeSachMuon">
                  <ThongKeMuon/>
              </Tab.Pane>
              <Tab.Pane eventKey="muonQuaHan">
                  <MuonQuaHan/>
              </Tab.Pane>
              <Tab.Pane eventKey="thongKeViPham">
                  <ThongKeViPham/>
              </Tab.Pane>
              <Tab.Pane eventKey="thongKeSachChuaMuon">
                <h2>Thống Kê Sách Chưa Mượn</h2>
                {/* Nội dung thống kê sách chưa mượn */}
              </Tab.Pane>
              <Tab.Pane eventKey="thongKeSinhVien">
                <h2>Thống Kê Sinh Viên Làm Thẻ</h2>
                {/* Nội dung thống kê sinh viên làm thẻ */}
              </Tab.Pane>
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
    </div>
  );
}

export default BaoCao;