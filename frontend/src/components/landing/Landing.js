import React from 'react'
import { connect } from 'react-redux'

function Landing(props) {
    const { user } = props
    console.log(user)
    return (
        <div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        user: state.auth.user
    }
}

export default connect(mapStateToProps)(Landing);