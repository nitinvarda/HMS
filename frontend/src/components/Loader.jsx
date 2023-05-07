import React from 'react'
import { Spinner } from 'react-bootstrap'

export default function Loader(props) {
  return (
    <div style={StyleSheet.flexCenter}>
        <Spinner />
    </div>
  )
}

const StyleSheet ={
    flexCenter:{
     display:'flex',
     flexDirection:'row',
     justifyContent:'center',
     alignItems:'center',
     width:'100%',
     height:'80vh'
    }
  }
