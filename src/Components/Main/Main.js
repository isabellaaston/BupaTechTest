import React from 'react';
import './Main.css';
// import DisplayInfo from './Info/Info'

class GetReg extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            reg: '',
            make: '',
            model: '',
            colour: '',
            expiryDate: '',
            mileage: ''
        }
    }

    setReg = (e) => {
        e.preventDefault()
        this.setState({
            reg:  this.element.value          
        },
        () => {
            this.getInfo()
        })
    }

    getInfo = () => {
        fetch(`https://cors-anywhere.herokuapp.com/https://beta.check-mot.service.gov.uk/trade/vehicles/mot-tests?registration=${this.state.reg}`, {
            "method": "GET",
            "headers": {"x-api-key": "fZi8YcjrZN1cGkQeZP7Uaa4rTxua8HovaswPuIno"}
        })  
        .then(response => response.json())
        .then((response)=>{
            
            this.setState({
                make: response[0].make,
                model: response[0].model,
                colour: response[0].primaryColour,
                expiryDate: response[0].motTests[0].expiryDate,
                mileage: response[0].motTests[0].odometerValue
            }) 
        })
    }

    render () {
        return (
            <div>
                <form onSubmit={ this.setReg }>
                    <label>
                        <h2>Please enter your registration:</h2>
                        <input type="text" ref={el => this.element= el} />
                    </label>
                    <input type="submit" value="Submit" />
                </form>
                <div>
                <h3>{ this.state.reg }</h3>
                    <p>Make: { this.state.make }</p>
                    <p>Model: { this.state.model }</p>
                    <p>Colour: { this.state.colour }</p>
                    <p>MOT Expiry: { this.state.expiryDate }</p>
                    <p>Mileage at last MOT: { this.state.mileage }</p>

                </div>
            </div>
        )
    }
}

export default GetReg