import HeaderComp from "../components/HeaderComp";
import BillsComp from "../components/BillsComp";
import NotesComp from "../components/NotesComp";
import { connect } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { ChangeTab } from "../actions/dashboard.js";

function DashboardComp(props){

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(ChangeTab(props.tabName));
    }, [dispatch, props.tabName]);

    return(
        <div className="w-full h-screen overflow-hidden">
            <HeaderComp/>
            <div className="mt-8 px-4 sm:px-6 lg:px-8" style={{overflow:'auto',height:'calc(100% - 100px)'}}>
                {
                    props.tabName==='Bills'?<BillsComp/>:''
                }
                {
                    props.tabName==='Notes'?<NotesComp/>:''
                }
            </div>
        </div>
    )
}


const mapStateToProps = (state) => {
    return {
      tabName: state.Dashboard.tabName,
    };
  };
  
  const mapDispatchToProps = (dispatch) => {
    return {
      ChangeTab: (tab) => dispatch(ChangeTab(tab)),
    };
  };

  
export default connect(mapStateToProps, mapDispatchToProps)(DashboardComp);