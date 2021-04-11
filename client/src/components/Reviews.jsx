import styled from '@emotion/styled'
import React from 'react'
import StarRating from './StarRatting'

const Reviews = ({name,rating,review}) => {
    return (
            <Container className="card text-white bg-primary mb-3 mr-4">
                <div className="card-header d-flex justify-content-between">
                    <span>{name}</span>
                    <span><StarRating rating={rating}/></span>
                </div>
                <div className="card-body">
                    <p className="card-text ">{review}</p>
                </div>
            </Container>
    )
}

const Container = styled.div`
    margin: 5px;
`
export default Reviews
