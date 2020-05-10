import React from 'react';
import './sign-in.style.scss';
import InputForm from '../input-form/input-form.component';
import CustomButton from '../custom-button/custom-button.component';
import { auth, signInWhithGoogle } from '../../firebase/firebase.utils';


class SignIn extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: ''
        }
    }

    handleSubmit = async e => {
        e.preventDefault();
        const { email, password } = this.state;

        try {
            await auth.signInWithEmailAndPassword(email, password);
            this.setState({email: '', password: ''});
        } catch (error) {
            console.log(error);
        }

    }

    handleChange = e => {
        const { value, name } = e.target;
        this.setState({ [name]: value });
    }

    render() {
        return (
            <div className="signin">
                <h2>I already have an account</h2>
                <span>Sign in with your email and your password</span>
                <form onSubmit={this.handleSubmit}>
                    <InputForm 
                    type="email" 
                    name="email"
                    value={this.state.email} 
                    handleChange={ this.handleChange }
                    label="Email"
                    required/>
                    <InputForm 
                    type="password" 
                    name="password"
                    handleChange={ this.handleChange }
                    label="Password"
                    value={this.state.password} 
                    required/>
                    <div className='button'>
                        <CustomButton type="submit" >Sign In </CustomButton>
                        <CustomButton onClick={signInWhithGoogle} isGoogleSignIn >Sign In With Google</CustomButton>
                    </div>
                    
                </form>
            </div>
        )
    }
}

export default SignIn;