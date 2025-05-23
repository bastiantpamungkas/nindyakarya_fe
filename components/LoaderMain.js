import React from "react";
import Image from "next/image";

class LoaderMain extends React.Component {
    static showLoader = false;

    static start() {
        LoaderMain.showLoader = true;
        LoaderMain.forceUpdateAllInstances();
    }

    static done() {
        LoaderMain.showLoader = false;
        LoaderMain.forceUpdateAllInstances();
    }

    static instances = [];

    static registerInstance(instance) {
        LoaderMain.instances.push(instance);
    }

    static unregisterInstance(instance) {
        const index = LoaderMain.instances.indexOf(instance);
        if (index !== -1) {
            LoaderMain.instances.splice(index, 1);
        }
    }

    static forceUpdateAllInstances() {
        LoaderMain.instances.forEach((instance) => {
            instance.forceUpdate();
        });
    }

    componentDidMount() {
        LoaderMain.registerInstance(this);
    }

    componentWillUnmount() {
        LoaderMain.unregisterInstance(this);
    }

    render() {
        return (
            LoaderMain.showLoader ? (
                <div className="loader-main">
                    <div className="d-flex align-items-center justify-content-center h-100">
                        <div className="text-center">
                            <div className="d-flex align-items-center gap-2">
                                <div>
                                    <Image
                                        src="/logo.png"
                                        alt="Logo"
                                        width="80"
                                        height="80"
                                        style={{ width: "140px", height: "130px" }}
                                    />
                                </div>
                                <div className="text-p-blue-24 font-weight-700 text-start textAnimation">
                                    <div className="text-learning overflow-hidden">
                                        NINDYA
                                    </div>
                                    <div className="text-management overflow-hidden">
                                        KARYA
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ) : <></>
        );
    }
}

export default LoaderMain;
