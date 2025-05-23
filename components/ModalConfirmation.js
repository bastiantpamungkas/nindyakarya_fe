"use client";
import React from "react";
import Modal from "react-bootstrap/Modal";
import ButtonProcess from "@/components/Buttons/ButtonProcess";

function ModalConfirmation({
                               handleClick,
                               titleConfirm,
                               onHide,
                               title,
                               message,
                               show,
                               loadingProcess,
                               ...props
                           }) {
    return (
        <Modal
            {...props}
            show={show}
            contentClassName="radius-20 border-0 shadow-lg"
            backdrop="static"
            size="md"
            style={{
                boxShadow: "0px 0px 10px rgba(70, 52, 52, 0.15)",
                zIndex: 9999,
                background: '#00000054',
            }}
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Body>
                <div className="">
                    <div className="text-end">
                        <div className="cursor-pointer" onClick={onHide}>
                            <i className="fas fa-times-circle font-size-20 text-p-grey-27"></i>
                        </div>
                    </div>
                    <div className="text-center pt-4">
                        <h1 className="font-weight-700 font-size-21">{title}</h1>
                        <div className="font-weight-500 font-size-15 text-p-black-2 pt-2">
                            {message}
                        </div>
                        <div className="row pt-4">
                            <div className="col-12 p-2">
                                <ButtonProcess
                                    {...(!loadingProcess && { onClick: handleClick })}
                                    className="btn btn-none bg-p-blue-21 btn-lg font-weight-700 font-size-14 text-p-white radius-10"
                                    isLoading={loadingProcess}
                                >
                                    {titleConfirm}
                                </ButtonProcess>
                            </div>
                            <div className="col-12 p-2">
                                <button
                                    onClick={onHide}
                                    className="btn btn-none text-p-blue-21 btn-lg font-weight-700 font-size-14"
                                    data-bs-dismiss="modal"
                                >
                                    Tidak
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    );
}

export default ModalConfirmation;
