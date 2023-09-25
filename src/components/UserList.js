import React from 'react'

export const UserList = ({users, showColors}) => {

  return (
    <div className='main'>
        <table>
            <thead>
                <tr className='cabecera'>
                    <th>Foto</th>
                    <th>Nombre</th>
                    <th>Apellido</th>
                    <th>País</th>
                    <th>Acciones</th>
                </tr>
            </thead>

            <tbody>
                {
                  users.map((user,index)=>{
                    const backgroundColor = index % 2 === 0 ? '#333' : '#555';
                    const color = showColors ? backgroundColor : "transparent";
                    console.log(color);
                    return (
                      <tr key={user.login.uuid} className='personas' style={{backgroundColor:color}}>
                        <td><img src={user.picture.thumbnail}/></td>
                        <td>{user.name.first}</td>
                        <td>{user.name.last}</td>
                        <td>{user.location.country}</td>
                        <td><button>Borrar</button></td>
                      </tr>
                    )
                  }
                  )
                }
            </tbody>
        </table>
    </div>
  )
}
