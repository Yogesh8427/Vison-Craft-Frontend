import React from 'react'
function Alert({message,type}) {
    return (
        <>
            {
                alert.message !== "" &&
                <div className={`alert alert-${type} position-fixed my-3`} role="alert"
                    style={{ zIndex: 1, left: "45%", top: "12%" }}>
                    {message}
                </div>
            }
        </>
    )
}

export default Alert
