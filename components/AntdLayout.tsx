"use client";
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Layout, Menu, theme, Button } from 'antd';

const { Content, Footer, Sider } = Layout;

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

const items: MenuItem[] = [
  getItem(<Link href="/">知识广场</Link>, '1', <PieChartOutlined />),
  getItem('私域知识库', 'sub2', <TeamOutlined />, [
    getItem(<Link href="/team/1">企业知识</Link>, '6'),
    getItem(<Link href="/team/2">我的知识</Link>, '8'),
  ]),
  getItem(<Link href="/files">智能问答</Link>, '9', <FileOutlined />),
  getItem(<Link href="/about">我的知识</Link>, '10', <UserOutlined />),
  getItem(<Link href="/about">个人中心</Link>, '11', <DesktopOutlined />),
];

const AntdLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [broken, setBroken] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  // 优化：鼠标移入展开，移出收起，但在响应式断点下不自动收起
  const handleMouseEnter = () => {
    if (!broken) setCollapsed(false);
  };
  const handleMouseLeave = () => {
    if (!broken) setCollapsed(true);
  };

  return (
    <Layout style={{ height: '100vh' }}>
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        onCollapse={setCollapsed}
        style={{ background: colorBgContainer, transition: 'all 0.2s' }}
        breakpoint="lg"
        onBreakpoint={setBroken}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className="flex items-center justify-center h-16 transition-all duration-300">
          {collapsed ? (
            <Image
              src="/images/home/headLogo.png"
              alt="公司图标"
              width={36}
              height={36}
              className="transition-all duration-300"
              priority
            />
          ) : (
            <Image
              src="/images/home/logo.png"
              alt="公司全称logo"
              width={156}
              height={40}
              className="transition-all duration-300"
              style={{ height: 'auto' }}
              priority
            />
          )}
        </div>
        <Menu
          theme="light"
          defaultSelectedKeys={['1']}
          mode="inline"
          items={items}
          inlineCollapsed={collapsed}
        />
      </Sider>
      <Layout style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
        <Content
          style={{
            flex: 1,
            overflow: 'auto',
            margin: 0,
            padding: 0,
          }}
        >
          <div
            style={{
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              padding: 24,
              background: '#F3F3FF',
              borderRadius: borderRadiusLG,
              transition: 'all 0.2s',
            }}
          >
            {children}
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default AntdLayout;