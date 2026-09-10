
import { Form, Head, usePage } from '@inertiajs/react';

function formatPrice(price: number) {
    return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" }).format(
        price,
    )
}

export default function List() {
    const { errors } = usePage().props;

    return (
        <>
            <Head title="Add New Product" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <Form action="/products" method='post' className='flex flex-col gap-1'>
                    <div className="flex flex-col py-2 gap-2">
                        <label htmlFor="title">Name</label>
                        <input type="text" name="title" className={'p-2 rounded-md border border-neutral-600 focus:border-sky-500 focus:outline focus:outline-sky-500'} required />
                        {errors.title && <div className='text-sm text-red-400'>{errors.title}</div>}
                    </div>
                    <div className="flex flex-col py-2 gap-2">
                        <label htmlFor="price">Price</label>
                        <div className='flex flex-row'>
                            <div className='bg-emerald-700 h-full px-2 py-2 rounded-l-md'>Rp</div>
                            <input type="number" name="price" min={0} className='p-2 rounded-r-md border border-neutral-600 focus:border-sky-500 focus:outline focus:outline-sky-500 text-right' required />
                        </div>
                        {errors.price && <div className='text-sm text-red-400'>{errors.price}</div>}
                    </div>
                    <div className="flex flex-col py-2 gap-2">
                        <label htmlFor="description">Description</label>
                        <textarea name="description" id="" rows={5} className='p-2 rounded-md border border-neutral-600 focus:border-sky-500 focus:outline focus:outline-sky-500' required></textarea>
                        {errors.description && <div className='text-sm text-red-400'>{errors.description}</div>}
                    </div>
                    <div className='pt-3'>
                        <button type="submit" className='bg-blue-700 px-3 py-1 rounded-md'>Add product</button>
                    </div>
                </Form>
            </div>
        </>
    );
}

List.layout = {
    breadcrumbs: [
        {
            title: 'Product List',
            href: '/products/',
        },
        {
            title: 'Add New Product',
            href: '/products/create',
        },
    ],
};

