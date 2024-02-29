import React, { useState } from 'react';
import { Layout, Menu, Card, Form, Input, Button } from 'antd';

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

    // Funcție pentru schimbarea paginii curente
    const handleMenuClick = (page: string) => {
        setCurrentPage(page);
        if(page === 'Carduri') {
            setShowCardFields(true); // Afișează câmpurile pentru carduri
        } else {
            setShowCardFields(false); // Ascunde câmpurile pentru carduri
        }
    };

    // Funcții pentru verificarea și limitarea introducerii de caractere
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
                        // Afiseaza textul mare pe mijlocul ecranului
                        <div style={{ marginTop: '50vh', transform: 'translateY(-50%)' }}>
                            <h1>IABANJI OCTAVIAN</h1>
                            <h2>CR-221</h2>
                        </div>
                    )}
                    {currentPage === 'Carduri' && (
                        // Afisarea listei de carduri
                        cardsContent.map((card, index) => (
                            <Card key={index} title={card.title} style={{ width: 300, marginBottom: 16 }}>
                                <p>{card.content}</p>
                                <p>{card.owner}</p>
                            </Card>
                        ))
                    )}
                    {currentPage === 'Item 3' && (
                        // Afișează text simplu pentru "Item 3"
                        <p>Text pentru Item 3</p>
                    )}
                    {showCardFields && (
                        // Afișează câmpurile pentru carduri
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
