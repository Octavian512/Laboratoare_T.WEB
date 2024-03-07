import React, { useState, useEffect } from 'react';
import { Layout, Menu, Card, Form, Input, Button } from 'antd';
import { myObject } from './Fisier'; // Importăm myObject din fișierul corespunzător

const { Header, Content, Footer } = Layout;

const MyLayout: React.FC = () => {
    const items = ['Acasa', 'Carduri', 'Item 3'];
    const [currentPage, setCurrentPage] = useState('Acasa');
    const [showCardFields, setShowCardFields] = useState(false);

    const [cardsContent, setCardsContent] = useState([
        { title: 'Card 1', content: '123456789', owner: 'Donald Trump' }
    ]);

    const [input1, setInput1] = useState('');
    const [input2, setInput2] = useState('');
    const [input3, setInput3] = useState('');

    const handleSubmit = () => {
        const newCard = { title: input1, content: input2, owner: input3 };
        setCardsContent([...cardsContent, newCard]);
        setInput1('');
        setInput2('');
        setInput3('');
    };

    const handleAddCardFromObject = () => {
        const { field3: title, field2: content, field4: owner } = myObject;
        const newCard = { title, content: content.toString(), owner: owner.join(' ') };
        setCardsContent([...cardsContent, newCard]);
    };

    useEffect(() => {
        if (currentPage === 'Carduri') {
            handleAddCardFromObject();
        }
    }, [currentPage]);

    const handleMenuClick = (page: string) => {
        setCurrentPage(page);
        if(page === 'Carduri') {
            setShowCardFields(true);
        } else {
            setShowCardFields(false);
        }
    };

    const handleInput2Change = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.replace(/\D/g, '');
        setInput2(value);
    };

    const handleInput3Change = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.replace(/[^a-zA-Z]/g, '');
        setInput3(value);
    };

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Header>
                <div className="logo" />
                <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['0']}>
                    {items.map((item, index) => (
                        <Menu.Item key={index} onClick={() => handleMenuClick(item)}>{item}</Menu.Item>
                    ))}
                </Menu>
            </Header>
            <Content style={{ padding: '0 50px', textAlign: 'center' }}>
                <div className="site-layout-content">
                    {currentPage === 'Acasa' && (
                        <div style={{ marginTop: '50vh', transform: 'translateY(-50%)' }}>
                            <h1>IABANJI OCTAVIAN</h1>
                            <h2>CR-221</h2>
                        </div>
                    )}
                    {currentPage === 'Carduri' && (
                        cardsContent.map((card, index) => (
                            <Card key={index} title={card.title} style={{ width: 300, marginBottom: 16 }}>
                                <p>{card.content}</p>
                                <p>{card.owner}</p>
                            </Card>
                        ))
                    )}
                    {currentPage === 'Item 3' && (
                        <p>Text pentru Item 3</p>
                    )}
                    {showCardFields && (
                        <Form layout="inline" onFinish={handleSubmit}>
                            <Form.Item label="Nume Card">
                                <Input value={input1} onChange={e => setInput1(e.target.value)} />
                            </Form.Item>
                            <Form.Item label="Număr Card">
                                <Input value={input2} onChange={handleInput2Change} />
                            </Form.Item>
                            <Form.Item label="Nume Deținător">
                                <Input value={input3} onChange={handleInput3Change} />
                            </Form.Item>
                            <Form.Item>
                                <Button type="primary" htmlType="submit">
                                    Submit
                                </Button>
                            </Form.Item>
                        </Form>
                    )}
                </div>
            </Content>
            <Footer style={{ textAlign: 'center' }}>My Footer</Footer>
        </Layout>
    );
};

export default MyLayout;
