import React from 'react'
import classes from './SideBar.module.css'

function SideBar() {

    let attachedClasses = [classes.Fa];

  return (
    <nav className={classes.SideBar}>
        <ul>		
            <li>
                <a href="#">
                    {/* <i className={classes.Fa.concat(' fa fa-home fa-2x')}></i> */}
                    <i className={attachedClasses.join(' ').concat(' fa fa-home fa-2x')}></i>
               {/*      <i className=" fa fa-home fa-2x"></i> */}
                    <span className="nav-text">
                        Dashboard
                    </span>
                </a>

            </li>
	  
            <li>
                <a href="#submenu1" data-toggle="collapse" aria-expanded="false">
                    <i className={classes.Fa.concat(' fa fa-laptop fa-2x')}></i>
                    <span className="nav-text">
                        Stars Components
                    </span>
                </a>
                <ul className="collapse list-unstyled" id="submenu1">
                    <li><a href="#">
                            <i className="fa fa-file-pdf fa-2x"></i>
                            <span className="nav-text">
                                Link 1
                            </span>
                        </a></li>
                    <li><a href="#">
                            <i className="fa fa-file-archive fa-2x"></i>
                            <span className="nav-text">
                                Link 2
                            </span></a></li>
                </ul>

            </li>
        </ul>
    </nav>    
  )
}

export default SideBar
