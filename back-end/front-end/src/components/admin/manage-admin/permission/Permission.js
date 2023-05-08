import AdminSidebar from "../../adminSideBar/AdminSidebar"

const Permission = ()=>{
    return (
        <div className="margin-top-right">
            <div className="row">
                <div className="col-md-2">
                    <AdminSidebar/>
                </div>
                <div className="col-md-10">
                    <div className="card mt-5">
                        <div className="card-header text-center "> Permission List </div>
                        <div className="card-body">
                        <table className="table">
                            <thead>
                                <tr>
                                <th scope="col">#</th>
                                <th scope="col">Name</th>
                                <th scope="col">Menu</th>
                                <th scope="col">Link</th>
                                <th scope="col" className="text-center">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>1</td>
                                    <td>Name</td>
                                    <td>Menu</td>
                                    <td>Link</td>
                                    <td className="text-center">
                                        Action
                                    </td>
                                </tr>

                            </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Permission