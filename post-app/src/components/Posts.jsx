import React, { Component } from 'react';
//import {Link} from 'react-router-dom'
import axios from 'axios';
export default class Posts extends Component {
    /*
        Se defina el stado, objeto donde se guardaran parametros
        para el trancurso de la funcio
    */
    state = {
        post: [],
        namePost: '',
        descriptionPost: '',
        search:'',
        alerta:''
    }
    //variable para asignar la api
    URL = 'http://localhost:4000/api/';
    //funcion de inicio, busca todo los post
    async componentDidMount() {
        //this.props.match.params;
        const res = await axios.get(this.URL + 'posts');
        this.setState({ post: res.data });
    }
    //funcion para cambiar valor de propiedad del estado NAME
    onChangeNamePost = (e) => {
        this.setState({
            namePost: e.target.value
        });
        
    }
    //funcioon para cambiar valor de propiedad del estado DESCRIPTIONS
    onChangeDesPost = (e) => {
        this.setState({
            descriptionPost: e.target.value
        });
    }
    //añade un post
    addPost = async (e) => {
        e.preventDefault();
        await axios.post(this.URL + 'createPost', {
            name: this.state.namePost,
            description: this.state.descriptionPost
        }).then(res=>{
            this.setState({
                namePost: '',
                descriptionPost: '',
                alerta:res.data.status
            }); 
            //actualizar list
            this.componentDidMount();
            document.getElementById('div_id').style.visibility = 'visible';
        }).catch(error=>{
            console.log(error);
            //this.setState({alerta:error.data.status});
            alert(error);
        });
        
        
        
    }
    
    //elimina via id en la url
    deletePost = async (id) => {
        //const res = await axios.delete(this.URL+'deletePost/')
        await axios.delete(this.URL+'deletePost/'+id);
        this.componentDidMount();
        
    }
    //cambiar valor de search de state
    onChangeSearch=async(e)=>{
        this.setState({
            search:e.target.value
        });
    }
    //funcion para realizar el filtro
    onSearch=async()=>{
        const res = await axios.get(this.URL + 'posts');
        this.setState({ post: res.data });
        if(this.state.search===''){
            this.componentDidMount();
        }
        else{
            const res = this.state.post.filter(p=>p.name.indexOf(this.state.search)>-1)
            this.setState({ post: res });
            this.setState({search:''});
        }
    }
    //cerrar alerta
    closeAlert=()=>{
        document.getElementById('div_id').style.visibility = 'hidden';
    }
    //principal
    render() {
        return (
            <div className="container" >
                <div className="card card-body" id="card">
                <div className="row">
                    <div className="col">
                        
                        <input type="text" className="form-control" placeholder="Busqueda por nombre" value={this.state.search} onChange={this.onChangeSearch} />
                    </div>
                    <button onClick={()=>this.onSearch()} className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                </div>
                
                </div>
                <div className="card card-body" id="card">
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">name</th>
                                <th scope="col">Description</th>
                                <th scope="col">options</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.post.map(p => (
                                    <tr key={p.id} >
                                        <td >{p.name}</td>
                                        <td >{p.description}</td>
                                        <td>
                                            <button onClick={()=>this.deletePost(p.id)} className="btn btn-danger" >eliminar</button>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>

                <div className="card card-body" id="card">
                    <h3>Crear post</h3>
                    <form onSubmit={this.addPost}>
                        <div className="row">
                            <div className="col">
                                <input type="text" className="form-control" placeholder="name" value={this.state.namePost} onChange={this.onChangeNamePost} />
                            </div>
                            <div className="col">
                                <input type="text" className="form-control" placeholder="descripcion" value={this.state.descriptionPost} onChange={this.onChangeDesPost} />
                            </div>
                            <button type="submit" className="btn btn-primary">Agregar</button>
                        </div>
                    </form>
                </div>
                <br/>
                <div id='div_id' className="alert alert-warning alert-dismissible fade show" role="alert" >
                    <strong>{this.state.alerta}</strong> 
                    <button onClick={this.closeAlert} type="button" className="close" data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>

            </div>

        )
    }
}
