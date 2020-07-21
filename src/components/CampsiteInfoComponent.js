import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody, Breadcrumb, BreadcrumbItem, Button,
    Modal, ModalHeader, ModalBody, Label } from 'reactstrap';
import { Link } from 'react-router-dom';
import { LocalForm, Control } from 'react-redux-form';


   function RenderCampsite({ campsite }){
        return (
            <div className="col-md-5 m-1">
                <Card>
                    <CardImg top src={ campsite.image } alt={ campsite.name } />
                    <CardBody>
                        <CardText>
                            { campsite.description }
                        </CardText>
                    </CardBody>
                </Card>
            </div>
        );
    }

    function RenderComments({ comments }){
        if(comments) {
            return (
            <div className="col-md-5 m-1">
                <h4>Comments</h4>
                {
                    comments.map(comment => {
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
                <CommentForm />
            </div>
            );
        } else {
            return <div />
        }
    }

    function CampsiteInfo(props){
        if(props){
            return (
            <div className="container">
                    <div className="row">
                        <div className="col">
                            <Breadcrumb>
                                <BreadcrumbItem><Link to="/directory">Directory</Link></BreadcrumbItem>
                                <BreadcrumbItem active>{ props.campsite.name }</BreadcrumbItem>
                            </Breadcrumb>
                            <h2>{ props.campsite.name }</h2>
                            <hr />
                        </div>
                    </div>
                <div className="row">
                    <RenderCampsite campsite={ props.campsite } />
                    <RenderComments comments={ props.comments } />
                </div>
            </div>
            );
        } else {
            return <div />;
        }
    }

    class CommentForm extends Component {
        constructor(props) {
            super(props);
            this.state ={
                rating: '',
                author: '',
                text: '',
                isModalOpen: false,
            };

            this.toggleModal = this.toggleModal.bind(this);
            this.handleLogin = this.handleLogin.bind(this);
            this.handleSubmit = this.handleSubmit.bind(this);
        }

        toggleModal(){
            this.setState({ isModalOpen: !this.state.isModalOpen });
            console.log('toggleModal clicked');
        }

        handleLogin(event){
            this.toggleModal();
            event.preventDefault();
        }

        handleSubmit(values) {
            console.log('Current state is: ' + JSON.stringify(values));
            alert('Current state is: ' + JSON.stringify(values));
        }

        render(){
            return (
            <React.Fragment>
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Submit a Comment</ModalHeader>
                    <ModalBody>
                            <LocalForm onChange={values => this.handleSubmit(values)}>
                            <div className="form-group">
                                <Label htmlFor="rating">Rating</Label>
                                <Control.select model=".rating" id="rating" name="rating" className="form-control">
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                </Control.select >
                            </div>
                            <div className="form-group">
                                <Label htmlFor="author">Your Name</Label>
                                <Control.text 
                                    placeholder="Your Name"
                                    model=".author" 
                                    id="author" 
                                    name="author" 
                                    className="form-control"
                                />
                            </div>
                            <div className="form-group">
                                <Label htmlFor="comment">Comment</Label>
                                <Control.textarea model=".text" id="text" name="text" className="form-control" rows="6" />
                            </div>
                                <Button type="submit" value="submit" color="primary">Submit</Button>
                            </LocalForm>
                    </ModalBody>
                </Modal>
                <Button outline={true} onClick={this.toggleModal}><i className="fa fa-pencil" />Submit Comment</Button>
            </React.Fragment>);
        }
    }

export default CampsiteInfo;