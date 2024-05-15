import React, { useState, useEffect } from 'react';
import { Layout, Form, Input, Button, Modal } from 'antd';

const { Header, Content } = Layout;

interface LoginPageProps {
    handleLogin: (values: { username: string, password: string }) => void;
    setSignUpVisible: (visible: boolean) => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ handleLogin, setSignUpVisible }) => {
    const [loading, setLoading] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        const storedUsername = localStorage.getItem('username');
        const storedPassword = localStorage.getItem('password');
        if (storedUsername && storedPassword) {
            setUsername(storedUsername);
            setPassword(storedPassword);
        }
    }, []);

    const onFinish = () => {
        setLoading(true);
        // Simulăm procesul de autentificare
        setTimeout(() => {
            setLoading(false);
            if (username === 'Octavian' && password === 'octavian5') {
                localStorage.setItem('isLoggedIn', 'true');
                localStorage.setItem('username', username); // Salvăm username-ul în localStorage
                handleLogin({ username, password }); // Apelăm funcția handleLogin cu valorile username și password
            } else {
                Modal.error({ title: 'Eroare', content: 'Datele introduse sunt incorecte!' });
            }
        }, 2000);
    };

    const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(e.target.value);
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    };

    return (
        <Layout style={{ minHeight: '100vh', background: 'linear-gradient(to right, #0575e6, #021b79)' }}>
            <Header style={{ textAlign: 'center', color: 'white', fontSize: '24px' }}>Login</Header>
            <Content style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 'calc(100vh - 64px)' }}>
                <div style={{ width: '300px', background: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0px 0px 10px 0px rgba(0,0,0,0.75)' }}>
                    <Form
                        name="login"
                        onFinish={onFinish}
                    >
                        <Form.Item
                            name="username"
                            rules={[{ required: true, message: 'Please input your username!' }]}
                        >
                            <Input placeholder="Username" value={username} onChange={handleUsernameChange} />
                        </Form.Item>

                        <Form.Item
                            name="password"
                            rules={[{ required: true, message: 'Please input your password!' }]}
                        >
                            <Input.Password placeholder="Password" value={password} onChange={handlePasswordChange} />
                        </Form.Item>

                        <Form.Item>
                            <Button type="primary" htmlType="submit" loading={loading} style={{ width: '100%' }}>Login</Button>
                        </Form.Item>

                        <Form.Item style={{textAlign: 'center'}}>
                            <a href="#/">Forget Password? </a>
                            <br></br> <a href="#/" onClick={() => setSignUpVisible(true)}> Not a Member? Sign up</a><></>
                        </Form.Item>
                    </Form>
                </div>
            </Content>
        </Layout>
    );
};

export default LoginPage;
