import React from "react";
import RoleForm from "@/app/(dashboard)/role/RoleForm";
import {User} from "lucide-react";
import Link from "@/Link";

export default function AddRolePage() {
    return (
        <div>
            <h4 className="font-weight-500 text-p-primary-70 mb-4">
                <Link href="/role" className="btn border-0 p-2"><i className="ip ip-arrow-left" style={{ width: "30px", height: "30px", backgroundColor: "#194BFB" }}></i></Link>Role
            </h4>
            <div className="card p-4">
                <div className="d-flex align-items-center gap-2 mb-4">
                    <User className="text-p-primary-70"/>
                    <div className="font-weight-400 text-p-primary-70">Tambah Role</div>
                </div>
                <RoleForm mode="create"/>
            </div>
        </div>
    );
}
