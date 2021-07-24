import Offcanvas from 'react-bootstrap/Offcanvas'
import OffcanvasTitle from 'react-bootstrap/OffcanvasTitle'
import OffcanvasHeader from 'react-bootstrap/OffcanvasHeader'
import OffcanvasBody from 'react-bootstrap/OffcanvasBody'
import styles from './Drawer.module.scss'
import React from "react";

type PropsType = {
  show: boolean,
  handleClose: () => void,
  children?: React.ReactNode  
}

export default function Drawer({show, handleClose, children}: PropsType){
  return (
    <Offcanvas className={styles.DrawerContent} show={show} onHide={handleClose} placement="end">
      <OffcanvasHeader closeButton>
        <OffcanvasTitle>City Weather Lists</OffcanvasTitle>
      </OffcanvasHeader>
      <OffcanvasBody>
        <form onSubmit={() => {}}>
          <div className="mb-3">
            <label htmlFor="new-city-name" className="form-label">Add New City</label>
            <div className="d-flex">
              <input
                type="text" className="form-control me-2" id="new-city-name" placeholder="Eg: Bogor"
                value={``}
                onChange={(e) => {}}
              />
              <button type="submit" className="btn btn-primary" disabled aria-label="Add New City Button">Add</button>
            </div>
          </div>
        </form>
        {children}
      </OffcanvasBody>
    </Offcanvas>
  )
}
