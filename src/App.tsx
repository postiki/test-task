import React, { useState } from 'react';
import ProductsGrid from "./Components/ProductGrid";
import {Layout, Menu, MenuProps} from "antd";
import { Content, Header } from "antd/es/layout/layout";

function App() {
    const [currentMenuKey, setCurrentMenuKey] = useState('2'); // По умолчанию выбран раздел "Products"

    const handleMenuClick: MenuProps['onClick'] = (e) => {
        setCurrentMenuKey(e.key);
    };

    return (
        <Layout className="layout">
            <Header>
                <div className="logo" />
                <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']} onClick={handleMenuClick}>
                    <Menu.Item key="1">Home</Menu.Item>
                    <Menu.Item key="2">Products</Menu.Item>
                    <Menu.Item key="3">About</Menu.Item>
                </Menu>
            </Header>
            <Content style={{ padding: '0 50px' }}>
                <div className="site-layout-content">
                    {currentMenuKey === '2' && <ProductsGrid />}
                </div>
            </Content>
        </Layout>
    );
}

export default App;
