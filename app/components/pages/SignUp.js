import React from 'react';

class SignUp extends React.Component{
  render(){
    return (
      <section className="content page-container">
        <header>
          <h1>Sign Up</h1>
        </header>
        <div className="shell shell-light">
          <iframe src="/wmreg/wmreg.php?action=wmreg_default" height="2000" class="autoHeight" width="700" frameborder="0" marginheight="0" marginwidth="0" align="middle" scrolling="no"></iframe>
        </div>
      </section>
    );
  }
}

export default SignUp;