
import { Head, router } from '@inertiajs/react';
import { Delete } from 'lucide-react';
import { animate, AnimatePresence, motion } from 'motion/react';
import type { RefObject } from 'react';
import { useRef, useState } from 'react';
import type { Product } from '@/types/product';
import AppLogoIcon from '@/components/app-logo-icon';

function DeleteConfirmationModal({ product, dialogRef, closeModal }: { product: Product, dialogRef: RefObject<HTMLDialogElement | null>, closeModal: () => void }) {
    function deleteProduct(productId: number) {
        router.delete(`/products/${productId}`);
        closeModal();
    }

    function close() {
        const deleteConfirmationModal = document.getElementById("deleteConfirmationModal");
        animate(deleteConfirmationModal, { opacity: 0, zoom: 0.95 }, { duration: 0.5, ease: 'easeInOut' });
        setTimeout(() => {
            dialogRef.current?.close();
        }, 1000);
    }

    return (
        // <motion.dialog ref={dialogRef} className='open:backdrop:bg-black/50 starting:backdrop:opacity-0 left-1/2 top-1/2 -translate-1/2 p-4 rounded-md transition duration-300 ease-in-out starting:opacity-0 starting:scale-95 ' id='deleteConfirmationModal'>
        <motion.dialog ref={dialogRef} className='open:backdrop:bg-black/50 left-1/2 top-1/2 -translate-1/2 p-4 rounded-md  ' id='deleteConfirmationModal'>
            <div className='flex flex-row gap-3 items-center'>
                <Delete className='stroke-red-500 size-20' />
                <div>
                    <div>
                        Are you sure you want to delete this product?
                    </div>
                    <div className='text-white/70 text-sm my-2'>
                        <table>
                            <tbody>
                                <tr className='*:pe-1 *:text-left'>
                                    <th>Name</th>
                                    <td>:</td>
                                    <td id='modalProductName'>{product.title}</td>
                                </tr>
                                <tr className='*:pe-1 *:text-left'>
                                    <th>Price</th>
                                    <td>:</td>
                                    <td id='modalProductPrice'>{product.formattedPrice}</td>
                                </tr>
                                <tr className='*:pe-1 *:text-left'>
                                    <th>Description</th>
                                    <td>:</td>
                                    <td id='modalProductDescription'>{product.description}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <hr className='my-4' />
            <div className='flex gap-2 justify-end-safe'>
                <button onClick={close} className='py-1 px-2 rounded-md outline outline-white'>Cancel</button>
                <button onClick={() => deleteProduct(product.id)} id='deleteConfirmationButton' className='py-1 px-2 rounded-md bg-red-600' type='submit'>Delete</button>
            </div>
        </motion.dialog>
    );
}

function ProductRows({ products, showDeleteConfirmationModal }: { products: Array<Product>, showDeleteConfirmationModal: (product: Product) => void }) {
    if (products) {
        return (
            <AnimatePresence>
                {
                    products.map(product =>
                        <motion.tr className='odd:bg-stone-900 even:bg-stone-500' key={product.id} exit={{ lineHeight: 0, padding: 0, borderSpacing: 0, opacity: 0, fontSize: '0px' }} transition={{ duration: 10 }}>
                            <td className='p-2'>{product.title}</td>
                            <td className='p-2'>{product.formattedPrice}</td>
                            <td className='p-2'>{product.description}</td>
                            <td className='p-2 flex gap-2'>
                                <a href={'/products/' + product.id + '/edit'} className='px-2 py-1 bg-yellow-500 text-black rounded-sm'>Edit</a>
                                <button className='px-2 py-1 bg-red-700 rounded-sm' onClick={() => showDeleteConfirmationModal(product)}>Delete</button>
                            </td>
                        </motion.tr>
                    )
                }
            </AnimatePresence>
        );
    }

    return (
        <tr>
            <td colSpan={3}>No products found.</td>
        </tr>
    );
}

function ProductTable({ products, showDeleteConfirmationModal }: { products: Array<any>, showDeleteConfirmationModal: (product: Product) => void }) {
    return (
        <table className=''>
            <thead>
                <tr className='bg-stone-800'>
                    <th className='p-2'>Product Name</th>
                    <th className='p-2'>Price (IDR)</th>
                    <th className='p-2'>Description</th>
                    <th className='p-2'>Action</th>
                </tr>
            </thead>
            <tbody>
                <ProductRows products={products} showDeleteConfirmationModal={showDeleteConfirmationModal} />
            </tbody>
        </table>
    );
}

export default function List({ products }: { products: Array<any> }) {
    const dialogRef = useRef<HTMLDialogElement>(null);

    const [currentProduct, setCurrentProduct] = useState({
        id: 0,
        title: '',
        price: 0,
        description: '',
    } as Product);

    function showDeleteConfirmationModal(product: Product) {
        setCurrentProduct(product);
        animate(dialogRef.current, { opacity: 0, zoom: 0.95 }, { duration: 0 });
        animate(dialogRef.current, { opacity: 100, zoom: 1 }, { duration: 0.5 });
        dialogRef.current?.showModal();
    }

    function closeDeleteConfirmationModal() {
        dialogRef.current?.close();
    }

    return (
        <>
            <Head title="Product List" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div>
                    <a href="/products/create" className='py-2 px-3 bg-blue-700 rounded-sm'>+ Add new product</a>
                </div>
                <div className='rounded-xl overflow-hidden'>
                    <div className='overflow-auto'>
                        <ProductTable products={products} showDeleteConfirmationModal={showDeleteConfirmationModal} />
                    </div>
                </div>
            </div>
            <DeleteConfirmationModal dialogRef={dialogRef} product={currentProduct} closeModal={closeDeleteConfirmationModal} />
        </>
    );
}

List.layout = {
    breadcrumbs: [
        {
            title: 'Product List',
            href: '/products/',
        },
    ],
};


