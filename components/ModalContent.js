// import Modal from "react-bootstrap/Modal";
//
// export default function ModalContent({
//                                          show,
//                                          onHide,
//                                          title,
//                                          subTitle,
//                                          children,
//                                          className,
//                                          backdrop,
//                                          size,
//                                          contentClassName,
//                                          bodyClassName,
//                                          classNameHeader,
//                                          classNameHeaderTitle,
//                                          classNameHeaderSubtitle,
//                                          scrollable,
//                                          ...props
//                                      }) {
//     return (
//         <>
//             <Modal
//                 className={`border-0 ${className ?? "border-0"}`}
//                 show={show}
//                 onHide={onHide}
//                 size={size ?? "lg"}
//                 backdrop={backdrop ?? "static"}
//                 contentClassName={contentClassName ?? "bg-transparent border-0"}
//                 scrollable={scrollable}
//                 {...props}
//             >
//                 {title && (
//                     <Modal.Header className={classNameHeader} closeButton>
//                         <Modal.Title className={classNameHeaderTitle}>{title}</Modal.Title>
//                         <Modal.Title className={classNameHeaderSubtitle}>{subTitle}</Modal.Title>
//                     </Modal.Header>
//                 )}
//                 <Modal.Body className={bodyClassName}>{children}</Modal.Body>
//             </Modal>
//         </>
//     );
// }

import Modal from "react-bootstrap/Modal";
import { CloseButton } from "react-bootstrap"; // Import CloseButton for custom positioning

export default function ModalContent({
                                         show,
                                         onHide,
                                         title,
                                         subTitle,
                                         children,
                                         className,
                                         backdrop,
                                         size,
                                         contentClassName,
                                         bodyClassName,
                                         classNameHeader,
                                         classNameHeaderTitle,
                                         classNameHeaderSubtitle,
                                         scrollable,
                                         ...props
                                     }) {
    return (
        <>
            <Modal
                className={`border-0 ${className ?? "border-0"}`}
                show={show}
                onHide={onHide}
                size={size ?? "lg"}
                backdrop={backdrop ?? "static"}
                contentClassName={contentClassName ?? "bg-transparent border-0"}
                scrollable={scrollable}
                {...props}
            >
                {title && (
                    <Modal.Header className={`position-relative ${classNameHeader}`}>
                        <Modal.Title className={classNameHeaderTitle}>{title}</Modal.Title>
                        {subTitle && (
                            <Modal.Title className={classNameHeaderSubtitle}>{subTitle}</Modal.Title>
                        )}
                        {/* Centered Close Button */}
                        <CloseButton
                            onClick={onHide}
                            style={{
                                position: "absolute",
                                top: "50%",
                                right: "5%",
                                transform: "translate(50%, -50%)",
                            }}
                        />
                    </Modal.Header>
                )}
                <Modal.Body className={bodyClassName}>{children}</Modal.Body>
            </Modal>
        </>
    );
}
