"use client"

import FormLogin from "./FormLogin";
import { Suspense } from 'react'

export default function Home({ params }) {
    return (
        <main>
            <Suspense>
                <section className="container">
                    <div className="circle-background"></div>
                    <div
                        className="row align-items-center justify-content-center"
                        style={{minHeight: "100vh", position: "relative"}}
                    >
                        <div className="card-login">
                            <div className="card-login-item bg-p-white radius-8">
                                <FormLogin params={params}/>
                            </div>
                        </div>
                    </div>
                </section>
            </Suspense>
        </main>
    );
}
