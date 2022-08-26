import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";

export const Modal = () => {
  const { store, actions } = useContext(Context);

  return (
    <>
<button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
  Ver Token
</button>

<div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLabel">Tu Token</h5> 
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
      <div className="row">
        <small className="text-warning"><i> Por razones de seguridad no debes compartirlo. </i></small>
      </div>
      <div className="row">
        <textarea id="token-value" value={store.token} readOnly={true} style={{height: "150px"}}></textarea>
      </div>
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
      </div>
    </div>
  </div>
</div>
    </>
  );
};
