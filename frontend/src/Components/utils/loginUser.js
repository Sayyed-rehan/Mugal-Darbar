import swal from 'sweetalert'
import { currentUser } from './currentuser'


const loginUser = async()=>{

    if(!currentUser){
        await swal({
            title: "Not login",
            text: 'You need to first login',
            icon: "info",
            button: "Go to Login",
            dangerMode: true
          })

          window.location.href="/login"
    }
}

export default loginUser