import React, { Children } from 'react';
import Sheet from 'react-modal-sheet';

interface BottomSheetProps {
    className: string;
    isOpen: boolean;
    onClose: () => any;
    children: JSX.Element | JSX.Element[];
}

function BottomSheet({ className, isOpen, onClose, children }: BottomSheetProps) {
    return (
        <Sheet
            className={className}
            isOpen={isOpen}
            onClose={onClose}
            initialSnap={0}
            snapPoints={[-50, 100, 0]}
            detent="content-height"
        >
            <Sheet.Container>
                <Sheet.Header />
                <Sheet.Content>{children}</Sheet.Content>
            </Sheet.Container>
            <Sheet.Backdrop />
        </Sheet>
    );
}

export default BottomSheet;
