import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle } from 'reactstrap';

class CampsiteInfo extends Component {

    renderCampsite(campsite){
        return (
            <div className="col-md-5 m-1">
                <Card>
                    <CardImg top src={ campsite.image } alt={ campsite.name } />
                    <CardBody>
                        <CardTitle>
                            { campsite.name }
                        </CardTitle>
                        <CardText>
                            { campsite.description }
                        </CardText>
                    </CardBody>
                </Card>
            </div>
        );
    }

    renderComments(campsite){
        if(campsite.comments) {
            return (
            <div className="col-md-5 m-1">
                <h4>Comments</h4>
                {
                    campsite.comments.map(comment => {
                    return <div key={ comment.id }>
                        <p>{comment.text}
                        <br />
                        {`-- ${comment.author}, `}
                        {
                        new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'})
                        .format(new Date(Date.parse(comment.date)))
                        }
                        </p>
                        </div>
                    })
                }
            </div>
            );
        } else {
            return <div />
        }
    }

    render(){
        const campsite = this.props.campsite;
        if(this.props.campsite){
            return (
            <div className="container">
                <div className="row">
                    { this.renderCampsite(campsite) }
                    { this.renderComments(campsite) }
                </div>
            </div>
            );
        } else {
            return <div />;
        }
    }
}

export default CampsiteInfo;