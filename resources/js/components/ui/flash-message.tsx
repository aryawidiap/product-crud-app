import { Info, X } from "lucide-react";
import { useState } from "react";

function FlashMessagePopup({ message }: { message: string | undefined }) {
    const [open, setOpen] = useState(true);

    console.log(message === undefined);

    if (open) {
        return (
            <div className='absolute py-2 px-3 flex flex-row items-center bg-red-400 text-black rounded-md left-1/2 top-5 -translate-x-1/2'>
                <Info className='mr-2' />
                <div className='mr-6'>
                    {message}
                </div>
                <button type='button' onClick={() => setOpen(false)}>
                    <X />
                </button>
            </div>
        );
    }
}

export { FlashMessagePopup };