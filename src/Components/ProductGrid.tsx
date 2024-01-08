import React, { useEffect, useState, useRef } from 'react';
import { Card, Row, Col } from 'antd';

const { Meta } = Card;

interface ImageNode {
    src: string;
}

interface ProductNode {
    id: string;
    title: string;
    bodyHtml: string;
    images: {
        edges: Array<{ node: ImageNode }>;
    };
}

interface Product {
    node: ProductNode;
}

const removeImageLinks = (html: string): string => html.replace(/<img[^>]*>/g, '');

const CanvasImage: React.FC<{ src: string }> = ({ src }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const loadImage = (imageSrc: string) => {
            const canvas = canvasRef.current;
            if (!canvas) return;

            const context = canvas.getContext('2d');
            const image = new Image();
            image.src = imageSrc;
            image.onload = () => {
                canvas.width = image.width;
                canvas.height = image.height;
                context?.drawImage(image, 0, 0);
            };
        };

        loadImage(src);
    }, [src]);

    return <canvas ref={canvasRef} />;
};

const ProductCard: React.FC<{ product: ProductNode }> = ({ product }) => {
    const { title, bodyHtml, images } = product;
    const shortDescription = removeImageLinks(bodyHtml).slice(0, 100) + '...';

    return (
        <Card
            hoverable
            style={{ width: 240 }}
            cover={<CanvasImage src={images.edges[0].node.src} />}
        >
            <Meta title={title} description={shortDescription} />
        </Card>
    );
};

const ProductsGrid: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        fetch('/api/products')
            .then(response => response.json())
            .then(data => setProducts(data.data.products.edges as Product[]))
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    return (
        <Row gutter={{ xs: 8, sm: 16, md: 24 }} justify="center">
            {products.map(product => (
                <Col key={product.node.id} xs={24} sm={12} md={8} lg={6}>
                    <ProductCard product={product.node} />
                </Col>
            ))}
        </Row>
    );
};

export default ProductsGrid;
