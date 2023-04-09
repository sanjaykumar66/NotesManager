import HeaderComp from "../components/HeaderComp";
// import BillsComp from "../components/BillsComp";
import NotesComp from "../components/NotesComp";

function DashboardComp(){

    return(
        <div className="w-full h-screen overflow-hidden">
            <HeaderComp/>
            <div className="mt-8 px-4 sm:px-6 lg:px-8" style={{overflow:'auto',height:'calc(100% - 100px)'}}>
                {/* <BillsComp/> */}
                <NotesComp/>
            </div>
        </div>
    )
}

export default DashboardComp;