import { ref,set,update } from 'firebase/database';
import React from 'react'
import { db } from '../database/firebase';
import { v4 as IdGenerator } from 'uuid'
import { AuthContext } from '../context/authContext';



const useStudent = () => {

  const teacher = React.useContext( AuthContext )

  const addNewStudent = async ( body,teacherId ) => {

    if ( Object.keys( body ).length === 0 ) return false;
    await set( ref( db,`teachers/${teacherId}/students/${IdGenerator()}` ),body )
      .then( console.log( 'aluno cadastrado com sucesso' ) )

  }

  const maskStudentAsInactive = async ( studentId ) => {

    if ( window.confirm( 'Deseja mesmo marcar esse estudante como inativo?' ) ) {
      update( ref( db,`teachers/${teacher.id}/students/${studentId}` ),{ status: 'inactive' } )
        .then( () => console.log( 'Aluno marcado como inativo' ) )
    }
  }

  const addNewReport = async ( studentId,body ) => {
    await update( ref( db,`teachers/${teacher.id}/students/${studentId}/reports/${IdGenerator()}` ),body )
    await update( ref( db,`teachers/${teacher.id}/students/${studentId}/` ),{ last_report: Date.now() } )
      .then( () => console.log( 'relatório salvo com sucesso' ) )
  }


  const updateStudent = async ( studentId,body ) => {
    await update( ref( db,`teachers/${teacher.id}/students/${studentId}/` ),body )
      .then( () => console.log( 'dados atualizados com sucesso' ) )
  }


  return { addNewStudent,maskStudentAsInactive,addNewReport,updateStudent }
}

export default useStudent