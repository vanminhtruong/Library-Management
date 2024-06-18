import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import React from 'react';
import styles from '../assets/styles/App.module.scss';
import RoutesLink from './Router';
import TabMenu from '../components/QuanLyThuVien/menuLibary/menu';

function App() {
  return (
    <Router>
      <div className={styles.container}>
        <div className={styles.width}>
          <Routes>
            {RoutesLink.map((route, index) => {
              if (route.path === '/checkthe') {
                return <Route key={index} path={route.path} element={<route.component />} exact={route.exact} />;
              } else {
                return (
                  <Route key={index} path={route.path} element={<>
                    <TabMenu />
                    <route.component />
                  </>} exact={route.exact} />
                );
              }
            })}
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
