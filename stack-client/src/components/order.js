import React from 'react';
import '../App.css';

class Order extends React.Component {

    render (){
        if(localStorage.getItem('userEmail')){
            return (
                <div class="container">
                <br></br><br></br>
                    <div class="row justify-content-center">
                        <div class="col-md-10">
                            <div class="card">
                                <div class="card-header">My Order</div>
                                <div class="card-body">
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
    }
}

export default Order;
