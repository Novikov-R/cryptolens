import { FC, MouseEvent, ReactNode, useEffect } from 'react';
import cn from '../../../utils/cn.ts';

type ModalProps = {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    description?: ReactNode;
    footer?: ReactNode;
    children?: ReactNode;
    className?: string;
};

const Modal: FC<ModalProps> = ({ isOpen, onClose, title, description, footer, children, className }) => {
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                onClose();
            }
        };

        if (isOpen) {
            window.addEventListener('keydown', handleKeyDown);
        }

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [isOpen, onClose]);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }

        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [isOpen]);

    if (!isOpen) return null;

    const handleOverlayClick = (e: MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    return (
        <>
            <div
                className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70'
                onClick={handleOverlayClick}
                data-testid={'modal'}
            >
                <div className={cn('bg-white rounded-lg shadow-lg max-w-md  mx-auto p-6 w-full', className)}>
                    <div className='flex flex-col justify-between items-center h-full'>
                        {title && <h2 className='text-lg font-semibold'>{title}</h2>}
                        {description && <div className='mt-2 text-sm text-gray-600'>{description}</div>}
                        <div className='mt-4 overflow-auto max-h-96 w-full max-w-sm px-2'>{children}</div>
                        {footer && <div className='mt-4'>{footer}</div>}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Modal;
