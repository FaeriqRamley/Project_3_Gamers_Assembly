import React from 'react'
import { connect } from "react-redux"

function Landing(props) {
    console.log(props.auth)
    return (
        <div>
            This is Landing
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        auth: state.auth
    }
}

export default connect(mapStateToProps)(Landing)