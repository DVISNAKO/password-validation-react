import { useState } from "react";
import "./App.css";
import { FaEye } from "react-icons/fa";

function App() {
  const [password, setPassword] = useState("");
  const [repeatePassword, setRepeatePasword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const [lengthError, setLengthError] = useState(false);
  const [passwordMatchError, setPasswordMathcError] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(null);

  const handleInputChange = (e) => {
    e.preventDefault();
    const newPassword = e.target.value;
    setPassword(newPassword);
    checkPasswordStrength(newPassword);
  };

  const handleRepeatePasswordChange = (e) => {
    e.preventDefault();
    const newRepeatePassword = e.target.value;
    setRepeatePasword(newRepeatePassword);
    checkPasswordMatch(newRepeatePassword);
  };

  const toogleShowPassword1 = () => {
    setShowPassword(!showPassword);
  };

  const toogleShowPassword2 = () => {
    setShowPassword2(!showPassword2);
  };

  const checkPasswordMatch = (newRepeatePassword) => {
    setPasswordMathcError(newRepeatePassword !== password);
  }

  const checkPasswordStrength = (newPassword) => {
    const minLength = 6;
    setLengthError(newPassword.length < minLength);

    const isLengthValid = newPassword.length >= minLength;
    const hasLetters = /[a-z]/.test(newPassword);
    const hasUpperCase = /[A-Z]/.test(newPassword);
    const hasNumber = /\d/.test(newPassword);
    const hasSpecialChars = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/.test(newPassword);

    const strenght = 
      isLengthValid + hasLetters + hasUpperCase + hasNumber + hasSpecialChars;

      setPasswordStrength(strenght);
  }

  const getStrengthColor = () => {
    if(lengthError) {
      return "red";
    } else if (passwordStrength === null){
      return "";
    }else if (passwordStrength <= 1){
      return "red";
    }else if (passwordStrength <= 2){
      return "yellow";
    }else if (passwordStrength <= 3){
      return "orange";
    }else if (passwordStrength <= 4){
      return "grey";
    }
      else if (passwordStrength <= 5){
      return "green";
    }
  }


  return (
    <div className="App">
      <div className="box">
        <h2>Password</h2>
        <div className="password1">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="enter password"
            value={password}
            onChange={handleInputChange}
          />
          <FaEye onClick={toogleShowPassword1} />
        </div>
        <div className="password2">
          <input
            type={showPassword2 ? "text" : "password"}
            placeholder="repeate password"
            value={repeatePassword}
            onChange={handleRepeatePasswordChange}
          />
          <FaEye onClick={toogleShowPassword2} />
        </div>
        <div className="str-info">
        {lengthError && <p style={{ color: "red" }}>Минимум 6 символов</p>}
          {passwordMatchError && (
            <p style={{ color: "red" }}>Пароли не совпадают</p>
          )}
        {passwordStrength !== null && !lengthError && (
          <p style={{color: getStrengthColor() }}>
            {passwordStrength === 1 && 'очень слабый пароль'}
            {passwordStrength === 2 && 'слабый пароль'}
            {passwordStrength === 3 && 'нормальеый пароль'}
            {passwordStrength === 4 && 'отличный пароль'}
            {passwordStrength === 5 && 'великолепный пароль'}
          </p>
        )}
        </div>
        <button disble ={lengthError || passwordMatchError}>Sign In</button>
      </div>
    </div>
  );
}

export default App;
