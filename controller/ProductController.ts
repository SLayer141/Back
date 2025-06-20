import { Request, Response } from 'express';
import { AppDataSource } from '../db/data-source';
import { Product } from '../model/Product';

const productRepo = AppDataSource.getRepository(Product);

export const getAllProducts = async (req: Request, res: Response): Promise<void> => {
  try {
    const products = await productRepo.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch products' });
  }
};

export const getProductById = async (req: Request, res: Response): Promise<void> => {
  try {
    const product = await productRepo.findOneBy({ id: Number(req.params.id) });
    if (!product) return void res.status(404).json({ error: 'Product not found' });
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch product' });
  }
};

export const createProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const { sku, name, price, images } = req.body;
    const product = productRepo.create({ sku, name, price, images });
    await productRepo.save(product);
    res.status(201).json(product);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create product' });
  }
};

export const updateProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const { sku, name, price, images } = req.body;
    const product = await productRepo.findOneBy({ id: Number(req.params.id) });
    if (!product) return void res.status(404).json({ error: 'Product not found' });
    product.sku = sku;
    product.name = name;
    product.price = price;
    product.images = images;
    await productRepo.save(product);
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update product' });
  }
};

export const deleteProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const product = await productRepo.findOneBy({ id: Number(req.params.id) });
    if (!product) return void res.status(404).json({ error: 'Product not found' });
    await productRepo.remove(product);
    res.json({ message: 'Product deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete product' });
  }
}; 