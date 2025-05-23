import Image from 'next/image'
import React from 'react'
import Link from "next/link";

export default function page() {
    return (
        <div className="h-100 d-flex align-items-center justify-content-center">
            <div>
                <Image src="/access_denied.svg" alt="403"
                       width="500"
                       height="400"
                />
            </div>
            <div>
                <div className="font-weight-700 font-size-20 text-p-black-4">
                    Akses anda ditolak
                </div>
                <div className="font-weight-400 font-size-15 text-p-black-4">
                    Anda tidak memiliki akses untuk halaman ini
                </div>
                <div style={{ marginTop: "25px" }}>
                    <Link
                        href='/'
                        className="btn btn-p-blue-21 radius-10
                     w-10 text-center font-size-16
                     font-weight-600 py-2" >
                        {"Kembali"}
                    </Link>
                </div>
            </div>
        </div>
    )
}
