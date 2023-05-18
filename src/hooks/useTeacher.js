import React from 'react'
import { auth,db } from '../database/firebase'
import { ref,remove,update,onValue } from 'firebase/database';
import { GoogleAuthProvider,onAuthStateChanged,signInWithPopup,signOut } from 'firebase/auth'
import convertObjInArray from '../util/convertObjInArray';
import { useNavigate } from 'react-router-dom';

import moment from 'moment';
import 'moment/dist/locale/pt-br';
import usePayment from './usePayment';

const useTeacher = () => {

    const { setPaymentDate } = usePayment()
    const navigate = useNavigate()
    const [teacher,setTeacher] = React.useState( [] )
    const provider = new GoogleAuthProvider;

    const checkForUpdate = async () => {

        onAuthStateChanged( auth,async ( user ) => {

            if ( user ) {
                const { displayName,photoURL,uid,email } = user
                if ( !displayName,!photoURL ) {
                    throw new Error( 'Missing information from Google Account' )
                }
                await updateData( ( `teachers/${uid}/infos/` ),{ id: uid,name: displayName,avatar: photoURL,email: email} )
                setTeacher( { id: uid,name: displayName,avatar: photoURL,email: email } )

            }
        } )

    }

    const updateData = async ( path,body ) => {

        const updates = {}
        updates[path] = body
        return await update( ref( db ),updates )
        // .then( () => console.log( 'dados atualizados com sucesso' ) )


    }


    const sigInWithGoogle = async () => {
        const result = await signInWithPopup( auth,provider )
        GoogleAuthProvider.credentialFromResult( result )
        if ( result.user ) {
            const { displayName,photoURL,uid,email } = result.user
            if ( !displayName,!photoURL ) {
                throw new Error( 'Missing information from Google Account' )
            }

            await updateData( ( `teachers/${uid}/infos/` ),{ id: uid,name: displayName,avatar: photoURL,email: email } )
            setTeacher( { id: uid,name: displayName,avatar: photoURL,email: email } )

        }
    }

    // React.useEffect( () => {

    //     const verifyPremium = async () => {
    //         if ( teacher ) {
    //             console.log( teacher.payment_date );
    //             if ( teacher.payment_date ) return false
    //             await setPaymentDate( teacher,Date.now() )
    //         }
    //     }

    //     verifyPremium()
    // },[teacher] )

    const logOut = async () => {

        await signOut( auth ).then( () => {
            console.log( 'usuário deslogado com sucesso' );
            navigate( '/' )
        } )
    }

    return { checkForUpdate,sigInWithGoogle,teacher,updateData,logOut }
}

export default useTeacher