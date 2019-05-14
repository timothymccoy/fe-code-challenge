import React from 'react';
import PropTypes from 'prop-types';
import ReactModal from 'react-modal';

const customStyles = {
    content : {
      top                   : '50%',
      left                  : '65%',
      right                 : 'auto',
      bottom                : 'auto',
      marginRight           : '-50%',
      transform             : 'translate(-50%, -50%)',
      maxWidth              : '550px',
      padding               : '30px',
      color                 : '#234d7d'
    },
    overlay:{
        background:'transparent',
        position:'inherit'
    }
};

class Modal extends React.Component {
    constructor(props){
        super(props);
        this.state = {showModal:false};
    }

    static propTypes = {
        display: PropTypes.bool,
        selectedSpot: PropTypes.object,
        postHideAction: PropTypes.func,
        push: PropTypes.func
    };

    static defaultProps = {
        display: false
    };

    componentWillReceiveProps(nextProps){
        if (nextProps.showModal !== this.state.showModal) {
            this.setState({showModal:nextProps.display});
        }
    }

    componentDidMount(){
        if(this.props.selectedSpot){
            this.setState({showModal:true});
        }
    }
    
    showModal = () => {
        if(this.state.showModal){
            this.setState({showModal:false},()=>{
                setTimeout(
                    function() {
                        this.props.postHideAction(null);
                    }
                    .bind(this),
                    900
                );
            });
            
        }else{
            this.setState({showModal:true});
        }
        
    }

    render(){
        if(this.props.selectedSpot===null){
            return null;
        }
        return(
            <ReactModal
                isOpen={this.state.showModal}
                closeTimeoutMS={900}
                style={customStyles}
                ariaHideApp={false}
                contentLabel="Example Modal" 
                >
                <i onClick={e=>{this.showModal()}} style={{position:"absolute", top:"10px", right:"10px", cursor:'pointer'}} className="fas fa-times"></i>
                <p style={{textAlign:'center',margin:'0px 0px 15px 0px',fontSize:'25px',fontWeight:'bold'}}>Spot Details</p>
                <p style={{fontSize:'22px',fontWeight:'bold',lineHeight:"22px",padding:"0 0 20px 0"}}>{this.props.selectedSpot.title}</p>
                <p style={{fontSize:'15px'}}>
                    {this.props.selectedSpot.description}
                </p>
                <div style={{display:'flex',justifyContent:'center',margin:"20px"}}>
                    <button onClick={()=>{this.props.push('/checkout')}} className="ui primary button" style={{fontSize:"14px",minWidth:"170px",backgroundColor:"#0282ff"}}>{`$${(this.props.selectedSpot.price/100).toFixed(2)}`} | Book It!</button>
                </div>
            </ReactModal>
        );
    }
};

export default Modal;