
import { Form, Head } from '@inertiajs/react';
import type { Product } from '@/types/product';

function formatPrice(price: number) {
    // Rupiah does not use decimal number (unless in banking)
    // therefore numbers behind zero are truncated/rounded
    return Math.round(price);
}

export default function Show({product}: {product: Product}) {
    return (
        <>
            <Head title="Edit Product" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <Form action={"/products/" + product.id} method='patch' className='flex flex-col gap-1'>
                    <div className="flex flex-col py-2 gap-2">
                        <label htmlFor="title">Name</label>
                        <input type="text" name="title" className='p-2 rounded-md border border-neutral-600 focus:border-sky-500 focus:outline focus:outline-sky-500' defaultValue={product.title} required />
                    </div>
                    <div className="flex flex-col py-2 gap-2">
                        <label htmlFor="price">Price</label>
                        <div className='flex flex-row'>
                            <div className='bg-emerald-700 h-full px-2 py-2 rounded-l-md'>Rp</div>
                            <input type="number" name="price" min={0} className='p-2 rounded-r-md border border-neutral-600 focus:border-sky-500 focus:outline focus:outline-sky-500 text-right' defaultValue={formatPrice(product.price)} required />
                        </div>
                    </div>
                    <div className="flex flex-col py-2 gap-2">
                        <label htmlFor="description">Description</label>
                        <textarea name="description" id="" rows={5} className='p-2 rounded-md border border-neutral-600 focus:border-sky-500 focus:outline focus:outline-sky-500' defaultValue={product.description} required></textarea>
                    </div>
                    <div className='pt-3'>
                        <button type="submit" className='bg-blue-700 px-3 py-1 rounded-md'>Update product</button>
                    </div>
                </Form>
            </div>
        </>
    );
}

Show.layout = {
    breadcrumbs: [
        {
            title: 'Product Details',
            href: '/products/',
        },
    ],
};

