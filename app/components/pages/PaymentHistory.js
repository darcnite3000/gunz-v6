import React from 'react';
import {Link} from 'react-router';
import {requireAuth} from '../annotations/annotations';
import webmaster from '../../utils/webmaster';
import helpers from '../../utils/helpers';


@requireAuth
class PaymentHistory extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      updated: false,
      account: {},
      err: []
    }
  }
  componentWillMount(){
    this.resetForm();
  }
  handleChange(event){
    var account = this.state.account;
    var target = event.target;
    account[target.id]=target.value
    this.setState({account})
  }
  handleRadioChange(event){
    var account = this.state.account;
    var target = event.target;
    account[target.name]=target.value
    this.setState({account})
  }
  resetForm(event){
    if(event) event.preventDefault();
    webmaster.loadAccount().then(({updated,account})=>{
      account.password2 = account.password;
      this.setState({
        updated,
        account
      });
    })
  }
  submitForm(event){
    var err = this.validate();
    event.preventDefault();
    if(err.length){
      this.setState({err});
    }else{
      webmaster.updateAccount(this.state.account)
        .then(({updated,account})=>{
          this.setState({
            updated,
            account
          })
        })
    }
  }
  validate(){
    var account = this.state.account,
        err = [];
    if(!account.company) err.push('Company Name');
    if(!account.website){
      err.push('Website');
    }else{
      if(account.website.indexOf('.') == -1)
        err.push('Website');
    }
    if(!helpers.validateEmail(account.email))
      err.push('E-mail');
    if(!account.fname)
      err.push('First name');
    if(!account.lname)
      err.push('Last name');
    if(!account.phone)
      err.push('Phone number');
    if(!account.payto)
      err.push('Beneficiary');
    if(!account.address)
      err.push('Address');
    if(!account.city)
      err.push('City');
    if(!account.zip)
      err.push('ZIP code');

    if(account.country=='US'){
      var taxFail = account.taxid.length < 5;

      for(i=0;i<account.taxid.length;i++){
        var ch = (account.taxid.substring(i,i+1)).toLowerCase();
        if(!((ch >= "0" && ch <= "9") || ch <= "-"))
          taxFail = true;
      }

      if(taxFail) err.push('Tax ID needed if US resident');
    }

    if(account.payment_method == 'paxum')
      if(!account.wm_paxum_email) err.push('Paxum email');

    if(account.payment_method == 'wire'){
      if(!account.wire_account_number) err.push('Account Number');
      if(!account.wire_swift && !account.wire_aba) err.push('SWIFT or ABA required');
      if(!account.wire_bank_name) err.push('Bank Name');
      if(!account.wire_bank_city) err.push('Your address');
      if(!account.wire_bank_country) err.push('Bank Address');
    }

    if(!account.username) err.push('User Name');
    if(!account.password) err.push('Password');
    if(account.password.length < 6)
      err.push('Password must be at least 6 symbols');
    if(account.password.length > 14)
      err.push('Password must be max 14 symbols');
    if(account.password != account.password2)
      err.push('Password not confirmed correctly');
    return err;
  }
  render(){
    var stateOptions = this.props.states.map((state)=>{
      return <option key={state.key} value={state.key}>{state.display}</option>
    });
    var countryOptions = this.props.countries.map((country)=>{
      if(country.id!='PW:Palau')
        return <option key={country.key} value={country.key}>{country.display}</option>
    });
    var minpayoutOptions = this.props.minpayout.map((payout)=>{
      return <option key={payout.id} value={payout.id}>$ {payout.display}</option>
    });
    return (
      <section className="content page-container">
        <header>
          <h1>My Account</h1>
        </header>
        <form onSubmit={this.submitForm.bind(this)} className="shell shell-light">
          <div className="input-group">
            <span className="label">Webmaster ID:</span>
            <span className="input">{this.props.webmaster.id}</span>
          </div>
          <div className="info-group">
            <div className="title">Website Information</div>
            <div className="input-group">
              <label forHtml="company" className="label">Company&nbsp;*</label>
              <span className="input">
                <input
                  id="company"
                  name="company"
                  type="text"
                  onChange={this.handleChange.bind(this)} 
                  value={this.state.account.company} />
              </span>
            </div>
            <div className="input-group">
              <label forHtml="website" className="label">Website URL 1&nbsp;*</label>
              <span className="input">
                <input
                  id="website"
                  name="website"
                  type="text"
                  onChange={this.handleChange.bind(this)}
                  value={this.state.account.website} />
              </span>
            </div>
            <div className="input-group">
              <label forHtml="url2" className="label">Website URL 2</label>
              <span className="input">
                <input
                  id="url2"
                  name="url2"
                  type="text"
                  onChange={this.handleChange.bind(this)} 
                  value={this.state.account.url2} />
              </span>
            </div>
            <div className="input-group">
              <label forHtml="url3" className="label">Website URL 3</label>
              <span className="input">
                <input
                  id="url3"
                  name="url3"
                  type="text"
                  onChange={this.handleChange.bind(this)} 
                  value={this.state.account.url3} />
              </span>
            </div>
            <div className="input-group">
              <label forHtml="url4" className="label">Website URL 4</label>
              <span className="input">
                <input
                  id="url4"
                  name="url4"
                  type="text"
                  onChange={this.handleChange.bind(this)} 
                  value={this.state.account.url4} />
              </span>
            </div>
          </div>
          <div className="info-group">
            <div className="title">Contact Information</div>
            <div className="input-group">
              <label forHtml="email" className="label">Email Address&nbsp;*</label>
              <span className="input">
                <input
                  id="email"
                  name="email"
                  type="text"
                  onChange={this.handleChange.bind(this)} 
                  value={this.state.account.email} />
              </span>
            </div>
            <div className="input-group">
              <label forHtml="fname" className="label">First Name&nbsp;*</label>
              <span className="input">
                <input
                  id="fname"
                  name="fname"
                  type="text"
                  onChange={this.handleChange.bind(this)} 
                  value={this.state.account.fname} />
              </span>
            </div>
            <div className="input-group">
              <label forHtml="lname" className="label">Last Name&nbsp;*</label>
              <span className="input">
                <input
                  id="lname"
                  name="lname"
                  type="text"
                  onChange={this.handleChange.bind(this)} 
                  value={this.state.account.lname} />
              </span>
            </div>
            <div className="input-group">
              <label forHtml="phone" className="label">Telephone Number&nbsp;*</label>
              <span className="input">
                <input
                  id="phone"
                  name="phone"
                  type="text"
                  onChange={this.handleChange.bind(this)} 
                  value={this.state.account.phone} />
              </span>
            </div>
            <div className="input-group">
              <label forHtml="icq" className="label">ICQ Number</label>
              <span className="input">
                <input
                  id="icq"
                  name="icq"
                  type="text"
                  onChange={this.handleChange.bind(this)} 
                  value={this.state.account.icq} />
              </span>
            </div>
            <div className="input-group">
              <label forHtml="skype" className="label">Skype Name</label>
              <span className="input">
                <input
                  id="skype"
                  name="skype"
                  type="text"
                  onChange={this.handleChange.bind(this)} 
                  value={this.state.account.skype} />
              </span>
            </div>
          </div>

          <div className="info-group">
            <div className="title">Payment Information</div>
            <div className="input-group">
              <label forHtml="payto" className="label">Beneficiary Name&nbsp;*</label>
              <span className="input">
                <input
                  id="payto"
                  name="payto"
                  type="text"
                  onChange={this.handleChange.bind(this)} 
                  value={this.state.account.payto} />
              </span>
            </div>
            <div className="input-group">
              <label forHtml="address" className="label">Address&nbsp;*</label>
              <span className="input">
                <input
                  id="address"
                  name="address"
                  type="text"
                  onChange={this.handleChange.bind(this)} 
                  value={this.state.account.address} />
              </span>
            </div>
            <div className="input-group">
              <label forHtml="city" className="label">City&nbsp;*</label>
              <span className="input">
                <input
                  id="city"
                  name="city"
                  type="text"
                  onChange={this.handleChange.bind(this)} 
                  value={this.state.account.city} />
              </span>
            </div>
            <div className="input-group">
              <label forHtml="state" className="label">State / Province&nbsp;*</label>
              <span className="input">
                <select
                  id="state"
                  name="state"
                  onChange={this.handleChange.bind(this)}
                  value={this.state.account.state} >
                  {stateOptions}
                </select>
              </span>
            </div>
            <div className="input-group">
              <label forHtml="zip" className="label">Zip Code&nbsp;*</label>
              <span className="input">
                <input
                  id="zip"
                  name="zip"
                  type="text"
                  onChange={this.handleChange.bind(this)} 
                  value={this.state.account.zip} />
              </span>
            </div>
            <div className="input-group">
              <label forHtml="country" className="label">Country&nbsp;*</label>
              <span className="input">
                <select
                  id="country"
                  name="country"
                  onChange={this.handleChange.bind(this)}
                  value={this.state.account.country} >
                  {countryOptions}
                </select>
              </span>
            </div>
            <div className="input-group">
              <label forHtml="taxid" className="label">If US Resident</label>
              <span className="input">
                <input
                  id="taxid"
                  name="taxid"
                  type="text"
                  onChange={this.handleChange.bind(this)} 
                  value={this.state.account.taxid} />
              </span>
            </div>
            <div className="input-group">
              <label forHtml="vat" className="label">If EU Resident</label>
              <span className="input">
                <input
                  id="vat"
                  name="vat"
                  type="text"
                  onChange={this.handleChange.bind(this)} 
                  value={this.state.account.vat} />
              </span>
            </div>
            <div className="input-group">
              <span className="label">Payment methods:</span>
              <span className="input">
                <span className="input-group">
                  <input
                    type="radio" 
                    name="payment_method"
                    value="cheque"
                    id="payment_method_cheque"
                    checked={this.state.account.payment_method == 'cheque'}
                    onChange={this.handleRadioChange.bind(this)}
                    />
                  <label htmlFor="payment_method_cheque">
                    Check
                  </label>
                </span>
                <span className="input-group">
                  <input
                    type="radio" 
                    name="payment_method"
                    value="wire"
                    id="payment_method_wire"
                    checked={this.state.account.payment_method == 'wire'}
                    onChange={this.handleRadioChange.bind(this)}
                    />
                  <label htmlFor="payment_method_wire">
                    Wire (international) / ACH (US webmasters)
                  </label>
                </span>
                <span className="input-group">
                  <input
                    type="radio" 
                    name="payment_method"
                    value="paxum"
                    id="payment_method_paxum"
                    checked={this.state.account.payment_method == 'paxum'}
                    onChange={this.handleRadioChange.bind(this)}
                    />
                  <label htmlFor="payment_method_paxum">
                    Paxum
                  </label>
                </span>
              </span>
            </div>
            {
              this.state.account.payment_method == 'paxum' && 
              <div className="input-group">
                <label forHtml="wm_paxum_email" className="label">Paxum Email</label>
                <span className="input">
                  <input
                    id="wm_paxum_email"
                    name="wm_paxum_email"
                    type="text"
                    onChange={this.handleChange.bind(this)} 
                    value={this.state.account.wm_paxum_email} />
                </span>
              </div>
            }
            {
              this.state.account.payment_method == 'wire' && 
              <div>
                <div className="input-group">
                  <label forHtml="wire_account_number" className="label">Account Number</label>
                  <span className="input">
                    <input
                      id="wire_account_number"
                      name="wire_account_number"
                      type="text"
                      onChange={this.handleChange.bind(this)} 
                      value={this.state.account.wire_account_number} />
                  </span>
                </div>
                <div className="input-group">
                  <label forHtml="wire_aba" className="label">ABA/Routing</label>
                  <span className="input">
                    <input
                      id="wire_aba"
                      name="wire_aba"
                      type="text"
                      onChange={this.handleChange.bind(this)} 
                      value={this.state.account.wire_aba} />
                  </span>
                </div>
                <div className="input-group">
                  <label forHtml="wire_swift" className="label">SWIFT code</label>
                  <span className="input">
                    <input
                      id="wire_swift"
                      name="wire_swift"
                      type="text"
                      onChange={this.handleChange.bind(this)} 
                      value={this.state.account.wire_swift} />
                  </span>
                </div>
                <div className="input-group">
                  <label forHtml="wire_bank_name" className="label">Bank Name</label>
                  <span className="input">
                    <input
                      id="wire_bank_name"
                      name="wire_bank_name"
                      type="text"
                      onChange={this.handleChange.bind(this)} 
                      value={this.state.account.wire_bank_name} />
                  </span>
                </div>
                <div className="input-group">
                  <label forHtml="wire_bank_city" className="label">Bank City</label>
                  <span className="input">
                    <input
                      id="wire_bank_city"
                      name="wire_bank_city"
                      type="text"
                      onChange={this.handleChange.bind(this)} 
                      value={this.state.account.wire_bank_city} />
                  </span>
                </div>
                <div className="input-group">
                  <label forHtml="wire_bank_country" className="label">Bank Country</label>
                  <span className="input">
                    <input
                      id="wire_bank_country"
                      name="wire_bank_country"
                      type="text"
                      onChange={this.handleChange.bind(this)} 
                      value={this.state.account.wire_bank_country} />
                  </span>
                </div>
                <div className="input-group">
                  <label forHtml="wire_bank_iban" className="label">Bank IBAN</label>
                  <span className="input">
                    <input
                      id="wire_bank_iban"
                      name="wire_bank_iban"
                      type="text"
                      onChange={this.handleChange.bind(this)} 
                      value={this.state.account.wire_bank_iban} />
                  </span>
                </div>
                <div className="input-group">
                  <label forHtml="wire_bank_bic" className="label">Bank BIC Code</label>
                  <span className="input">
                    <input
                      id="wire_bank_bic"
                      name="wire_bank_bic"
                      type="text"
                      onChange={this.handleChange.bind(this)} 
                      value={this.state.account.wire_bank_bic} />
                  </span>
                </div>
              </div>
            }
          </div>

          <div className="info-group">
            <div className="title">Funds Distribution</div>
            <div className="input-group">
              <label forHtml="minpay" className="label">Minimum Payout</label>
              <span className="input">
                <select
                  id="minpay"
                  name="minpay"
                  onChange={this.handleChange.bind(this)}
                  value={this.state.account.minpay} >
                  {minpayoutOptions}
                </select>
              </span>
            </div>
          </div>

          <div className="info-group">
            <div className="title">Login Information</div>
            <div className="input-group">
              <label forHtml="username" className="label">User name&nbsp;*</label>
              <span className="input">
                <input
                  id="username"
                  name="username"
                  type="text"
                  onChange={this.handleChange.bind(this)} 
                  value={this.state.account.username} />
              </span>
            </div>
            <div className="input-group">
              <label forHtml="password" className="label">Password&nbsp;*</label>
              <span className="input">
                <input
                  id="password"
                  name="password"
                  type="password"
                  onChange={this.handleChange.bind(this)} 
                  value={this.state.account.password} />
              </span>
            </div>
            <div className="input-group">
              <label forHtml="password2" className="label">Verify Password&nbsp;*</label>
              <span className="input">
                <input
                  id="password2"
                  name="password2"
                  type="password"
                  onChange={this.handleChange.bind(this)} 
                  value={this.state.account.password2} />
              </span>
            </div>
            <p>Note: Use alphanumeric and underscore (_) characters only. Limit: 6-10 characters.</p>
          </div>
          <div className="info-group">
            <div className="title">Third Party Refferal IDs</div>
            <div className="input-group">
              <label forHtml="google_conversion_id" className="label">Google Conv.ID</label>
              <span className="input">
                <input
                  id="google_conversion_id"
                  name="google_conversion_id"
                  type="text"
                  onChange={this.handleChange.bind(this)} 
                  value={this.state.account.google_conversion_id} />
              </span>
              <Link to="contact">Need Help with Google ID?</Link>
            </div>
            <div className="input-group">
              <label forHtml="aebn2" className="label">AEBN ID</label>
              <span className="input">
                <input
                  id="aebn2"
                  name="aebn2"
                  type="text"
                  onChange={this.handleChange.bind(this)} 
                  value={this.state.account.aebn2} />
              </span>
            </div>
          </div>
          <div className="info-group">
            <div className="title">Email notifications</div>
            <div className="input-group">
              <label forHtml="mail_payout" className="label">Payout Notifications</label>
              <span className="input">
                <select
                  id="mail_payout"
                  name="mail_payout"
                  onChange={this.handleChange.bind(this)}
                  value={this.state.account.mail_payout} >
                    <option value="1">YES</option>
                    <option value="0">NO</option>
                </select>
              </span>
            </div>
            <div className="input-group">
              <label forHtml="mail_instant" className="label">New Sales Notifications</label>
              <span className="input">
                <select
                  id="mail_instant"
                  name="mail_instant"
                  onChange={this.handleChange.bind(this)}
                  value={this.state.account.mail_instant} >
                    <option value="1">YES</option>
                    <option value="0">NO</option>
                </select>
              </span>
            </div>
          </div>
          <button className="btn btn-dark" onClick={this.resetForm.bind(this)}>Reset</button>
          <input type="submit" onClick={this.submitForm.bind(this)} className="btn btn-dark" />
        </form>
      </section>
    );
  }
}

export default PaymentHistory;