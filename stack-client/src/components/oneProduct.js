import React from 'react';
import '../App.css';
import api from "../actions/api.js";
import ButterToast, { Cinnamon } from "butter-toast";
import { AssignmentTurnedIn , ExtensionSharp } from "@material-ui/icons";

const initialState = {
    products: [],
    messages: [],
    comment: "",
    confirmButton: "Send",
    commentError: "",
    commentId: ""
}

class oneProduct extends React.Component {

    constructor(props) {
        super(props);
        this.state = initialState;
    }

    handleChange = e => {
        const isCheckbox = e.target.type === "checkbox";
        this.setState({
            [e.target.name]: isCheckbox
                ? e.target.checked
                : e.target.value
        });
    }

    onClear(){
        this.setState(initialState);
        this.componentDidMount();
    }

    onChange(id,msg){
        this.setState({confirmButton:"EDIT",commentId:id,comment:msg});
    }

    componentDidMount() {
        const purl = "http://localhost:4000/product";
        fetch(purl).then(response => response.json())
        .then(json => {const pro = json.filter(pro => pro._id===localStorage.getItem('itemId'))
            this.setState({products: pro})
        })
        const url = "http://localhost:4000/message";
        fetch(url).then(response => response.json())
        .then(json => {const msg = json.filter(msg => msg.product===localStorage.getItem('itemId'))
            this.setState({messages: msg})
        })
    }

    onBuy(id){
        localStorage.setItem("itemId",id);
        window.location.href = '/product';
    }

    editButton(id,msg,email){
        if(localStorage.getItem('userEmail')){
            if(email===localStorage.getItem('userEmail')){
                return  <button type='button' onClick={() => this.onChange(id,msg)} class='btn btn-success'>EDIT</button>;
            }
        }
    }

    handleSubmit = e => {
        e.preventDefault();
        const isValid = this.validate();
        if(isValid){
            if(localStorage.getItem('userEmail')){
                const data ={ message:this.state.comment,name:localStorage.getItem('userName'),email:localStorage.getItem('userEmail'),product:localStorage.getItem('itemId') }
                if(this.state.commentId){
                    api.message().update(this.state.commentId,{message:this.state.comment})
                    .then(res =>{
                        ButterToast.raise({
                            content: <Cinnamon.Crisp title="Online Store"
                                content="Change Successful!"
                                scheme={Cinnamon.Crisp.SCHEME_PURPLE}
                                icon={<AssignmentTurnedIn />}
                            />
                        })
                        this.componentDidMount()
                    })
                }else{
                    api.message().create(data)
                    .then(res => {
                        ButterToast.raise({
                            content: <Cinnamon.Crisp title="Online Store"
                                content="Product Add successfully"
                                scheme={Cinnamon.Crisp.SCHEME_PURPLE}
                                icon={<AssignmentTurnedIn />}
                            />
                        })
                    } );
                }
                this.setState(initialState)
                this.componentDidMount()
            }else{
                ButterToast.raise({
                    content: <Cinnamon.Crisp title="Online Store"
                        content="Please Login to the system!"
                        scheme={Cinnamon.Crisp.SCHEME_PURPLE}
                        icon={<ExtensionSharp />}
                    />
                });
            }
        }
    }

    

    render (){
        const { products , messages } = this.state;
        return (
            <div class="container">
            <br></br><br></br>
                <div class="row justify-content-center">
                    <div class="col-md-12">
                        <div class="card">
                            <div class="card-body">
                                <table class="table">
                                    <tbody>
                                    {
                                        products.map((product) =>

                                        <tr>
                                            <td class="tableTh" width="35%"><img width="200px" alt="" src={ "http://localhost:4000/"+product.image } class="img-thumbnail" /></td>
                                            <td class="tableTh" width="65%"><h3>{ product.name  }</h3><br/><h5>category :{ product.name  } / Price: Rs. { product.price }</h5>
                                            <br/><h5>Discount : Rs. { product.discount }</h5>
                                            <br/><h5>Available Quantity : { product.quantity }</h5>
                                            <br/>Quantity : <input type='text' style={{width: "50px"}} />/{ product.quantity }<br/>
                                            <br/><button type='button' onClick={() => this.onBuy(product._id)} class='btn btn-success'>BUY</button>
                                            </td>
                                        </tr>
                                    )}
                                    </tbody>
                                </table>
                                <hr/>
                                <form autoComplete="off" onSubmit={this.handleSubmit}>
                                    <div class="form-group row">
                                        <label class="col-md-4 col-form-label text-md-right">Your Comment</label>
                                        <div class="col-md-6">
                                            <input type="text" class="form-control" name="comment" value={this.state.comment} onChange={this.handleChange} />
                                            <div style={{color : "red"}}>{this.state.commentError}</div>
                                        </div>
                                    </div>
                                            
                                    <div class="col-md-4 offset-md-4">
                                        <input type="submit" class="btn btn-primary" value={this.state.confirmButton} />
                                        <input type="button" class="btn btn-danger" value="Clear" onClick={() => this.onClear()} />
                                    </div>
                                </form>
                               
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default oneProduct;
